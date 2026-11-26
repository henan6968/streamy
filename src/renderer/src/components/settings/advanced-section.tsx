import { FolderOpen, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import type { EngineStatus } from "../../../../shared/api";
import { ENGINE_API_BASE, type Health } from "../../../../shared/engine-api";
import type { MessageKey } from "../../../../shared/i18n";
import type {
  HardwareEncoding,
  SettingsSnapshot,
} from "../../../../shared/settings";
import { SettingRow } from "@/components/settings/setting-row";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";
import { peopleText } from "@/lib/people-text";
import { runAction, settingsApi } from "@/lib/settings";

// Advanced: the graphics card switches, and what helps when something goes
// wrong (engine status, logs, data folder, reset). Version, updates and
// licences live in About.

/** How often /v1/health is asked again while this section is open. */
const HEALTH_REFRESH_MS = 5_000;

/** The video encoders the engine may pick, by their ffmpeg names. */
const ENCODER_NAMES: Record<string, string> = {
  h264_videotoolbox: "VideoToolbox",
  h264_nvenc: "NVIDIA NVENC",
  h264_qsv: "Intel Quick Sync",
  h264_vaapi: "VA-API",
  h264_amf: "AMD AMF",
  h264_mf: "Media Foundation",
  h264_v4l2m2m: "V4L2",
  libx264: "CPU (x264)",
};

const ENCODING_OPTIONS: { value: HardwareEncoding; labelKey: MessageKey }[] = [
  { value: "auto", labelKey: "common.automatic" },
  { value: "off", labelKey: "common.off" },
];

/** "8.1.3-Jellyfin" → "8.1.3". Unusual versions are shown as they are. */
function shortVersion(version: string): string {
  return /^n?(\d+(?:\.\d+)*)/.exec(version)?.[1] ?? version;
}

function isHealth(value: unknown): value is Health {
  if (typeof value !== "object" || value === null) return false;
  const { ffmpeg, encoder } = value as Record<string, unknown>;
  return (
    typeof ffmpeg === "object" &&
    ffmpeg !== null &&
    (typeof encoder === "string" || encoder === null)
  );
}

/** The engine's state, and its /v1/health while it runs. */
function useEngineInfo(): {
  status: EngineStatus | null;
  health: Health | null;
} {
  const [status, setStatus] = useState<EngineStatus | null>(null);
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    let active = true;
    let heardChange = false;
    const unsubscribe = window.streamy.engine.onStatusChange((next) => {
      heardChange = true;
      setStatus(next);
    });
    window.streamy.engine
      .getStatus()
      .then((next) => {
        // A change that arrived meanwhile is newer than this answer.
        if (active && !heardChange) setStatus(next);
      })
      .catch((error: unknown) => {
        console.error(error);
      });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const running = status?.state === "running";
  useEffect(() => {
    if (!running) return;
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch(`${ENGINE_API_BASE}/v1/health`, {
          signal: controller.signal,
        });
        const body: unknown = await response.json();
        if (response.ok && isHealth(body)) setHealth(body);
      } catch {
        // Stopped meanwhile, or not answering: the status says why.
      }
    };
    void load();
    // The encoder is detected a few seconds after the engine starts.
    const timer = setInterval(() => void load(), HEALTH_REFRESH_MS);
    return () => {
      controller.abort();
      clearInterval(timer);
      // A restarted engine may have another ffmpeg or encoder.
      setHealth(null);
    };
  }, [running]);

  return { status, health: running ? health : null };
}

/** "Running · ffmpeg 8.1.3 · VideoToolbox", or what's wrong. */
function EngineSummary({
  status,
  health,
}: {
  status: EngineStatus | null;
  health: Health | null;
}) {
  const t = useT();
  let summary: string;
  let problem: string | null = null;
  switch (status?.state) {
    case undefined:
      summary = t("settings.advanced.engine.checking");
      break;
    case "starting":
      summary = t("settings.advanced.engine.starting");
      break;
    case "restarting":
      summary = t("settings.advanced.engine.reconnecting");
      problem =
        status.error &&
        peopleText(
          status.error,
          t("settings.advanced.engine.stoppedUnexpectedly"),
        );
      break;
    case "failed":
      summary = t("settings.advanced.engine.notRunning");
      problem =
        status.error &&
        peopleText(status.error, t("settings.advanced.engine.keepsStopping"));
      break;
    case "running": {
      const parts = [t("settings.advanced.engine.running")];
      if (health?.ffmpeg.version) {
        parts.push(`ffmpeg ${shortVersion(health.ffmpeg.version)}`);
      } else if (health?.ffmpeg.error) {
        parts.push(t("settings.advanced.engine.ffmpegNotWorking"));
        problem = peopleText(
          health.ffmpeg.error,
          t("settings.advanced.engine.conversionFailed"),
        );
      }
      if (health?.encoder) {
        parts.push(ENCODER_NAMES[health.encoder] ?? health.encoder);
      }
      summary = parts.join(" · ");
      break;
    }
  }

  return (
    <>
      <span
        role="status"
        className={cn(
          "block",
          status?.state === "failed" ? "text-danger" : "text-foreground",
        )}
      >
        {summary}
      </span>
      {problem && <span className="mt-1 block text-danger">{problem}</span>}
    </>
  );
}

export function AdvancedSection({ snapshot }: { snapshot: SettingsSnapshot }) {
  const t = useT();
  const { hardwareAcceleration, hardwareEncoding } = snapshot.settings;
  const needsRestart =
    hardwareAcceleration !== snapshot.hardwareAccelerationActive;
  const engine = useEngineInfo();

  const [error, setError] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const encodingOptions = ENCODING_OPTIONS.map(({ value, labelKey }) => ({
    value,
    label: t(labelKey),
  }));

  const reset = () => {
    setResetting(true);
    setResetError(null);
    void runAction(() => settingsApi.reset()).then((message) => {
      setResetting(false);
      setResetError(message);
      if (!message) setConfirmReset(false);
    });
  };

  return (
    <>
      <SettingRow
        title={t("settings.advanced.hardwareAcceleration.title")}
        description={
          <>
            {t("settings.advanced.hardwareAcceleration.description")}
            {needsRestart && (
              <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-foreground">
                {t("settings.advanced.hardwareAcceleration.restart")}
                {/* In `npm run dev`, restarting would lose the dev server. */}
                {!import.meta.env.DEV && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      void runAction(() => window.streamy.relaunch()).then(
                        setError,
                      );
                    }}
                  >
                    <RotateCw />
                    {t("settings.advanced.hardwareAcceleration.restartNow")}
                  </Button>
                )}
              </span>
            )}
          </>
        }
      >
        {({ titleId, descriptionId }) => (
          <Switch
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            checked={hardwareAcceleration}
            onCheckedChange={(enabled) => {
              void runAction(() =>
                settingsApi.update({ hardwareAcceleration: enabled }),
              ).then(setError);
            }}
          />
        )}
      </SettingRow>

      <SettingRow
        title={t("settings.advanced.hardwareEncoding.title")}
        description={t("settings.advanced.hardwareEncoding.description")}
      >
        <SegmentedControl
          label={t("settings.advanced.hardwareEncoding.title")}
          size="sm"
          options={encodingOptions}
          value={hardwareEncoding}
          onChange={(next) => {
            void runAction(() =>
              settingsApi.update({ hardwareEncoding: next }),
            ).then(setError);
          }}
        />
      </SettingRow>

      <SettingRow
        title={t("settings.advanced.engine.title")}
        description={<EngineSummary {...engine} />}
      >
        {null}
      </SettingRow>

      <SettingRow
        title={t("settings.advanced.logs.title")}
        description={t("settings.advanced.logs.description")}
      >
        <Button
          size="sm"
          variant="outline"
          aria-label={t("settings.advanced.logs.open")}
          onClick={() => {
            void runAction(() => window.streamy.openLogs()).then(setError);
          }}
        >
          <FolderOpen />
          {t("common.open")}
        </Button>
      </SettingRow>

      <SettingRow
        title={t("settings.advanced.dataFolder.title")}
        description={t("settings.advanced.dataFolder.description")}
      >
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            void runAction(() => settingsApi.openDataDir()).then(setError);
          }}
        >
          <FolderOpen />
          {t("common.open")}
        </Button>
      </SettingRow>

      <SettingRow
        title={t("settings.advanced.reset.title")}
        description={t("settings.advanced.reset.description")}
      >
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setResetError(null);
            setConfirmReset(true);
          }}
        >
          {t("settings.advanced.reset.button")}
        </Button>
      </SettingRow>

      {error && (
        <p role="alert" className="pt-2 text-sm text-danger">
          {error}
        </p>
      )}

      <ConfirmDialog
        open={confirmReset}
        title={t("settings.advanced.resetConfirm.title")}
        description={t("settings.advanced.resetConfirm.description")}
        confirmLabel={t("settings.advanced.resetConfirm.confirm")}
        busy={resetting}
        error={resetError}
        onConfirm={reset}
        onClose={() => {
          setConfirmReset(false);
        }}
      />
    </>
  );
}

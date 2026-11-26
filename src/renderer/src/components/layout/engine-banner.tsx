import { FileText, HardDrive } from "lucide-react";
import { useEffect, useState } from "react";
import type { EngineStatus } from "../../../../shared/api";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { useEngineStatus } from "@/hooks/use-engine-status";
import { useHealth } from "@/hooks/use-health";
import { engineHasRun } from "@/lib/engine-status";
import { useT } from "@/lib/i18n";
import { runAction, openSettings } from "@/lib/settings";
import { toast } from "@/lib/toast";

/** A normal launch takes a moment; only say something if it's slow. */
export const SLOW_START_MS = 3000;

/**
 * News about the playback engine, under the title bar: it's restarting, it
 * keeps crashing, or the disk is full. Nothing while all is well, and
 * nothing during a normal launch.
 */
export function EngineBanner() {
  const t = useT();
  const status = useEngineStatus();
  const slowStart = useSlowStart(status);
  const running = status === null || status.state === "running";
  // Asked only while the engine runs (it would fail otherwise).
  const health = useHealth();

  if (status?.state === "failed") {
    return (
      <Banner
        tone="danger"
        title={t("app.engine.failed.title")}
        actions={<OpenLogsButton />}
      >
        {t("app.engine.failed.body")}
      </Banner>
    );
  }

  const hasRun = engineHasRun();
  if (
    status?.state === "restarting" ||
    (status?.state === "starting" && (hasRun || slowStart))
  ) {
    return (
      <Banner
        busy
        tone="warning"
        title={hasRun ? t("app.engine.reconnecting") : t("app.engine.starting")}
      />
    );
  }

  if (running && health.data?.lowDiskSpace) {
    return (
      <Banner
        tone="warning"
        title={t("app.engine.diskFull.title")}
        actions={
          <Button
            size="sm"
            variant="outline"
            className="h-7 bg-transparent px-2.5"
            onClick={() => {
              openSettings("storage");
            }}
          >
            <HardDrive />
            {t("app.engine.diskFull.storage")}
          </Button>
        }
      >
        {t("app.engine.diskFull.body")}
      </Banner>
    );
  }

  return null;
}

/** True when the engine has been "starting" for longer than SLOW_START_MS. */
function useSlowStart(status: EngineStatus | null): boolean {
  // Which status object was found slow. Every change from the main process
  // is a new object, so a later "starting" begins its own wait.
  const [slowFor, setSlowFor] = useState<EngineStatus | null>(null);

  useEffect(() => {
    if (status?.state !== "starting") return;
    const id = setTimeout(() => {
      setSlowFor(status);
    }, SLOW_START_MS);
    return () => {
      clearTimeout(id);
    };
  }, [status]);

  return status !== null && slowFor === status;
}

function OpenLogsButton() {
  const t = useT();
  return (
    <Button
      size="sm"
      variant="outline"
      className="h-7 bg-transparent px-2.5"
      onClick={() => {
        void runAction(() => window.streamy.openLogs()).then((message) => {
          if (message) {
            toast.error(t("app.engine.failed.logsFailed"), {
              description: message,
            });
          }
        });
      }}
    >
      <FileText />
      {t("app.engine.failed.openLogs")}
    </Button>
  );
}

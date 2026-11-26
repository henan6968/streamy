import {
  KEEP_SHARING_CHOICES_MINUTES,
  MAX_CONNECTION_CHOICES,
  RATE_LIMIT_CHOICES_KBPS,
  type SettingsSnapshot,
  type SettingsUpdate,
} from "../../../../shared/settings";
import { SettingRow } from "@/components/settings/setting-row";
import { Select } from "@/components/ui/select";
import { formatRateLimit } from "@/lib/format";
import { type T, useT } from "@/lib/i18n";
import { settingsApi } from "@/lib/settings";

// <select> values are strings and can't be null, so null ("unlimited",
// "until Streamy quits") gets a name of its own.
const NONE = "none";

function update(patch: SettingsUpdate) {
  settingsApi.update(patch).catch((error: unknown) => {
    console.error("Could not change the setting:", error);
  });
}

/** The offered choices, plus the current value if it's another one. */
function withCurrent(choices: readonly number[], current: number | null) {
  const list = [...choices];
  if (current !== null && !list.includes(current)) {
    list.push(current); // e.g. edited by hand in settings.json
    list.sort((a, b) => a - b);
  }
  return list;
}

function sharingLabel(minutes: number, t: T): string {
  if (minutes === 0) return t("common.off");
  if (minutes % 60 === 0) {
    const hours = minutes / 60;
    return t("settings.network.keepSharing.hours", { count: hours });
  }
  return t("settings.network.keepSharing.minutes", { count: minutes });
}

export function NetworkSection({ snapshot }: { snapshot: SettingsSnapshot }) {
  const t = useT();
  const {
    downloadLimitKBps,
    uploadLimitKBps,
    keepSharingMinutes,
    maxConnections,
  } = snapshot.settings;

  const sharingChoices = withCurrent(
    KEEP_SHARING_CHOICES_MINUTES.filter((value) => value !== null),
    keepSharingMinutes,
  );

  return (
    <>
      <SettingRow
        title={t("settings.network.downloadLimit.title")}
        description={t("settings.network.downloadLimit.description")}
      >
        {({ titleId, descriptionId }) => (
          <RateLimitSelect
            titleId={titleId}
            descriptionId={descriptionId}
            value={downloadLimitKBps}
            onChange={(value) => {
              update({ downloadLimitKBps: value });
            }}
          />
        )}
      </SettingRow>

      <SettingRow
        title={t("settings.network.uploadLimit.title")}
        description={t("settings.network.uploadLimit.description")}
      >
        {({ titleId, descriptionId }) => (
          <RateLimitSelect
            titleId={titleId}
            descriptionId={descriptionId}
            value={uploadLimitKBps}
            onChange={(value) => {
              update({ uploadLimitKBps: value });
            }}
          />
        )}
      </SettingRow>

      <SettingRow
        title={t("settings.network.keepSharing.title")}
        description={t("settings.network.keepSharing.description")}
      >
        {({ titleId, descriptionId }) => (
          <Select
            size="sm"
            className="w-44"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            value={
              keepSharingMinutes === null ? NONE : String(keepSharingMinutes)
            }
            onChange={(event) => {
              const { value } = event.target;
              update({
                keepSharingMinutes: value === NONE ? null : Number(value),
              });
            }}
          >
            {sharingChoices.map((minutes) => (
              <option key={minutes} value={minutes}>
                {sharingLabel(minutes, t)}
              </option>
            ))}
            <option value={NONE}>
              {t("settings.network.keepSharing.untilQuit")}
            </option>
          </Select>
        )}
      </SettingRow>

      <SettingRow
        title={t("settings.network.maxConnections.title")}
        description={t("settings.network.maxConnections.description")}
      >
        {({ titleId, descriptionId }) => (
          <Select
            size="sm"
            className="w-44"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            value={String(maxConnections)}
            onChange={(event) => {
              update({ maxConnections: Number(event.target.value) });
            }}
          >
            {withCurrent(MAX_CONNECTION_CHOICES, maxConnections).map(
              (count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ),
            )}
          </Select>
        )}
      </SettingRow>
    </>
  );
}

function RateLimitSelect({
  titleId,
  descriptionId,
  value,
  onChange,
}: {
  titleId: string;
  descriptionId: string;
  value: number | null;
  onChange: (value: number | null) => void;
}) {
  const t = useT();

  return (
    <Select
      size="sm"
      className="w-44"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      value={value === null ? NONE : String(value)}
      onChange={(event) => {
        const next = event.target.value;
        onChange(next === NONE ? null : Number(next));
      }}
    >
      <option value={NONE}>{t("settings.network.rateLimit.unlimited")}</option>
      {withCurrent(RATE_LIMIT_CHOICES_KBPS, value).map((kbps) => (
        <option key={kbps} value={kbps}>
          {formatRateLimit(kbps)}
        </option>
      ))}
    </Select>
  );
}

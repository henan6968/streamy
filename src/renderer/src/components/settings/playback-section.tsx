import type { MessageKey } from "../../../../shared/i18n";
import {
  type SettingsSnapshot,
  type SettingsUpdate,
  SUBTITLES_OFF,
  type SubtitleBackground,
  type SubtitleColor,
  type SubtitleSize,
} from "../../../../shared/settings";
import { SettingRow } from "@/components/settings/setting-row";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";
import { languageOptions } from "@/lib/languages";
import { settingsApi } from "@/lib/settings";
import {
  SUBTITLE_BACKGROUND_CLASS,
  SUBTITLE_COLOR_CLASS,
  SUBTITLE_SIZE_SCALE,
} from "@/lib/subtitle-style";

// <select> values can't be null, so "Automatic" gets a name of its own.
const AUTOMATIC = "auto";

const SIZE_OPTIONS: { value: SubtitleSize; labelKey: MessageKey }[] = [
  { value: "s", labelKey: "settings.playback.subtitle.size.s" },
  { value: "m", labelKey: "settings.playback.subtitle.size.m" },
  { value: "l", labelKey: "settings.playback.subtitle.size.l" },
  { value: "xl", labelKey: "settings.playback.subtitle.size.xl" },
];

const BACKGROUND_OPTIONS: {
  value: SubtitleBackground;
  labelKey: MessageKey;
}[] = [
  { value: "none", labelKey: "settings.playback.subtitle.background.none" },
  {
    value: "shadow",
    labelKey: "settings.playback.subtitle.background.shadow",
  },
  { value: "box", labelKey: "settings.playback.subtitle.background.box" },
];

const COLOR_OPTIONS: { value: SubtitleColor; labelKey: MessageKey }[] = [
  { value: "white", labelKey: "settings.playback.subtitle.color.white" },
  { value: "yellow", labelKey: "settings.playback.subtitle.color.yellow" },
];

function update(patch: SettingsUpdate) {
  settingsApi.update(patch).catch((error: unknown) => {
    console.error("Could not change the setting:", error);
  });
}

export function PlaybackSection({ snapshot }: { snapshot: SettingsSnapshot }) {
  const t = useT();
  const {
    audioLanguage,
    subtitleLanguage,
    subtitleSize,
    subtitleBackground,
    subtitleColor,
  } = snapshot.settings;

  // The current choices always appear, even if they aren't in the list
  // (e.g. a language picked in the player).
  const languages = languageOptions([
    audioLanguage,
    subtitleLanguage === SUBTITLES_OFF ? null : subtitleLanguage,
  ]);

  const sizeOptions = SIZE_OPTIONS.map(({ value, labelKey }) => ({
    value,
    label: t(labelKey),
  }));
  const backgroundOptions = BACKGROUND_OPTIONS.map(({ value, labelKey }) => ({
    value,
    label: t(labelKey),
  }));
  const colorOptions = COLOR_OPTIONS.map(({ value, labelKey }) => ({
    value,
    label: t(labelKey),
  }));

  return (
    <>
      <SettingRow
        title={t("settings.playback.audioLanguage.title")}
        description={t("settings.playback.audioLanguage.description")}
      >
        {({ titleId, descriptionId }) => (
          <Select
            size="sm"
            className="w-44"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            value={audioLanguage ?? AUTOMATIC}
            onChange={(event) => {
              const { value } = event.target;
              update({ audioLanguage: value === AUTOMATIC ? null : value });
            }}
          >
            <option value={AUTOMATIC}>{t("common.automatic")}</option>
            {languages.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </Select>
        )}
      </SettingRow>

      <SettingRow
        title={t("settings.playback.subtitles.title")}
        description={t("settings.playback.subtitles.description")}
      >
        {({ titleId, descriptionId }) => (
          <Select
            size="sm"
            className="w-44"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            value={subtitleLanguage ?? AUTOMATIC}
            onChange={(event) => {
              const { value } = event.target;
              update({
                subtitleLanguage: value === AUTOMATIC ? null : value,
              });
            }}
          >
            <option value={SUBTITLES_OFF}>{t("common.off")}</option>
            <option value={AUTOMATIC}>{t("common.automatic")}</option>
            {languages.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </Select>
        )}
      </SettingRow>

      <SettingRow stacked title={t("settings.playback.subtitleStyle.title")}>
        <div className="flex flex-col gap-4">
          <SubtitlePreview
            size={subtitleSize}
            background={subtitleBackground}
            color={subtitleColor}
          />
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 text-sm">
            <span className="text-muted-foreground" aria-hidden>
              {t("settings.playback.subtitle.size")}
            </span>
            <SegmentedControl
              label={t("settings.playback.subtitle.sizeLabel")}
              size="sm"
              className="w-fit"
              options={sizeOptions}
              value={subtitleSize}
              onChange={(next) => {
                update({ subtitleSize: next });
              }}
            />
            <span className="text-muted-foreground" aria-hidden>
              {t("settings.playback.subtitle.background")}
            </span>
            <SegmentedControl
              label={t("settings.playback.subtitle.backgroundLabel")}
              size="sm"
              className="w-fit"
              options={backgroundOptions}
              value={subtitleBackground}
              onChange={(next) => {
                update({ subtitleBackground: next });
              }}
            />
            <span className="text-muted-foreground" aria-hidden>
              {t("settings.playback.subtitle.color")}
            </span>
            <SegmentedControl
              label={t("settings.playback.subtitle.colorLabel")}
              size="sm"
              className="w-fit"
              options={colorOptions}
              value={subtitleColor}
              onChange={(next) => {
                update({ subtitleColor: next });
              }}
            />
          </div>
        </div>
      </SettingRow>
    </>
  );
}

/** A subtitle line over a dark "video", styled like the player shows it. */
function SubtitlePreview({
  size,
  background,
  color,
}: {
  size: SubtitleSize;
  background: SubtitleBackground;
  color: SubtitleColor;
}) {
  const t = useT();

  return (
    <div
      aria-hidden
      // A dusky gradient, so the shadow and box can be judged on a picture.
      className="flex h-28 items-end justify-center overflow-hidden rounded-md bg-linear-to-b from-slate-500 via-slate-700 to-slate-900 px-4 pb-4"
    >
      <p
        className={cn(
          "text-center leading-[1.3] font-medium",
          SUBTITLE_COLOR_CLASS[color],
        )}
        style={{ fontSize: `${(18 * SUBTITLE_SIZE_SCALE[size]).toFixed(1)}px` }}
      >
        <span
          className={cn(
            "box-decoration-clone",
            SUBTITLE_BACKGROUND_CLASS[background],
          )}
        >
          {t("settings.playback.subtitle.preview")}
        </span>
      </p>
    </div>
  );
}

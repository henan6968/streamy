import { Monitor, Moon, Sun } from "lucide-react";
import type { MessageKey } from "../../../../shared/i18n";
import {
  type SettingsSnapshot,
  type SettingsUpdate,
  type Theme,
  UI_SCALES,
} from "../../../../shared/settings";
import { SettingRow } from "@/components/settings/setting-row";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useT } from "@/lib/i18n";
import { isMac } from "@/lib/platform";
import { settingsApi } from "@/lib/settings";

const THEME_OPTIONS: {
  value: Theme;
  labelKey: MessageKey;
  icon: typeof Sun;
}[] = [
  {
    value: "system",
    labelKey: "settings.appearance.theme.system",
    icon: Monitor,
  },
  { value: "light", labelKey: "settings.appearance.theme.light", icon: Sun },
  { value: "dark", labelKey: "settings.appearance.theme.dark", icon: Moon },
];

const SCALE_OPTIONS = UI_SCALES.map((scale) => ({
  value: String(scale),
  label: `${Math.round(scale * 100)}%`,
}));

function update(patch: SettingsUpdate) {
  settingsApi.update(patch).catch((error: unknown) => {
    console.error("Could not change the setting:", error);
  });
}

export function AppearanceSection({
  snapshot,
}: {
  snapshot: SettingsSnapshot;
}) {
  const t = useT();
  const { theme, uiScale } = snapshot.settings;
  const mod = isMac ? "⌘" : "Ctrl";
  const themeOptions = THEME_OPTIONS.map(({ value, labelKey, icon }) => ({
    value,
    label: t(labelKey),
    icon,
  }));

  return (
    <>
      <SettingRow
        title={t("settings.appearance.theme.title")}
        description={t("settings.appearance.theme.description")}
      >
        <SegmentedControl
          label={t("settings.appearance.theme.title")}
          size="sm"
          options={themeOptions}
          value={theme}
          onChange={(next) => {
            update({ theme: next });
          }}
        />
      </SettingRow>

      <SettingRow
        title={t("settings.appearance.scale.title")}
        description={t("settings.appearance.scale.description", { mod })}
      >
        <SegmentedControl
          label={t("settings.appearance.scale.title")}
          size="sm"
          options={SCALE_OPTIONS}
          value={String(uiScale)}
          onChange={(next) => {
            const scale = UI_SCALES.find((value) => String(value) === next);
            if (scale !== undefined) update({ uiScale: scale });
          }}
        />
      </SettingRow>
    </>
  );
}

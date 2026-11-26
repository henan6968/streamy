import { useEffect, useState } from "react";
import {
  type Language,
  type SettingsSnapshot,
  type SystemIntegration,
} from "../../../../shared/settings";
import { SettingRow } from "@/components/settings/setting-row";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Switch } from "@/components/ui/switch";
import { useT } from "@/lib/i18n";
import { platform } from "@/lib/platform";
import { runAction, settingsApi, systemApi } from "@/lib/settings";

/** How Streamy fits into the computer: its language, login, magnet links. */
export function GeneralSection({ snapshot }: { snapshot: SettingsSnapshot }) {
  const t = useT();
  const { language } = snapshot.settings;
  const [system, setSystem] = useState<SystemIntegration | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    systemApi
      .get()
      .then((next) => {
        if (active) setSystem(next);
      })
      .catch((reason: unknown) => {
        console.error(reason);
      });
    return () => {
      active = false;
    };
  }, []);

  /** Changes an OS setting, then shows what the OS actually reports. */
  const change = (action: () => Promise<SystemIntegration>) => {
    setError(null);
    void runAction(async () => {
      setSystem(await action());
    }).then(setError);
  };

  // Each language is named in itself, so it reads right in any of them.
  const languageOptions: { value: Language; label: string }[] = [
    { value: "system", label: t("general.language.system") },
    { value: "en", label: "English" },
    { value: "zh-CN", label: "简体中文" },
  ];

  return (
    <>
      <SettingRow
        title={t("general.language.title")}
        description={t("general.language.description")}
      >
        <SegmentedControl
          label={t("general.language.title")}
          size="sm"
          options={languageOptions}
          value={language}
          onChange={(next) => {
            setError(null);
            void runAction(async () => {
              await settingsApi.update({ language: next });
            }).then(setError);
          }}
        />
      </SettingRow>

      {system && (
        <>
          <SettingRow
            title={t("general.openAtLogin.title")}
            description={
              !system.available
                ? t("general.openAtLogin.descriptionUnavailable")
                : system.openAtLoginNeedsApproval
                  ? t("general.openAtLogin.descriptionNeedsApproval")
                  : t("general.openAtLogin.description")
            }
          >
            {({ titleId, descriptionId }) => (
              <Switch
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                checked={system.openAtLogin}
                disabled={!system.available}
                onCheckedChange={(enabled) => {
                  change(() => systemApi.setOpenAtLogin(enabled));
                }}
              />
            )}
          </SettingRow>

          <SettingRow
            title={t("general.magnetLinks.title")}
            description={
              !system.available
                ? t("general.magnetLinks.descriptionUnavailable")
                : magnetUnsupported(system)
                  ? t("general.magnetLinks.descriptionUnsupported")
                  : magnetLocked(system)
                    ? t("general.magnetLinks.descriptionLocked")
                    : t("general.magnetLinks.description")
            }
          >
            {({ titleId, descriptionId }) => (
              <Switch
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                checked={system.handlesMagnetLinks}
                disabled={
                  !system.available ||
                  magnetUnsupported(system) ||
                  magnetLocked(system)
                }
                onCheckedChange={(enabled) => {
                  change(() => systemApi.setHandlesMagnetLinks(enabled));
                }}
              />
            )}
          </SettingRow>
        </>
      )}

      {error && (
        <p role="alert" className="pt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </>
  );
}

// Linux can make Streamy the magnet handler but can't undo it.
function magnetLocked(system: SystemIntegration): boolean {
  return platform === "linux" && system.handlesMagnetLinks;
}

// The Linux AppImage can't become the magnet app at all (only the .deb can).
function magnetUnsupported(system: SystemIntegration): boolean {
  return system.available && !system.canHandleMagnetLinks;
}

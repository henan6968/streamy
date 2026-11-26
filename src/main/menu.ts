import { app, Menu, type MenuItemConstructorOptions } from "electron";
import { t } from "../shared/i18n";

export interface AppActions {
  openSettings: () => void;
  /** Asks for a .torrent file and opens it. */
  openTorrentFile: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

/**
 * The app menu. On macOS it's the menu bar at the top of the screen, and it's
 * also what makes ⌘C / ⌘V / ⌘Q work. On Windows/Linux it isn't shown (there's
 * no native title bar); see shortcuts.ts for their keyboard shortcuts.
 */
export function setAppMenu(actions: AppActions): void {
  const isMac = process.platform === "darwin";
  const settings: MenuItemConstructorOptions = {
    // The macOS item opens a dialog, so it has the ellipsis.
    label: isMac ? t("main.menu.settings") : t("common.settings"),
    accelerator: "CmdOrCtrl+,",
    click: actions.openSettings,
  };
  const openTorrentFile: MenuItemConstructorOptions = {
    label: t("main.menu.openTorrentFile"),
    accelerator: "CmdOrCtrl+O",
    click: actions.openTorrentFile,
  };
  const devTools: MenuItemConstructorOptions[] = app.isPackaged
    ? []
    : [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
      ];

  const template: MenuItemConstructorOptions[] = [
    ...(isMac
      ? [
          {
            label: app.getName(),
            submenu: [
              { role: "about" },
              { type: "separator" },
              settings,
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          } satisfies MenuItemConstructorOptions,
          {
            label: t("main.menu.file"),
            submenu: [
              openTorrentFile,
              { type: "separator" },
              { role: "close" },
            ],
          } satisfies MenuItemConstructorOptions,
        ]
      : [
          {
            label: t("main.menu.file"),
            submenu: [
              openTorrentFile,
              settings,
              { type: "separator" },
              { role: "quit" },
            ],
          } satisfies MenuItemConstructorOptions,
        ]),
    { role: "editMenu" },
    {
      label: t("main.menu.view"),
      submenu: [
        ...devTools,
        // Zoom = the "Interface size" setting, so both stay in sync.
        {
          label: t("main.menu.actualSize"),
          accelerator: "CmdOrCtrl+0",
          click: actions.resetZoom,
        },
        {
          label: t("main.menu.zoomIn"),
          accelerator: "CmdOrCtrl+Plus",
          click: actions.zoomIn,
        },
        // ⌘= (no Shift) zooms in too, like in browsers.
        {
          label: t("main.menu.zoomIn"),
          accelerator: "CmdOrCtrl+=",
          click: actions.zoomIn,
          visible: false,
          acceleratorWorksWhenHidden: true,
        },
        {
          label: t("main.menu.zoomOut"),
          accelerator: "CmdOrCtrl+-",
          click: actions.zoomOut,
        },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    { role: "windowMenu" },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

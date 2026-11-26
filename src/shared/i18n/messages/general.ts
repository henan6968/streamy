// Settings → General: how Streamy fits into the computer, and the language
// of everything it says. (See general-section.tsx.)

import type { Entry } from "../types";

export const en = {
  "general.language.title": "Language",
  "general.language.description":
    "The language of Streamy's menus and text. System follows your computer's language.",
  "general.language.system": "System",
  "general.language.changed": "Streamy now speaks {language}.",

  "general.openAtLogin.title": "Open at login",
  "general.openAtLogin.description":
    "Start Streamy when you sign in to your computer.",
  "general.openAtLogin.descriptionUnavailable":
    "Start Streamy when you sign in to your computer. Only works in the installed app.",
  "general.openAtLogin.descriptionNeedsApproval":
    "Almost there: allow Streamy in System Settings → General → Login Items.",

  "general.magnetLinks.title": "Open magnet links with Streamy",
  "general.magnetLinks.description":
    "Clicking a magnet link in your browser opens it here.",
  "general.magnetLinks.descriptionUnavailable":
    "Clicking a magnet link in your browser opens it here. Only works in the installed app.",
  "general.magnetLinks.descriptionUnsupported":
    "The AppImage can't open magnet links. Install the .deb version for this.",
  "general.magnetLinks.descriptionLocked":
    "To stop, choose another app for magnet links in your system settings.",
} as const satisfies Record<string, Entry>;

/** Simplified Chinese. */
export const zh: Record<keyof typeof en, Entry> = {
  "general.language.title": "语言",
  "general.language.description":
    "Streamy 菜单和文字使用的语言。「跟随系统」会使用电脑的语言。",
  "general.language.system": "跟随系统",
  "general.language.changed": "Streamy 现在使用{language}。",

  "general.openAtLogin.title": "登录时启动",
  "general.openAtLogin.description": "登录电脑后自动启动 Streamy。",
  "general.openAtLogin.descriptionUnavailable":
    "登录电脑后自动启动 Streamy。仅在安装后的应用中可用。",
  "general.openAtLogin.descriptionNeedsApproval":
    "只差一步：在「系统设置 → 通用 → 登录项」中允许 Streamy。",

  "general.magnetLinks.title": "用 Streamy 打开磁力链接",
  "general.magnetLinks.description":
    "在浏览器里点击磁力链接时，用 Streamy 打开。",
  "general.magnetLinks.descriptionUnavailable":
    "在浏览器里点击磁力链接时，用 Streamy 打开。仅在安装后的应用中可用。",
  "general.magnetLinks.descriptionUnsupported":
    "AppImage 版本无法打开磁力链接，请安装 .deb 版本。",
  "general.magnetLinks.descriptionLocked":
    "要关闭此功能，请在系统设置里为磁力链接选择其他应用。",
};

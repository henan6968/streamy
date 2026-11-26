// The main process: the menu, native dialogs, status messages it sends to
// the UI, and update checks. Keys start with "main.".

import type { Entry } from "../types";

export const en = {
  // The macOS menu bar. On Windows and Linux there is no menu bar (and no
  // native title bar), so those labels are never on screen; the menu still
  // provides the standard shortcuts.
  // "Settings" without the ellipsis is common.settings (Windows, Linux).
  "main.menu.settings": "Settings…",
  "main.menu.openTorrentFile": "Open Torrent File…",
  "main.menu.file": "File",
  "main.menu.view": "View",
  "main.menu.actualSize": "Actual Size",
  "main.menu.zoomIn": "Zoom In",
  "main.menu.zoomOut": "Zoom Out",

  // Settings → Storage: the video folder (cache-dir.ts).
  "main.videoFolder.chooseTitle": "Choose where Streamy keeps videos",
  "main.videoFolder.useFolder": "Use This Folder",
  "main.videoFolder.unavailable":
    "The video folder isn't available. If it's on an external drive, connect it and try again.",
  "main.videoFolder.oldUnavailable":
    "The old video folder isn't available. If it's on an external drive, connect it and try again.",
  "main.videoFolder.notChanged": "The video folder hasn't changed.",
  // Written into the folder as a note for people who open it.
  "main.videoFolder.markerNote":
    "Streamy keeps the videos you watch in this folder.\n" +
    "It only ever deletes what it downloaded itself (the torrents, playback and subtitles folders).\n",
  "main.videoFolder.cantOpen":
    "Streamy can't open that folder. Choose a different one.",
  "main.videoFolder.cantWrite":
    "Streamy can't save files in that folder. Choose a different one.",
  "main.videoFolder.chooseLocal": "Choose a folder on this computer.",
  "main.videoFolder.cantUseItem":
    'Streamy can\'t use the "{name}" item in {folder}. Choose a different folder.',
  "main.videoFolder.alreadyThere":
    'There\'s already a "{name}" folder with other files in {folder}. Choose a different folder.',
  "main.videoFolder.notOurs":
    "This doesn't look like Streamy's video folder, so nothing was deleted.",

  // The playback engine (host.ts, client.ts, proxy.ts). Its own words go to
  // main.log; these sentences are what the UI is shown.
  "main.engine.notRunning":
    "The playback engine isn't running. Try again in a moment.",
  "main.engine.unreachable":
    "Streamy couldn't reach the playback engine. Try again in a moment.",
  "main.engine.tooSlowToAnswer":
    "The playback engine took too long to answer. Try again in a moment.",
  "main.engine.requestFailed":
    "The playback engine couldn't do that (error {status}).",
  "main.engine.badAnswer":
    "The playback engine gave an answer Streamy doesn't understand.",
  "main.engine.noClear":
    "This version of the playback engine can't clear videos yet.",
  "main.engine.stoppedUnexpectedly":
    "The playback engine stopped unexpectedly.",
  "main.engine.cantStart": "The playback engine couldn't start.",
  "main.engine.tooSlowToStart": "The playback engine took too long to start.",
  "main.engine.badRequest": "Bad request.",

  // .torrent files opened from outside Streamy (torrent-files.ts).
  "main.torrent.openTitle": "Open a torrent file",
  "main.torrent.filter": "Torrent files",
  "main.torrent.notAFile": '"{name}" isn\'t a file.',
  "main.torrent.empty": '"{name}" is empty.',
  "main.torrent.tooBig":
    '"{name}" is too big to be a torrent file (over {limit} MB).',
  "main.torrent.notFound": '"{name}" couldn\'t be found.',
  "main.torrent.notAllowed": 'Streamy isn\'t allowed to read "{name}".',
  "main.torrent.unreadable": 'Streamy couldn\'t read "{name}".',
  "main.torrent.engineNotRunning":
    "\"{name}\" couldn't be opened: the playback engine isn't running. Try again in a moment.",
  "main.torrent.cantOpen": '"{name}" couldn\'t be opened.',
  "main.torrent.cantOpenReason": '"{name}" couldn\'t be opened. {reason}',

  // Update checks (updater.ts): Settings → Advanced, and the update button.
  "main.update.error.offline":
    "Couldn't reach GitHub. Check your internet connection.",
  "main.update.error.busy":
    "GitHub is busy right now. Streamy will try again later.",
  "main.update.error.check":
    "Couldn't check for updates. Streamy will try again later.",
  "main.update.error.download":
    "Couldn't download the update. Streamy will try again later.",
  "main.update.error.browser": "Couldn't open your browser.",
} as const satisfies Record<string, Entry>;

/** Simplified Chinese. */
export const zh: Record<keyof typeof en, Entry> = {
  "main.menu.settings": "设置…",
  "main.menu.openTorrentFile": "打开种子文件…",
  "main.menu.file": "文件",
  "main.menu.view": "视图",
  "main.menu.actualSize": "实际大小",
  "main.menu.zoomIn": "放大",
  "main.menu.zoomOut": "缩小",

  "main.videoFolder.chooseTitle": "选择 Streamy 保存视频的位置",
  "main.videoFolder.useFolder": "使用此文件夹",
  "main.videoFolder.unavailable":
    "视频文件夹不可用。如果它在外接磁盘上，请连接后重试。",
  "main.videoFolder.oldUnavailable":
    "原来的视频文件夹不可用。如果它在外接磁盘上，请连接后重试。",
  "main.videoFolder.notChanged": "视频文件夹没有变化。",
  "main.videoFolder.markerNote":
    "Streamy 把你观看的视频保存在这个文件夹里。\n" +
    "它只会删除自己下载的内容（即种子、播放和字幕文件夹）。\n",
  "main.videoFolder.cantOpen": "Streamy 无法打开那个文件夹。请选择其他文件夹。",
  "main.videoFolder.cantWrite":
    "Streamy 无法在那个文件夹里保存文件。请选择其他文件夹。",
  "main.videoFolder.chooseLocal": "请选择这台电脑上的文件夹。",
  "main.videoFolder.cantUseItem":
    "Streamy 无法使用 {folder} 里的「{name}」。请选择其他文件夹。",
  "main.videoFolder.alreadyThere":
    "{folder} 里已经有一个包含其他文件的「{name}」文件夹。请选择其他文件夹。",
  "main.videoFolder.notOurs":
    "这看起来不是 Streamy 的视频文件夹，因此没有删除任何内容。",

  "main.engine.notRunning": "播放引擎没有运行。请稍后重试。",
  "main.engine.unreachable": "Streamy 无法连接到播放引擎。请稍后重试。",
  "main.engine.tooSlowToAnswer": "播放引擎响应时间过长。请稍后重试。",
  "main.engine.requestFailed": "播放引擎无法完成该操作（错误 {status}）。",
  "main.engine.badAnswer": "播放引擎返回了 Streamy 无法识别的结果。",
  "main.engine.noClear": "这个版本的播放引擎还无法清理视频。",
  "main.engine.stoppedUnexpectedly": "播放引擎意外停止了。",
  "main.engine.cantStart": "播放引擎无法启动。",
  "main.engine.tooSlowToStart": "播放引擎启动时间过长。",
  "main.engine.badRequest": "请求无效。",

  "main.torrent.openTitle": "打开种子文件",
  "main.torrent.filter": "种子文件",
  "main.torrent.notAFile": "「{name}」不是文件。",
  "main.torrent.empty": "「{name}」是空文件。",
  "main.torrent.tooBig":
    "「{name}」太大，不是有效的种子文件（超过 {limit} MB）。",
  "main.torrent.notFound": "找不到「{name}」。",
  "main.torrent.notAllowed": "Streamy 无权读取「{name}」。",
  "main.torrent.unreadable": "Streamy 无法读取「{name}」。",
  "main.torrent.engineNotRunning":
    "无法打开「{name}」：播放引擎没有运行。请稍后重试。",
  "main.torrent.cantOpen": "无法打开「{name}」。",
  "main.torrent.cantOpenReason": "无法打开「{name}」。{reason}",

  "main.update.error.offline": "无法连接 GitHub。请检查网络连接。",
  "main.update.error.busy": "GitHub 现在很忙，Streamy 稍后会再试。",
  "main.update.error.check": "无法检查更新，Streamy 稍后会再试。",
  "main.update.error.download": "无法下载更新，Streamy 稍后会再试。",
  "main.update.error.browser": "无法打开浏览器。",
};

// Settings: the dialog and its sections (Appearance, Playback, Storage,
// Network, Advanced, About). Keys start with "settings.".

import type { Entry } from "../types";

export const en = {
  // The dialog around the sections.
  "settings.dialog.sections": "Settings sections",
  "settings.dialog.close": "Close settings",
  "settings.section.general": "General",
  "settings.section.appearance": "Appearance",
  "settings.section.playback": "Playback",
  "settings.section.storage": "Storage",
  "settings.section.network": "Network",
  "settings.section.advanced": "Advanced",
  "settings.section.about": "About",

  // Appearance.
  "settings.appearance.theme.title": "Theme",
  "settings.appearance.theme.description":
    "System follows your computer's light or dark mode.",
  "settings.appearance.theme.system": "System",
  "settings.appearance.theme.light": "Light",
  "settings.appearance.theme.dark": "Dark",
  "settings.appearance.scale.title": "Interface size",
  "settings.appearance.scale.description":
    "Makes everything bigger or smaller. Shortcuts: {mod} + and {mod} −.",

  // Playback.
  "settings.playback.audioLanguage.title": "Audio language",
  "settings.playback.audioLanguage.description":
    "Played when a video has several. Automatic uses the video's own choice.",
  "settings.playback.subtitles.title": "Subtitles",
  "settings.playback.subtitles.description":
    "Automatic shows them when the video says to, like for foreign-language parts.",
  "settings.playback.subtitleStyle.title": "Subtitle style",
  "settings.playback.subtitle.size": "Size",
  "settings.playback.subtitle.sizeLabel": "Subtitle size",
  "settings.playback.subtitle.size.s": "S",
  "settings.playback.subtitle.size.m": "M",
  "settings.playback.subtitle.size.l": "L",
  "settings.playback.subtitle.size.xl": "XL",
  "settings.playback.subtitle.background": "Background",
  "settings.playback.subtitle.backgroundLabel": "Subtitle background",
  "settings.playback.subtitle.background.none": "None",
  "settings.playback.subtitle.background.shadow": "Shadow",
  "settings.playback.subtitle.background.box": "Box",
  "settings.playback.subtitle.color": "Color",
  "settings.playback.subtitle.colorLabel": "Subtitle color",
  "settings.playback.subtitle.color.white": "White",
  "settings.playback.subtitle.color.yellow": "Yellow",
  "settings.playback.subtitle.preview": "This is how subtitles will look.",

  // Storage.
  "settings.storage.videoFolder.title": "Video folder",
  "settings.storage.videoFolder.description":
    "Streamy keeps videos here while you watch them. Choose a drive with plenty of free space.",
  "settings.storage.videoFolder.default": "Default",
  "settings.storage.videoFolder.change": "Change…",
  "settings.storage.videoFolder.showInFinder": "Show in Finder",
  "settings.storage.videoFolder.showInFileExplorer": "Show in File Explorer",
  "settings.storage.videoFolder.showInFileManager": "Show in file manager",
  "settings.storage.videoFolder.useDefault": "Use default",
  "settings.storage.videoFolder.oldFolder":
    "Videos already downloaded stay in the old folder:",
  "settings.storage.videoFolder.showOldFolder": "Show old folder",
  "settings.storage.spaceUsed.title": "Space used",
  "settings.storage.spaceUsed.description":
    "Videos you've watched. They download again if you watch them later.",
  "settings.storage.spaceUsed.descriptionMissing":
    "The folder isn't available. If it's on an external drive, connect it.",
  "settings.storage.spaceUsed.clear": "Clear now…",
  "settings.storage.sizeLimit.title": "Size limit",
  "settings.storage.sizeLimit.description":
    "When videos take more space than this, or your disk is almost full, Streamy deletes the ones you watched longest ago.",
  "settings.storage.sizeLimit.none": "No limit",
  "settings.storage.clearConfirm.title": "Clear all videos?",
  "settings.storage.clearConfirm.description":
    "This deletes the videos Streamy downloaded. They download again if you watch them later.",
  "settings.storage.clearConfirm.confirm": "Clear videos",

  // Network.
  "settings.network.downloadLimit.title": "Download limit",
  "settings.network.downloadLimit.description":
    "Leaves room for other apps on a slow connection. Videos may need to buffer more.",
  "settings.network.uploadLimit.title": "Upload limit",
  "settings.network.uploadLimit.description":
    "How fast Streamy shares with other people.",
  "settings.network.keepSharing.title": "Keep sharing after watching",
  "settings.network.keepSharing.description":
    "Torrents work because people share what they download. Sharing for a while afterwards is fair to them; Streamy stops when the time is up.",
  "settings.network.keepSharing.minutes": {
    one: "1 minute",
    other: "{count} minutes",
  },
  "settings.network.keepSharing.hours": {
    one: "1 hour",
    other: "{count} hours",
  },
  "settings.network.keepSharing.untilQuit": "Until Streamy quits",
  "settings.network.maxConnections.title": "Max connections",
  "settings.network.maxConnections.description":
    "People each torrent connects to at once. Fewer can help a slow network or an old router.",
  "settings.network.rateLimit.unlimited": "Unlimited",

  // Advanced.
  "settings.advanced.hardwareAcceleration.title": "Hardware acceleration",
  "settings.advanced.hardwareAcceleration.description":
    "Uses your graphics card to draw Streamy and play video. Turn it off if the window or video flickers or shows glitches.",
  "settings.advanced.hardwareAcceleration.restart":
    "Restart Streamy to apply this change.",
  "settings.advanced.hardwareAcceleration.restartNow": "Restart now",
  "settings.advanced.hardwareEncoding.title": "Hardware video encoding",
  "settings.advanced.hardwareEncoding.description":
    "When a video has to be converted to play, your graphics card does it faster. Turn it off if converted videos look glitchy.",
  "settings.advanced.engine.title": "Playback engine",
  "settings.advanced.engine.checking": "Checking…",
  "settings.advanced.engine.starting": "Starting…",
  "settings.advanced.engine.reconnecting": "Reconnecting…",
  "settings.advanced.engine.stoppedUnexpectedly": "It stopped unexpectedly.",
  "settings.advanced.engine.notRunning":
    "Not running. Streamy tries again in a minute.",
  "settings.advanced.engine.keepsStopping":
    "It keeps stopping. The logs say why.",
  "settings.advanced.engine.running": "Running",
  "settings.advanced.engine.ffmpegNotWorking": "ffmpeg isn't working",
  "settings.advanced.engine.conversionFailed":
    "Videos that need converting won't play. The logs say why.",
  "settings.advanced.logs.title": "Logs",
  "settings.advanced.logs.description":
    "What Streamy and its playback engine did. Useful when reporting a problem.",
  "settings.advanced.logs.open": "Open logs folder",
  "settings.advanced.dataFolder.title": "Data folder",
  "settings.advanced.dataFolder.description":
    "Where Streamy keeps your settings.",
  "settings.advanced.reset.title": "Reset all settings",
  "settings.advanced.reset.description":
    "Puts every setting back to how it was when you installed Streamy. Your videos aren't deleted.",
  "settings.advanced.reset.button": "Reset…",
  "settings.advanced.resetConfirm.title": "Reset all settings?",
  "settings.advanced.resetConfirm.description":
    "Every setting goes back to its default. Your videos aren't deleted.",
  "settings.advanced.resetConfirm.confirm": "Reset",

  // About.
  "settings.about.checkForUpdates": "Check for updates",
  "settings.about.download": "Download",
  "settings.about.releases": "Releases",
  "settings.about.restartToUpdate": "Restart to update",
  "settings.about.unsupported":
    "This copy of Streamy doesn't update itself. New versions are on GitHub.",
  "settings.about.upToDate": "Up to date. Checked {checked}.",
  "settings.about.checksByItself": "Streamy checks for updates by itself.",
  "settings.about.checksOff": "Automatic checks are off.",
  "settings.about.checking": "Checking for updates…",
  "settings.about.downloading": "Downloading version {version}…",
  "settings.about.available": "Version {version} is available.",
  "settings.about.downloadingPercent":
    "Downloading version {version}… {percent}%",
  "settings.about.ready":
    "Version {version} is ready. It installs when Streamy restarts.",
  "settings.about.checkFailed": "Couldn't check for updates.",
  "settings.about.autoCheck.title": "Check for updates automatically",
  "settings.about.autoCheck.description":
    "Asks GitHub for new versions when Streamy starts and every few hours.",
  "settings.about.licences.title": "Third-party licences",
  "settings.about.licences.description":
    "Streamy is built with software that many people made and share. Here's who, and under which licences.",
  "settings.about.licences.view": "View",
  "settings.about.licences.viewLabel": "View third-party licences",
  "settings.about.builtWith.title": "Built with",
  "settings.about.builtWith.description":
    "Electron {electron} · Chromium {chromium} · Node {node}",
  "settings.about.licences.close": "Close licences",
  "settings.about.licences.loading": "Loading the licences",
  "settings.about.licences.missingDev":
    "The licences file is missing. Run `npm run notices` to create it.",
  "settings.about.licences.missing":
    "The licences file is missing from this copy of Streamy.",

  // What a playback session did with the video (lib/encoders.ts).
  "settings.encoders.noneDirect": "None (plays the file itself)",
  "settings.encoders.noneCopy": "None (copied as it is)",
  "settings.encoders.graphicsCard": "{name} (graphics card)",
} as const satisfies Record<string, Entry>;

/** Simplified Chinese. */
export const zh: Record<keyof typeof en, Entry> = {
  "settings.dialog.sections": "设置分区",
  "settings.dialog.close": "关闭设置",
  "settings.section.general": "常规",
  "settings.section.appearance": "外观",
  "settings.section.playback": "播放",
  "settings.section.storage": "存储",
  "settings.section.network": "网络",
  "settings.section.advanced": "高级",
  "settings.section.about": "关于",

  "settings.appearance.theme.title": "主题",
  "settings.appearance.theme.description":
    "「跟随系统」会跟随电脑的浅色或深色模式。",
  "settings.appearance.theme.system": "跟随系统",
  "settings.appearance.theme.light": "浅色",
  "settings.appearance.theme.dark": "深色",
  "settings.appearance.scale.title": "界面大小",
  "settings.appearance.scale.description":
    "让所有内容变大或变小。快捷键：{mod} + 和 {mod} −。",

  "settings.playback.audioLanguage.title": "音轨语言",
  "settings.playback.audioLanguage.description":
    "视频有多条音轨时播放哪一条。「自动」会采用视频自己的选择。",
  "settings.playback.subtitles.title": "字幕",
  "settings.playback.subtitles.description":
    "「自动」会在视频要求时显示字幕，比如外语片段。",
  "settings.playback.subtitleStyle.title": "字幕样式",
  "settings.playback.subtitle.size": "大小",
  "settings.playback.subtitle.sizeLabel": "字幕大小",
  "settings.playback.subtitle.size.s": "小",
  "settings.playback.subtitle.size.m": "中",
  "settings.playback.subtitle.size.l": "大",
  "settings.playback.subtitle.size.xl": "特大",
  "settings.playback.subtitle.background": "背景",
  "settings.playback.subtitle.backgroundLabel": "字幕背景",
  "settings.playback.subtitle.background.none": "无",
  "settings.playback.subtitle.background.shadow": "阴影",
  "settings.playback.subtitle.background.box": "方框",
  "settings.playback.subtitle.color": "颜色",
  "settings.playback.subtitle.colorLabel": "字幕颜色",
  "settings.playback.subtitle.color.white": "白色",
  "settings.playback.subtitle.color.yellow": "黄色",
  "settings.playback.subtitle.preview": "字幕看起来就是这样。",

  "settings.storage.videoFolder.title": "视频文件夹",
  "settings.storage.videoFolder.description":
    "Streamy 会在观看时把视频保存在这里。请选择剩余空间充足的磁盘。",
  "settings.storage.videoFolder.default": "默认",
  "settings.storage.videoFolder.change": "更改…",
  "settings.storage.videoFolder.showInFinder": "在访达中显示",
  "settings.storage.videoFolder.showInFileExplorer": "在文件资源管理器中显示",
  "settings.storage.videoFolder.showInFileManager": "在文件管理器中显示",
  "settings.storage.videoFolder.useDefault": "使用默认位置",
  "settings.storage.videoFolder.oldFolder": "已下载的视频会留在原文件夹中：",
  "settings.storage.videoFolder.showOldFolder": "显示原文件夹",
  "settings.storage.spaceUsed.title": "已用空间",
  "settings.storage.spaceUsed.description":
    "你看过的视频。以后再看时会重新下载。",
  "settings.storage.spaceUsed.descriptionMissing":
    "找不到该文件夹。如果它在外接硬盘上，请连接硬盘。",
  "settings.storage.spaceUsed.clear": "立即清除…",
  "settings.storage.sizeLimit.title": "大小限制",
  "settings.storage.sizeLimit.description":
    "当视频占用的空间超过这个限制，或磁盘快满时，Streamy 会删除你最久没看的视频。",
  "settings.storage.sizeLimit.none": "不限制",
  "settings.storage.clearConfirm.title": "清除所有视频？",
  "settings.storage.clearConfirm.description":
    "这会删除 Streamy 已下载的视频。以后再看时会重新下载。",
  "settings.storage.clearConfirm.confirm": "清除视频",

  "settings.network.downloadLimit.title": "下载限速",
  "settings.network.downloadLimit.description":
    "在网速较慢时为其他应用留出带宽。视频可能需要缓冲更久。",
  "settings.network.uploadLimit.title": "上传限速",
  "settings.network.uploadLimit.description": "Streamy 向他人分享的速度。",
  "settings.network.keepSharing.title": "看完后继续分享",
  "settings.network.keepSharing.description":
    "种子能运转，是因为人们会分享自己下载的内容。看完后再分享一段时间，对他们也公平；时间一到 Streamy 就会停止。",
  "settings.network.keepSharing.minutes": {
    one: "1 分钟",
    other: "{count} 分钟",
  },
  "settings.network.keepSharing.hours": {
    one: "1 小时",
    other: "{count} 小时",
  },
  "settings.network.keepSharing.untilQuit": "直到 Streamy 退出",
  "settings.network.maxConnections.title": "最大连接数",
  "settings.network.maxConnections.description":
    "每个种子同时连接的节点数。减少连接数有助于改善慢速网络或老旧路由器。",
  "settings.network.rateLimit.unlimited": "不限速",

  "settings.advanced.hardwareAcceleration.title": "硬件加速",
  "settings.advanced.hardwareAcceleration.description":
    "使用显卡来绘制 Streamy 界面并播放视频。如果窗口或视频闪烁、出现花屏，请关闭此项。",
  "settings.advanced.hardwareAcceleration.restart": "重启 Streamy 后生效。",
  "settings.advanced.hardwareAcceleration.restartNow": "立即重启",
  "settings.advanced.hardwareEncoding.title": "硬件视频编码",
  "settings.advanced.hardwareEncoding.description":
    "视频需要转码才能播放时，显卡能更快完成。如果转码后的视频出现花屏，请关闭此项。",
  "settings.advanced.engine.title": "播放引擎",
  "settings.advanced.engine.checking": "正在检查…",
  "settings.advanced.engine.starting": "正在启动…",
  "settings.advanced.engine.reconnecting": "正在重新连接…",
  "settings.advanced.engine.stoppedUnexpectedly": "它意外停止了。",
  "settings.advanced.engine.notRunning": "未运行。Streamy 会在一分钟后重试。",
  "settings.advanced.engine.keepsStopping": "它反复停止。原因见日志。",
  "settings.advanced.engine.running": "运行中",
  "settings.advanced.engine.ffmpegNotWorking": "ffmpeg 无法工作",
  "settings.advanced.engine.conversionFailed":
    "需要转码的视频无法播放。原因见日志。",
  "settings.advanced.logs.title": "日志",
  "settings.advanced.logs.description":
    "Streamy 和播放引擎做了什么。报告问题时很有用。",
  "settings.advanced.logs.open": "打开日志文件夹",
  "settings.advanced.dataFolder.title": "数据文件夹",
  "settings.advanced.dataFolder.description": "Streamy 保存设置的位置。",
  "settings.advanced.reset.title": "重置所有设置",
  "settings.advanced.reset.description":
    "把所有设置恢复为刚安装 Streamy 时的状态。你的视频不会被删除。",
  "settings.advanced.reset.button": "重置…",
  "settings.advanced.resetConfirm.title": "重置所有设置？",
  "settings.advanced.resetConfirm.description":
    "所有设置都会恢复默认值。你的视频不会被删除。",
  "settings.advanced.resetConfirm.confirm": "重置",

  "settings.about.checkForUpdates": "检查更新",
  "settings.about.download": "下载",
  "settings.about.releases": "发布页",
  "settings.about.restartToUpdate": "重启以更新",
  "settings.about.unsupported":
    "这个 Streamy 副本不会自动更新。新版本发布在 GitHub 上。",
  "settings.about.upToDate": "已是最新。上次检查：{checked}。",
  "settings.about.checksByItself": "Streamy 会自动检查更新。",
  "settings.about.checksOff": "自动检查已关闭。",
  "settings.about.checking": "正在检查更新…",
  "settings.about.downloading": "正在下载版本 {version}…",
  "settings.about.available": "版本 {version} 已可下载。",
  "settings.about.downloadingPercent": "正在下载版本 {version}… {percent}%",
  "settings.about.ready": "版本 {version} 已就绪。重启 Streamy 后会安装。",
  "settings.about.checkFailed": "无法检查更新。",
  "settings.about.autoCheck.title": "自动检查更新",
  "settings.about.autoCheck.description":
    "在 Streamy 启动时以及每隔几小时向 GitHub 询问新版本。",
  "settings.about.licences.title": "第三方许可证",
  "settings.about.licences.description":
    "Streamy 是用许多人制作并分享的软件构建而成的。以下是这些软件及其许可证。",
  "settings.about.licences.view": "查看",
  "settings.about.licences.viewLabel": "查看第三方许可证",
  "settings.about.builtWith.title": "使用的软件",
  "settings.about.builtWith.description":
    "Electron {electron}、Chromium {chromium}、Node {node}",
  "settings.about.licences.close": "关闭许可证",
  "settings.about.licences.loading": "正在加载许可证",
  "settings.about.licences.missingDev":
    "缺少许可证文件。运行 `npm run notices` 生成它。",
  "settings.about.licences.missing": "此 Streamy 副本中缺少许可证文件。",

  "settings.encoders.noneDirect": "无（直接播放文件）",
  "settings.encoders.noneCopy": "无（直接复制）",
  "settings.encoders.graphicsCard": "{name}（显卡）",
};

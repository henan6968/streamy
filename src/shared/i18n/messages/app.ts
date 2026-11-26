// The app around the pages: the title bar, the home page, torrent pages,
// banners, dialogs and toasts. Keys start with "app.".

import type { Entry } from "../types";

export const en = {
  // The title bar's Back and Forward buttons (nav-buttons.tsx).
  "app.nav.backShortcut": "Back ({shortcut})",
  "app.nav.forwardShortcut": "Forward ({shortcut})",
  "app.nav.home": "Home",

  // The playback engine: what it's doing, and waiting for it.
  "app.engine.starting": "Starting the playback engine…",
  "app.engine.reconnecting": "Reconnecting to the playback engine…",
  "app.engine.waiting": "Waiting for the playback engine…",
  "app.engine.failed.title": "The playback engine keeps stopping.",
  "app.engine.failed.body": "Streamy will try again in a minute.",
  "app.engine.failed.openLogs": "Open logs",
  "app.engine.failed.logsFailed": "Couldn't open the logs",
  "app.engine.diskFull.title": "Your disk is almost full.",
  "app.engine.diskFull.body":
    "Downloading is paused; videos already downloaded still play.",
  "app.engine.diskFull.storage": "Storage settings",

  // The one-time notice about peers seeing your IP address.
  "app.ipNotice.title":
    "Peers can see your IP address while a torrent is active.",
  "app.ipNotice.body": "That's how torrents work. A VPN keeps it private.",
  "app.ipNotice.dismiss": "Got it",

  // Dropping a .torrent on the window (drop-zone.tsx).
  "app.drop.hint": "Drop the .torrent to open it",
  "app.drop.hintBody": "It starts playing while it downloads.",
  "app.drop.notTorrent": `"{name}" isn't a .torrent file`,
  "app.drop.notTorrentUnknown": "That isn't a .torrent file",
  "app.drop.notTorrentDescription":
    "Streamy opens .torrent files and magnet links.",
  "app.drop.opening": "Opening {name}…",
  "app.drop.openFailed": "Couldn't open {name}",

  // Magnet links and .torrent files opened from outside Streamy.
  "app.incoming.magnetFailed": "Couldn't open the magnet link",
  "app.incoming.fileFailed": "Couldn't open the .torrent file",
  "app.incoming.fileFailedFallback":
    "It may be damaged, or not a .torrent file.",

  // A page that crashed (route-error.tsx).
  "app.routeError.title": "Something went wrong",
  "app.routeError.body":
    "This page stopped working. Going back to the start usually helps.",
  "app.routeError.back": "Back to the start",

  // Errors the UI writes itself (lib/api.ts).
  "app.error.engineUnavailable":
    "The playback engine isn't running right now. Streamy is starting it again.",
  "app.error.network":
    "Can't reach the playback engine. Try again in a moment.",
  "app.error.notResponding":
    "The playback engine isn't responding. Try again in a moment.",
  "app.error.internal":
    "The playback engine ran into a problem. Please try again.",

  // Home (pages/home.tsx, components/home).
  "app.home.title": "What do you want to watch?",
  "app.home.subtitle":
    "Paste a magnet link or open a .torrent file. Streamy starts playing while it downloads.",
  "app.home.loadingLibrary": "Loading your library…",
  "app.home.libraryFailed": "Couldn't load your library",
  "app.home.emptyTitle": "Nothing here yet",
  "app.home.emptyBody":
    "What you watch shows up here, so you can pick up where you left off.",
  "app.home.sintelHint":
    "No magnet handy? {button}, an open movie by the Blender Foundation.",
  "app.home.trySintel": "Try Sintel",
  "app.home.sintelFailed": "Couldn't open Sintel",
  "app.home.continueWatching": "Continue watching",
  "app.home.moreFor": "More for {name}",
  "app.home.showAllFiles": "Show all files",
  "app.home.removeFromContinue": "Remove from Continue watching",
  "app.home.removeFailed": "Couldn't remove it",
  "app.home.recent": "Recent",
  "app.home.recentDetails": "{size} · Opened {opened}",
  "app.home.recentOpened": "Opened {opened}",
  "app.home.recentActive": "Active",
  "app.home.recentActiveTitle": "Connected to peers: downloading and sharing",
  "app.home.recentRemoveLabel": "Remove {name} from Streamy",
  "app.home.recentRemove": "Remove from Streamy",
  "app.home.recentRemoveTitle": "Remove {name} from Streamy?",
  "app.home.recentRemoveTitleUnknown": "Remove it from Streamy?",
  "app.home.recentRemoveBody":
    "It leaves Recent and Continue watching, and its downloaded video is deleted.",

  // Adding a torrent (add-torrent-box.tsx, use-add-and-open.ts).
  "app.add.label": "Magnet link or info hash",
  "app.add.notTorrent": `"{name}" isn't a .torrent file`,
  "app.add.openFile": "Open a .torrent file",
  "app.add.orDrop": "or drop one anywhere",
  "app.add.chooseFile": "Choose a .torrent file",
  "app.add.added": "Added {name}",
  "app.add.addedUnknown": "Added the torrent",

  // The torrent page (pages/torrent.tsx).
  "app.torrent.badLink": "This link doesn't point to a torrent",
  "app.torrent.opening": "Opening the torrent…",
  "app.torrent.openingNamed": "Opening {name}…",
  "app.torrent.findingFiles": "Finding the file list…",
  "app.torrent.remove": "Remove…",
  "app.torrent.removeIt": "Remove it",
  "app.torrent.refreshFailed": "Couldn't refresh this torrent",
  "app.torrent.stopped": "This torrent stopped working",
  "app.torrent.stoppedFallback": "Something went wrong with it.",
  "app.torrent.stats.downloaded": "Downloaded",
  "app.torrent.stats.peers": "Peers",
  "app.torrent.stats.downloadSpeed": "Download speed",
  "app.torrent.stats.uploadSpeed": "Upload speed",
  "app.torrent.stats.progressOfSize": "{percent} of {size}",
  "app.torrent.stats.sizeUnknown": "Size not known yet",
  "app.torrent.fetching.title": "Finding peers and the file list…",
  "app.torrent.fetching.progress": "{peers} so far · waiting {elapsed}",
  "app.torrent.noPeers.title": "Nobody seems to be sharing this",
  "app.torrent.noPeers.body": "Keep waiting, or remove it.",
  "app.torrent.checking.title": "Checking downloaded data…",
  "app.torrent.checking.body":
    "Streamy is making sure what's already downloaded is complete. The videos can play when it's done.",
  "app.torrent.removed": "This torrent was removed",
  "app.torrent.removedNamed": "{name} was removed",
  "app.torrent.removedBody":
    "Open it again to keep watching. It downloads again.",
  "app.torrent.reopen": "Open it again",
  "app.torrent.openFailed": "Couldn't open this torrent",
  "app.torrent.openFailedNamed": "Couldn't open {name}",
  "app.torrent.loadFailed": "Couldn't load this torrent",
  "app.torrent.loadFailedNamed": "Couldn't load {name}",

  // Removing a torrent (remove-torrent-dialog.tsx).
  "app.remove.title": "Remove {name}?",
  "app.remove.titleUnknown": "Remove this torrent?",
  "app.remove.legend": "What to remove",
  "app.remove.choice.data.title": "Delete the downloaded video",
  "app.remove.choice.data.description":
    "Frees up space. It stays in Recent, and downloads again if you watch it later.",
  "app.remove.choice.forget.title": "Remove it from Streamy",
  "app.remove.choice.forget.description":
    "Also forgets it: it leaves Recent and Continue watching, with its saved positions.",
  "app.remove.deleteVideoButton": "Delete video",
  "app.remove.deleted": "Deleted the downloaded video of {name}",
  "app.remove.deletedUnknown": "Deleted the downloaded video of the torrent",
  "app.remove.removed": "Removed {name} from Streamy",
  "app.remove.removedUnknown": "Removed the torrent from Streamy",

  // The files in a torrent (file-list.tsx).
  "app.files.empty": "This torrent has no files.",
  "app.files.noVideo":
    "There's no video in this torrent, so there's nothing to play.",
  "app.files.videos": "Videos",
  "app.files.subtitles": "Subtitles",
  "app.files.other": "Other files",
  "app.files.watched": "Watched",
  "app.files.play": "Play {name}",
  "app.files.resume": "Resume {name} at {time}",
  "app.files.resumeAt": "Resume at {time}",
  "app.files.sizeProgress": "{size} · {percent} downloaded",
  "app.files.sizeDownloaded": "{size} · Downloaded",

  // A torrent's state (status-badge.tsx).
  "app.status.findingPeers": "Finding peers",
  "app.status.checking": "Checking",
  "app.status.downloading": "Downloading",
  "app.status.downloaded": "Downloaded",
  "app.status.ready": "Ready",
  "app.status.error": "Error",

  // The update button in the title bar (update-button.tsx).
  "app.update.restart": "Restart to update to Streamy {version}",
  "app.update.download": "Download Streamy {version}",
  "app.update.announcement": "{label}: the button is next to Settings.",
  "app.update.restartFailed": "Couldn't restart to update",
  "app.update.downloadPageFailed": "Couldn't open the download page",

  // The page that isn't there (not-found.tsx).
  "app.notFound.title": "Nothing here",
  "app.notFound.documentTitle": "Not found",
  "app.notFound.body": "This page doesn't exist. Maybe the link is old.",
  "app.notFound.home": "Go home",

  // What's typed into the box on Home (lib/magnet.ts).
  "app.magnet.empty": "Paste a magnet link or an info hash",
  "app.magnet.invalid":
    "That doesn't look like a magnet link (magnet:?xt=…) or a 40-character info hash",
} as const satisfies Record<string, Entry>;

/** Simplified Chinese. */
export const zh: Record<keyof typeof en, Entry> = {
  "app.nav.backShortcut": "返回（{shortcut}）",
  "app.nav.forwardShortcut": "前进（{shortcut}）",
  "app.nav.home": "首页",

  "app.engine.starting": "正在启动播放引擎…",
  "app.engine.reconnecting": "正在重新连接播放引擎…",
  "app.engine.waiting": "正在等待播放引擎…",
  "app.engine.failed.title": "播放引擎不断停止。",
  "app.engine.failed.body": "Streamy 会在一分钟后重试。",
  "app.engine.failed.openLogs": "打开日志",
  "app.engine.failed.logsFailed": "无法打开日志",
  "app.engine.diskFull.title": "磁盘快满了。",
  "app.engine.diskFull.body": "下载已暂停；已经下载好的视频仍可播放。",
  "app.engine.diskFull.storage": "存储设置",

  "app.ipNotice.title": "种子处于活动状态时，节点可以看到你的 IP 地址。",
  "app.ipNotice.body": "种子就是这样工作的。使用 VPN 可以保护隐私。",
  "app.ipNotice.dismiss": "知道了",

  "app.drop.hint": "拖入 .torrent 文件即可打开",
  "app.drop.hintBody": "下载的同时就会开始播放。",
  "app.drop.notTorrent": "「{name}」不是 .torrent 文件",
  "app.drop.notTorrentUnknown": "这不是 .torrent 文件",
  "app.drop.notTorrentDescription":
    "Streamy 可以打开 .torrent 文件和磁力链接。",
  "app.drop.opening": "正在打开 {name}…",
  "app.drop.openFailed": "无法打开 {name}",

  "app.incoming.magnetFailed": "无法打开磁力链接",
  "app.incoming.fileFailed": "无法打开 .torrent 文件",
  "app.incoming.fileFailedFallback": "它可能已损坏，或者不是 .torrent 文件。",

  "app.routeError.title": "出错了",
  "app.routeError.body": "这个页面无法继续工作。回到首页通常能解决问题。",
  "app.routeError.back": "回到首页",

  "app.error.engineUnavailable":
    "播放引擎当前没有运行。Streamy 正在重新启动它。",
  "app.error.network": "无法连接到播放引擎，请稍后再试。",
  "app.error.notResponding": "播放引擎没有响应，请稍后再试。",
  "app.error.internal": "播放引擎出错了，请再试一次。",

  "app.home.title": "想看点什么？",
  "app.home.subtitle":
    "粘贴磁力链接，或打开 .torrent 文件。Streamy 会在下载的同时开始播放。",
  "app.home.loadingLibrary": "正在加载你的媒体库…",
  "app.home.libraryFailed": "无法加载你的媒体库",
  "app.home.emptyTitle": "这里还什么都没有",
  "app.home.emptyBody": "你看过的内容会显示在这里，方便接着上次继续看。",
  "app.home.sintelHint":
    "手边没有磁力链接？{button}，这是 Blender 基金会出品的开源电影。",
  "app.home.trySintel": "试试 Sintel",
  "app.home.sintelFailed": "无法打开 Sintel",
  "app.home.continueWatching": "继续观看",
  "app.home.moreFor": "「{name}」的更多操作",
  "app.home.showAllFiles": "查看所有文件",
  "app.home.removeFromContinue": "从「继续观看」中移除",
  "app.home.removeFailed": "无法移除",
  "app.home.recent": "最近",
  "app.home.recentDetails": "{size} · 打开于 {opened}",
  "app.home.recentOpened": "打开于 {opened}",
  "app.home.recentActive": "活跃中",
  "app.home.recentActiveTitle": "已连接到节点：正在下载和分享",
  "app.home.recentRemoveLabel": "从 Streamy 中移除 {name}",
  "app.home.recentRemove": "从 Streamy 中移除",
  "app.home.recentRemoveTitle": "从 Streamy 中移除 {name}？",
  "app.home.recentRemoveTitleUnknown": "从 Streamy 中移除它？",
  "app.home.recentRemoveBody":
    "它会从「最近」和「继续观看」中消失，已下载的视频也会被删除。",

  "app.add.label": "磁力链接或 info hash",
  "app.add.notTorrent": "「{name}」不是 .torrent 文件",
  "app.add.openFile": "打开 .torrent 文件",
  "app.add.orDrop": "或直接拖到窗口里",
  "app.add.chooseFile": "选择 .torrent 文件",
  "app.add.added": "已添加 {name}",
  "app.add.addedUnknown": "已添加种子",

  "app.torrent.badLink": "这个链接没有指向任何种子",
  "app.torrent.opening": "正在打开种子…",
  "app.torrent.openingNamed": "正在打开 {name}…",
  "app.torrent.findingFiles": "正在获取文件列表…",
  "app.torrent.remove": "移除…",
  "app.torrent.removeIt": "移除它",
  "app.torrent.refreshFailed": "无法刷新这个种子",
  "app.torrent.stopped": "这个种子已停止工作",
  "app.torrent.stoppedFallback": "它出了一些问题。",
  "app.torrent.stats.downloaded": "已下载",
  "app.torrent.stats.peers": "节点",
  "app.torrent.stats.downloadSpeed": "下载速度",
  "app.torrent.stats.uploadSpeed": "上传速度",
  "app.torrent.stats.progressOfSize": "{percent}（共 {size}）",
  "app.torrent.stats.sizeUnknown": "大小未知",
  "app.torrent.fetching.title": "正在查找节点和文件列表…",
  "app.torrent.fetching.progress": "目前 {peers} · 已等待 {elapsed}",
  "app.torrent.noPeers.title": "似乎没有人在分享这个种子",
  "app.torrent.noPeers.body": "可以继续等待，也可以移除它。",
  "app.torrent.checking.title": "正在检查已下载的数据…",
  "app.torrent.checking.body":
    "Streamy 正在确认已经下载的内容是否完整，完成后视频就可以播放了。",
  "app.torrent.removed": "这个种子已被移除",
  "app.torrent.removedNamed": "{name} 已被移除",
  "app.torrent.removedBody": "再次打开即可继续观看，它会重新下载。",
  "app.torrent.reopen": "再次打开",
  "app.torrent.openFailed": "无法打开这个种子",
  "app.torrent.openFailedNamed": "无法打开 {name}",
  "app.torrent.loadFailed": "无法加载这个种子",
  "app.torrent.loadFailedNamed": "无法加载 {name}",

  "app.remove.title": "移除 {name}？",
  "app.remove.titleUnknown": "移除这个种子？",
  "app.remove.legend": "要移除什么",
  "app.remove.choice.data.title": "删除已下载的视频",
  "app.remove.choice.data.description":
    "可以释放空间。种子仍会留在「最近」中，之后再观看时会重新下载。",
  "app.remove.choice.forget.title": "从 Streamy 中移除",
  "app.remove.choice.forget.description":
    "同时忘记这个种子：它会从「最近」和「继续观看」中消失，已保存的进度也会一并删除。",
  "app.remove.deleteVideoButton": "删除视频",
  "app.remove.deleted": "已删除 {name} 的已下载视频",
  "app.remove.deletedUnknown": "已删除已下载的视频",
  "app.remove.removed": "已从 Streamy 中移除 {name}",
  "app.remove.removedUnknown": "已从 Streamy 中移除这个种子",

  "app.files.empty": "这个种子里没有文件。",
  "app.files.noVideo": "这个种子里没有视频，因此没有可播放的内容。",
  "app.files.videos": "视频",
  "app.files.subtitles": "字幕",
  "app.files.other": "其他文件",
  "app.files.watched": "已看完",
  "app.files.play": "播放 {name}",
  "app.files.resume": "从 {time} 继续播放 {name}",
  "app.files.resumeAt": "从 {time} 继续播放",
  "app.files.sizeProgress": "{size} · 已下载 {percent}",
  "app.files.sizeDownloaded": "{size} · 已下载",

  "app.status.findingPeers": "正在寻找节点",
  "app.status.checking": "正在检查",
  "app.status.downloading": "正在下载",
  "app.status.downloaded": "已下载",
  "app.status.ready": "就绪",
  "app.status.error": "出错",

  "app.update.restart": "重启以更新到 Streamy {version}",
  "app.update.download": "下载 Streamy {version}",
  "app.update.announcement": "{label}：按钮位于「设置」旁边。",
  "app.update.restartFailed": "无法重启以更新",
  "app.update.downloadPageFailed": "无法打开下载页面",

  "app.notFound.title": "这里什么都没有",
  "app.notFound.documentTitle": "未找到",
  "app.notFound.body": "这个页面不存在。链接可能已经过期了。",
  "app.notFound.home": "回到首页",

  "app.magnet.empty": "请粘贴磁力链接或 info hash",
  "app.magnet.invalid":
    "这看起来不是磁力链接（magnet:?xt=…），也不是 40 位的 info hash",
};

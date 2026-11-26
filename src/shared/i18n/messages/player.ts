// The player: controls, overlays, menus, stats and the watch page. Keys
// start with "player.".

import type { Entry } from "../types";

export const en = {
  // What the video is waiting for (the spinner over it, and the watch page
  // before the player exists).
  "player.checking.title": "Checking downloaded data…",
  "player.checking.detail": "This can take a while for a big torrent",
  "player.loading.preparing": "Preparing video…",
  "player.loading.converting": "Converting video…",
  "player.loading.waitingForPieces": "Waiting for pieces · {swarm}",
  "player.loading.waitingForPiecesAlone": "Waiting for pieces…",
  "player.loading.slowTorrent":
    "This can take a while on a slow torrent · {swarm}",
  "player.loading.slowTorrentAlone": "This can take a while on a slow torrent",
  "player.reconnecting.spinner": "Reconnecting",
  "player.reconnecting.title": "Reconnecting…",
  "player.reconnecting.failed":
    "The playback engine keeps stopping. Streamy will try again in a minute.",
  "player.reconnecting.message":
    "The playback engine stopped. The video goes on from here once it's back.",
  "player.home": "Home",

  // The controls along the bottom of the video.
  "player.controls.back10Seconds": "Back 10 seconds",
  "player.controls.forward10Seconds": "Forward 10 seconds",
  "player.controls.mute": "Mute",
  "player.controls.unmute": "Unmute",
  "player.controls.volume": "Volume",
  "player.controls.turnSubtitlesOn": "Turn subtitles on",
  "player.controls.turnSubtitlesOff": "Turn subtitles off",
  "player.controls.fullScreen": "Full screen",
  "player.controls.exitFullScreen": "Exit full screen",
  "player.controls.pictureInPicture": "Picture in picture",

  // A shortcut's confirmation in the middle of the picture.
  "player.flash.seek": "{sign}{seconds} s",
  "player.flash.muted": "Muted",
  "player.flash.volume": "{percent}%",
  "player.flash.noSubtitles": "No subtitles",
  "player.flash.subtitlesOff": "Subtitles off",

  // Over the video, top right.
  "player.nextEpisode": "Next episode",

  // The settings popover.
  "player.menu.title": "Player settings",
  "player.menu.back": "(back)",

  "player.quality.title": "Quality",
  "player.quality.original": "Original",
  "player.quality.originalWithHeight": "Original ({height}p)",
  "player.quality.convertedHint": "Converted while it plays · uses more CPU",

  "player.audio.title": "Audio",
  "player.audio.default": "Default",

  "player.subtitles.title": "Subtitles",
  "player.subtitles.none": "No subtitles in this video or torrent.",
  "player.subtitles.style": "Style",
  "player.subtitles.delay": "Delay",
  "player.subtitles.forced": "{language} (forced)",

  "player.subtitleStyle.title": "Subtitle style",
  "player.subtitleStyle.size": "Size",
  "player.subtitleStyle.size.s": "S",
  "player.subtitleStyle.size.m": "M",
  "player.subtitleStyle.size.l": "L",
  "player.subtitleStyle.size.xl": "XL",
  "player.subtitleStyle.background": "Background",
  "player.subtitleStyle.background.none": "None",
  "player.subtitleStyle.background.shadow": "Shadow",
  "player.subtitleStyle.background.box": "Box",
  "player.subtitleStyle.color": "Color",
  "player.subtitleStyle.color.white": "White",
  "player.subtitleStyle.color.yellow": "Yellow",
  "player.subtitleStyle.hint": "For every video. Also in Settings → Playback.",

  "player.subtitleDelay.title": "Subtitle delay",
  "player.subtitleDelay.earlier": "Earlier by 0.1 seconds",
  "player.subtitleDelay.later": "Later by 0.1 seconds",
  "player.subtitleDelay.hint":
    "Subtitles too early? Press +. Too late? Press −.",
  "player.subtitleDelay.reset": "Reset",

  "player.speed.title": "Speed",
  "player.speed.normal": "Normal",

  "player.fit.title": "Fit",
  "player.fit.contain": "Contain",
  "player.fit.containDetail": "Show the whole picture",
  "player.fit.fill": "Fill",
  "player.fit.fillDetail": "Fill the screen, cropping the edges",

  // Stats for nerds: the numbers behind the picture.
  "player.stats.title": "Stats for nerds",
  "player.stats.close": "Close stats",
  "player.stats.mode": "Mode",
  "player.stats.modeValue": "{mode} — {reason}",
  "player.stats.mode.direct": "direct",
  "player.stats.mode.remux": "remux",
  "player.stats.mode.transcode": "transcode",
  "player.stats.session": "Session",
  "player.stats.source": "Source",
  "player.stats.output": "Output",
  "player.stats.encoder": "Encoder",
  "player.stats.player": "Player",
  "player.stats.playerDirect": "<video> (direct)",
  "player.stats.container": "Container",
  "player.stats.bitrate": "Bitrate",
  "player.stats.offset": "Offset",
  "player.stats.produced": "Produced",
  "player.stats.producedUntil": "until {time} ({seconds})",
  "player.stats.position": "Position",
  "player.stats.positionValue": "{time} ({seconds}) · video {video}",
  "player.stats.bufferAhead": "Buffer ahead",
  "player.stats.frames": "Frames",
  "player.stats.framesValue": "{dropped} dropped of {total}",
  "player.stats.torrent": "Torrent",
  "player.stats.forcedMode": "Forced mode",
  "player.stats.no": "no",

  // Before playback starts when there's a saved position.
  "player.resume.continueWatching": "Continue watching",
  "player.resume.watchedSoFar": "Watched so far",
  "player.resume.positionOf": "{position} of {duration}",
  "player.resume.resumeAt": "Resume at {time}",
  "player.resume.startOver": "Start over",

  // The timeline.
  "player.scrubber.seek": "Seek",
  "player.scrubber.value": "{time} of {duration}",

  // Bits of a track's description ("English · 5.1 · AC3").
  "player.track.mono": "Mono",
  "player.track.channels": "{count} ch",
  "player.track.file": "file",
  "player.track.burnedIn": "burned in",

  // What the playback engine says about a session or a failure. ffmpeg's own
  // words and the engine's reasons come from the engine: those stay as they
  // are.
  "player.notice.converted": "Switched to converted playback",
  "player.reason.rawPlayback":
    "Playing the file as it is (Streamy can't convert video: ffmpeg isn't working)",
  "player.error.convertedUnsupported.title": "Converted video can't play here",
  "player.error.convertedUnsupported.message":
    "This system supports neither Media Source Extensions nor HLS, which converted videos need.",
  "player.error.torrentRemoved.title": "This torrent was removed",
  "player.error.torrentRemoved.message":
    "It isn't in Streamy anymore, so it can't be played.",
  "player.error.engineUnreachable.title": "Can't reach the playback engine",
  "player.error.startFailed.title": "Couldn't start the video",
  "player.error.unplayable.title": "This video can't be played",
  "player.error.unplayableRaw.message":
    "It can't be played as it is, and Streamy can't convert it because ffmpeg isn't working.",
  "player.error.lostStream.title": "Lost the video stream",
  "player.error.lostStream.message":
    "The video stopped loading. The torrent may be too slow, or the playback engine stopped.",
  "player.error.conversionStopped.message":
    "Converting it stopped unexpectedly. Try again, or pick a lower quality.",
  "player.error.nothingPlayed.message":
    "Neither the file itself nor the converted version could play.",

  // The watch page: what it says before the player can start.
  "player.watch.badLink": "This link doesn't point to a video",
  "player.watch.untitled": "Video",
  "player.watch.openFailed": "Couldn't open {name}",
  "player.watch.loadFailed": "Couldn't load {name}",
  "player.watch.thisTorrent": "this torrent",
  "player.watch.torrentFailed": "This torrent stopped working",
  "player.watch.torrentFailedFallback": "Something went wrong with it.",
  "player.watch.fileMissing": "This file isn't in the torrent",
  "player.watch.waitingForEngine": "Waiting for the playback engine…",
  "player.watch.findingPeers": "Finding peers…",
  "player.watch.nobodySharing":
    "Nobody seems to be sharing this yet. Keep waiting, or go back.",
  "player.watch.peersSoFar": "{peers} so far",
  "player.watch.needsConverting": "This video needs converting",
  "player.watch.needsConvertingMessage":
    "It can't be played as it is, and Streamy can't convert it because ffmpeg isn't working. Reinstalling Streamy should fix it.",
  "player.watch.readVideoFailed": "Couldn't read the video",
  "player.watch.removedNamed": "{name} was removed",
  "player.watch.removedMessage":
    "Open it again to keep watching. It downloads again.",
  "player.watch.openAgain": "Open it again",
} as const satisfies Record<string, Entry>;

/** Simplified Chinese. */
export const zh: Record<keyof typeof en, Entry> = {
  "player.checking.title": "正在校验已下载的数据…",
  "player.checking.detail": "种子较大时可能需要一段时间",
  "player.loading.preparing": "正在准备视频…",
  "player.loading.converting": "正在转码视频…",
  "player.loading.waitingForPieces": "正在等待分块 · {swarm}",
  "player.loading.waitingForPiecesAlone": "正在等待分块…",
  "player.loading.slowTorrent": "种子较慢时可能需要一段时间 · {swarm}",
  "player.loading.slowTorrentAlone": "种子较慢时可能需要一段时间",
  "player.reconnecting.spinner": "重新连接",
  "player.reconnecting.title": "正在重新连接…",
  "player.reconnecting.failed":
    "播放引擎反复停止运行，Streamy 会在一分钟后重试。",
  "player.reconnecting.message": "播放引擎已停止运行，恢复后会从这里继续播放。",
  "player.home": "首页",

  "player.controls.back10Seconds": "后退 10 秒",
  "player.controls.forward10Seconds": "前进 10 秒",
  "player.controls.mute": "静音",
  "player.controls.unmute": "取消静音",
  "player.controls.volume": "音量",
  "player.controls.turnSubtitlesOn": "打开字幕",
  "player.controls.turnSubtitlesOff": "关闭字幕",
  "player.controls.fullScreen": "全屏",
  "player.controls.exitFullScreen": "退出全屏",
  "player.controls.pictureInPicture": "画中画",

  "player.flash.seek": "{sign}{seconds} 秒",
  "player.flash.muted": "已静音",
  "player.flash.volume": "音量 {percent}%",
  "player.flash.noSubtitles": "没有字幕",
  "player.flash.subtitlesOff": "已关闭字幕",

  "player.nextEpisode": "下一集",

  "player.menu.title": "播放器设置",
  "player.menu.back": "（返回）",

  "player.quality.title": "画质",
  "player.quality.original": "原画",
  "player.quality.originalWithHeight": "原画（{height}p）",
  "player.quality.convertedHint": "播放时转码 · 占用更多 CPU",

  "player.audio.title": "音轨",
  "player.audio.default": "默认",

  "player.subtitles.title": "字幕",
  "player.subtitles.none": "这个视频或种子里没有字幕。",
  "player.subtitles.style": "样式",
  "player.subtitles.delay": "延迟",
  "player.subtitles.forced": "{language}（强制）",

  "player.subtitleStyle.title": "字幕样式",
  "player.subtitleStyle.size": "大小",
  "player.subtitleStyle.size.s": "小",
  "player.subtitleStyle.size.m": "中",
  "player.subtitleStyle.size.l": "大",
  "player.subtitleStyle.size.xl": "特大",
  "player.subtitleStyle.background": "背景",
  "player.subtitleStyle.background.none": "无",
  "player.subtitleStyle.background.shadow": "阴影",
  "player.subtitleStyle.background.box": "背景框",
  "player.subtitleStyle.color": "颜色",
  "player.subtitleStyle.color.white": "白色",
  "player.subtitleStyle.color.yellow": "黄色",
  "player.subtitleStyle.hint": "对所有视频生效，也可在「设置 → 播放」中修改。",

  "player.subtitleDelay.title": "字幕延迟",
  "player.subtitleDelay.earlier": "提前 0.1 秒",
  "player.subtitleDelay.later": "延后 0.1 秒",
  "player.subtitleDelay.hint": "字幕太早？按 +。太晚？按 −。",
  "player.subtitleDelay.reset": "重置",

  "player.speed.title": "速度",
  "player.speed.normal": "正常",

  "player.fit.title": "画面适配",
  "player.fit.contain": "适应画面",
  "player.fit.containDetail": "显示完整画面",
  "player.fit.fill": "铺满画面",
  "player.fit.fillDetail": "铺满屏幕，裁掉边缘",

  "player.stats.title": "统计信息",
  "player.stats.close": "关闭统计信息",
  "player.stats.mode": "模式",
  "player.stats.modeValue": "{mode} —— {reason}",
  "player.stats.mode.direct": "直接播放",
  "player.stats.mode.remux": "重新封装",
  "player.stats.mode.transcode": "转码",
  "player.stats.session": "会话",
  "player.stats.source": "来源",
  "player.stats.output": "输出",
  "player.stats.encoder": "编码器",
  "player.stats.player": "播放器",
  "player.stats.playerDirect": "<video>（直接播放）",
  "player.stats.container": "容器",
  "player.stats.bitrate": "比特率",
  "player.stats.offset": "偏移",
  "player.stats.produced": "已生成",
  "player.stats.producedUntil": "直到 {time}（{seconds}）",
  "player.stats.position": "位置",
  "player.stats.positionValue": "{time}（{seconds}）· 视频 {video}",
  "player.stats.bufferAhead": "前方缓冲",
  "player.stats.frames": "帧",
  "player.stats.framesValue": "{total} 帧中丢 {dropped} 帧",
  "player.stats.torrent": "种子",
  "player.stats.forcedMode": "强制模式",
  "player.stats.no": "否",

  "player.resume.continueWatching": "继续观看",
  "player.resume.watchedSoFar": "已观看",
  "player.resume.positionOf": "{position} / {duration}",
  "player.resume.resumeAt": "从 {time} 继续播放",
  "player.resume.startOver": "从头播放",

  "player.scrubber.seek": "跳转",
  "player.scrubber.value": "{time} / {duration}",

  "player.track.mono": "单声道",
  "player.track.channels": "{count} 声道",
  "player.track.file": "字幕文件",
  "player.track.burnedIn": "硬字幕",

  "player.notice.converted": "已切换到转码播放",
  "player.reason.rawPlayback":
    "正在直接播放原文件（ffmpeg 无法运行，Streamy 无法转码视频）",
  "player.error.convertedUnsupported.title": "无法在这里播放转码后的视频",
  "player.error.convertedUnsupported.message":
    "此系统既不支持 Media Source Extensions，也不支持 HLS，而转码后的视频需要其中之一。",
  "player.error.torrentRemoved.title": "这个种子已被移除",
  "player.error.torrentRemoved.message": "它已不在 Streamy 中，因此无法播放。",
  "player.error.engineUnreachable.title": "无法连接播放引擎",
  "player.error.startFailed.title": "无法开始播放视频",
  "player.error.unplayable.title": "无法播放这个视频",
  "player.error.unplayableRaw.message":
    "无法直接播放，而 ffmpeg 无法运行，Streamy 也无法转码。",
  "player.error.lostStream.title": "视频流已中断",
  "player.error.lostStream.message":
    "视频停止加载。可能是种子太慢，或者播放引擎已停止。",
  "player.error.conversionStopped.message":
    "转码意外停止。请重试，或选择更低的画质。",
  "player.error.nothingPlayed.message": "原文件和转码后的版本都无法播放。",

  "player.watch.badLink": "这个链接不指向任何视频",
  "player.watch.untitled": "视频",
  "player.watch.openFailed": "无法打开「{name}」",
  "player.watch.loadFailed": "无法加载「{name}」",
  "player.watch.thisTorrent": "这个种子",
  "player.watch.torrentFailed": "这个种子停止工作了",
  "player.watch.torrentFailedFallback": "它出了点问题。",
  "player.watch.fileMissing": "这个文件不在种子里",
  "player.watch.waitingForEngine": "正在等待播放引擎…",
  "player.watch.findingPeers": "正在寻找节点…",
  "player.watch.nobodySharing":
    "似乎还没有人共享这个种子。可以继续等待，或者返回。",
  "player.watch.peersSoFar": "已有 {peers}",
  "player.watch.needsConverting": "这个视频需要转码",
  "player.watch.needsConvertingMessage":
    "无法直接播放，而 ffmpeg 无法运行，Streamy 也无法转码。重新安装 Streamy 应该可以解决。",
  "player.watch.readVideoFailed": "无法读取视频",
  "player.watch.removedNamed": "已移除「{name}」",
  "player.watch.removedMessage": "重新打开即可继续观看，它会重新下载。",
  "player.watch.openAgain": "重新打开",
};

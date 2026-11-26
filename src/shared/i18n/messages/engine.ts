// The engine's text that people see: API error messages, why a torrent
// failed, why a video is being converted. Keys start with "engine.".

import type { Entry } from "../types";

export const en = {
  // Errors answered as an ApiError (the message in an HTTP error body).
  "engine.errors.somethingWentWrong": "Something went wrong",
  "engine.errors.invalidFields": "Some fields are invalid",
  "engine.errors.invalidJson": "Invalid JSON body",
  "engine.errors.bodyTooLarge": "The request body is too large",
  "engine.errors.routeNotFound": "Route {method} {path} not found",
  "engine.errors.addressNotAllowed": "This address isn't allowed",
  "engine.errors.missingKey": "Missing or wrong key",
  "engine.errors.notFound": "Not found",
  "engine.errors.noSuchFile": "No such file",
  "engine.errors.requestCancelled": "The request was cancelled",
  "engine.errors.videoFolderUnavailable":
    "The video folder isn't available. Is the drive connected?",
  "engine.errors.notOurFolder":
    "This doesn't look like Streamy's video folder, so nothing was deleted.",
  "engine.errors.diskAlmostFull":
    "Your disk is almost full. Free up some space, then try again.",
  "engine.errors.clearingCache":
    "Streamy is deleting its downloaded videos. Try again in a moment.",
  "engine.errors.engineStarting":
    "The playback engine is starting or stopping. Try again in a moment.",
  "engine.errors.libraryUnavailable": "The library isn't available right now",
  "engine.errors.torrentNotInLibrary": "This torrent isn't in the library",
  "engine.errors.torrentNoSuchFile": "This torrent has no such file",
  "engine.errors.noThumbnail": "No thumbnail yet",
  "engine.errors.torrentNotFound": "Torrent not found",
  "engine.errors.fileNotFound": "File not found",
  "engine.errors.torrentRemoved": "This torrent was removed",
  "engine.errors.torrentFailed": "This torrent failed: {error}",
  "engine.errors.metadataNotReady":
    "The torrent's file list isn't known yet. Try again in a moment.",
  "engine.errors.checkingDownloads":
    "Streamy is checking what's already downloaded. Try again in a moment.",
  "engine.errors.fileTooBigToRead":
    "This file is too big to read ({size}, the limit is {limit})",
  "engine.errors.invalidRange": "Invalid byte range",
  "engine.errors.invalidTorrentFile": "This isn't a valid .torrent file",
  "engine.errors.torrentFileTooBig":
    "This .torrent file is too big (the limit is 10 MB)",
  "engine.errors.sendTorrentFile":
    "Send the .torrent file with Content-Type: application/x-bittorrent",
  "engine.errors.tooManyFiles":
    "This torrent has too many files ({count}). Streamy opens torrents with up to {max} files.",
  "engine.errors.unsafeFileNames":
    "This torrent has file names Streamy can't save safely.",
  "engine.errors.magnetNoInfoHash":
    "This magnet link has no BitTorrent info hash",
  "engine.errors.magnetV2Only":
    "BitTorrent v2-only magnets aren't supported yet",
  "engine.errors.pasteMagnet":
    "Paste a magnet link (magnet:?xt=urn:btih:…) or a 40-character info hash",
  "engine.errors.pasteMagnetOrHash": "Paste a magnet link or an info hash",
  "engine.errors.magnetTooLong":
    "This magnet link is too long (the limit is {max} characters)",
  "engine.errors.ffmpegMissing":
    "ffmpeg is missing or can't run. Reinstalling Streamy should fix it.",
  "engine.errors.probeTimeout":
    "Couldn't read the video info in time. The torrent may be too slow.",
  "engine.errors.notAVideo": "Couldn't read this file as a video",
  "engine.errors.noVideo": "This file has no video",
  "engine.errors.noSuchAudioTrack": "This audio track doesn't exist",
  "engine.errors.noSuchSubtitle": "This subtitle track doesn't exist",
  "engine.errors.pictureSubtitlesOnly":
    "Only picture subtitles inside the video can be burned in",
  "engine.errors.textSubtitlesNotBurnable":
    "Text subtitles are shown by the player, only picture subtitles can be burned in",
  "engine.errors.playlistNotReady": "The playlist isn't ready yet",
  "engine.errors.segmentNotReady": "This segment doesn't exist yet",

  // Why a torrent failed (TorrentSummary.error), from the filesystem.
  "engine.errors.diskFull": "Your disk is full.",
  "engine.errors.videoFolderCantWrite":
    "Streamy can't write to the video folder.",
  "engine.errors.fileBusy":
    "A file in the video folder is busy. Try again in a moment.",
  "engine.errors.torrentSomethingWrong":
    "Something went wrong with this torrent.",
  "engine.errors.downloadStopped": "The download stopped unexpectedly",

  // What a request or a heartbeat's values are checked against (shown as the
  // issue's message, e.g. next to the magnet field).
  "engine.validation.infoHash": "Must be a 40-character hex info hash",
  "engine.validation.playerId": "Must be 1–64 letters, digits, - or _",
  "engine.validation.playbackFile": "Unknown playback file",
  "engine.validation.mustBeInfoHash":
    "{field} must be 40 lowercase hex characters",
  "engine.validation.mustBeWholeNumber": "{field} must be a whole number ≥ 0",
  "engine.validation.mustBeFiniteNumber": "{field} must be a finite number ≥ 0",
  "engine.validation.mustBePositiveWholeNumber":
    "{field} must be a whole number ≥ 1",
  "engine.validation.mustBeText": "{field} must be a non-empty string",
  "engine.validation.mustBeBoolean": "{field} must be true or false",
  "engine.validation.mustBeBytes": "{field} must be non-empty bytes",

  // Why a video is played as it is, repackaged or re-encoded
  // (Playback.reason, the player's stats panel).
  "engine.playback.reason.direct": "Streamy can play the file as it is",
  "engine.playback.reason.directForced": "Playing the file directly as asked",
  "engine.playback.reason.remuxForced":
    "Repackaging as asked (no quality loss)",
  "engine.playback.reason.transcodeForced":
    "Converting the video to H.264 as asked",
  "engine.playback.reason.containerNotDirect":
    "{container} isn't playable directly, repackaging it (no quality loss)",
  "engine.playback.reason.containerNotSupported":
    "Streamy can't play {container} files directly, repackaging it (no quality loss)",
  "engine.playback.reason.audioNotSupported":
    "Streamy can't play {codec} audio, converting the audio (video untouched)",
  "engine.playback.reason.otherAudioTrack":
    "Another audio track was chosen, repackaging it (no quality loss)",
  "engine.playback.reason.embeddedSubtitles":
    "Repackaging to read the embedded subtitles (no quality loss)",
  "engine.playback.reason.cantDecode":
    "This computer can't decode {depth}{codec}, converting to {target}",
  "engine.playback.reason.burningSubtitles": "Burning in picture subtitles",
  "engine.playback.reason.lowerQuality": "Lower quality ({quality}) requested",
  "engine.playback.reason.audioConverted": "{codec} audio is converted to AAC",
  // A container whose extension is unknown: "{container} isn't playable…".
  "engine.playback.reason.thisFormat": "This format",
  // Between two reasons: "… converting to H.264. Burning in …".
  "engine.playback.reason.separator": ". ",

  // A playback session's errors (PlaybackStatus.error, HTTP error bodies).
  "engine.playback.startFailed":
    "Streamy couldn't prepare this video for playing.",
  "engine.playback.lostInput":
    "Streamy couldn't prepare the rest of this video.",
  "engine.playback.superseded": "A newer playback replaced this one",
  "engine.playback.stopped": "This playback was stopped before it started",
  "engine.playback.startTimedOut":
    "The video didn't start in time. The torrent may be too slow.",
  "engine.playback.nothingToPlay": "There's nothing to play from this position",
  "engine.playback.sessionNotFound": "This playback session doesn't exist",
  "engine.playback.tooManyTranscodes":
    "Too many videos are being converted right now",
  "engine.playback.noHlsForDirect": "Direct playback has no HLS files",
  "engine.playback.noCues": "This session has no cues for that subtitle track",

  // Subtitle files in a torrent.
  "engine.subtitles.textOnly": "Only text subtitle files are supported",
  "engine.subtitles.convertFailed": "Couldn't read this subtitle file",
} as const satisfies Record<string, Entry>;

/** Simplified Chinese. */
export const zh: Record<keyof typeof en, Entry> = {
  "engine.errors.somethingWentWrong": "出了点问题",
  "engine.errors.invalidFields": "有些字段无效",
  "engine.errors.invalidJson": "请求体不是有效的 JSON",
  "engine.errors.bodyTooLarge": "请求内容太大了",
  "engine.errors.routeNotFound": "找不到路由 {method} {path}",
  "engine.errors.addressNotAllowed": "不允许使用这个地址",
  "engine.errors.missingKey": "密钥缺失或不正确",
  "engine.errors.notFound": "未找到",
  "engine.errors.noSuchFile": "没有这个文件",
  "engine.errors.requestCancelled": "请求已取消",
  "engine.errors.videoFolderUnavailable":
    "视频文件夹不可用。驱动器连接好了吗？",
  "engine.errors.notOurFolder":
    "这看起来不是 Streamy 的视频文件夹，所以没有删除任何内容。",
  "engine.errors.diskAlmostFull": "磁盘快满了。腾出一些空间，然后再试一次。",
  "engine.errors.clearingCache": "Streamy 正在删除已下载的视频，请稍后再试。",
  "engine.errors.engineStarting": "播放引擎正在启动或停止，请稍后再试。",
  "engine.errors.libraryUnavailable": "媒体库现在不可用",
  "engine.errors.torrentNotInLibrary": "这个种子不在媒体库里",
  "engine.errors.torrentNoSuchFile": "这个种子里没有这个文件",
  "engine.errors.noThumbnail": "还没有缩略图",
  "engine.errors.torrentNotFound": "找不到种子",
  "engine.errors.fileNotFound": "找不到文件",
  "engine.errors.torrentRemoved": "这个种子已被移除",
  "engine.errors.torrentFailed": "这个种子出错了：{error}",
  "engine.errors.metadataNotReady": "还不知道这个种子的文件列表，请稍后再试。",
  "engine.errors.checkingDownloads":
    "Streamy 正在检查已经下载的内容，请稍后再试。",
  "engine.errors.fileTooBigToRead":
    "这个文件太大，无法读取（{size}，上限是 {limit}）",
  "engine.errors.invalidRange": "字节范围无效",
  "engine.errors.invalidTorrentFile": "这不是有效的 .torrent 文件",
  "engine.errors.torrentFileTooBig": "这个 .torrent 文件太大了（上限是 10 MB）",
  "engine.errors.sendTorrentFile":
    "请用 Content-Type: application/x-bittorrent 发送 .torrent 文件",
  "engine.errors.tooManyFiles":
    "这个种子的文件太多了（{count} 个）。Streamy 最多打开 {max} 个文件的种子。",
  "engine.errors.unsafeFileNames": "这个种子里的文件名 Streamy 无法安全保存。",
  "engine.errors.magnetNoInfoHash": "这个磁力链接里没有 BitTorrent info hash",
  "engine.errors.magnetV2Only": "暂时还不支持只有 BitTorrent v2 的磁力链接",
  "engine.errors.pasteMagnet":
    "请粘贴磁力链接（magnet:?xt=urn:btih:…）或 40 位的 info hash",
  "engine.errors.pasteMagnetOrHash": "请粘贴磁力链接或 info hash",
  "engine.errors.magnetTooLong": "这个磁力链接太长了（上限是 {max} 个字符）",
  "engine.errors.ffmpegMissing":
    "ffmpeg 缺失或无法运行。重新安装 Streamy 应该能解决。",
  "engine.errors.probeTimeout": "读取视频信息超时，种子可能太慢了。",
  "engine.errors.notAVideo": "无法把这个文件当作视频读取",
  "engine.errors.noVideo": "这个文件里没有视频",
  "engine.errors.noSuchAudioTrack": "这条音轨不存在",
  "engine.errors.noSuchSubtitle": "这条字幕轨道不存在",
  "engine.errors.pictureSubtitlesOnly": "只能烧录视频里的图形字幕",
  "engine.errors.textSubtitlesNotBurnable":
    "文本字幕由播放器显示，只能烧录图形字幕",
  "engine.errors.playlistNotReady": "播放列表还没准备好",
  "engine.errors.segmentNotReady": "这个分片还不存在",

  "engine.errors.diskFull": "磁盘已满。",
  "engine.errors.videoFolderCantWrite": "Streamy 无法写入视频文件夹。",
  "engine.errors.fileBusy": "视频文件夹里有个文件正被占用，请稍后再试。",
  "engine.errors.torrentSomethingWrong": "这个种子出了点问题。",
  "engine.errors.downloadStopped": "下载意外停止了",

  "engine.validation.infoHash": "必须是 40 位十六进制的 info hash",
  "engine.validation.playerId": "必须是 1–64 个字母、数字、- 或 _",
  "engine.validation.playbackFile": "未知的播放文件",
  "engine.validation.mustBeInfoHash": "{field} 必须是 40 位小写十六进制字符",
  "engine.validation.mustBeWholeNumber": "{field} 必须是不小于 0 的整数",
  "engine.validation.mustBeFiniteNumber": "{field} 必须是不小于 0 的有限数字",
  "engine.validation.mustBePositiveWholeNumber":
    "{field} 必须是不小于 1 的整数",
  "engine.validation.mustBeText": "{field} 必须是非空字符串",
  "engine.validation.mustBeBoolean": "{field} 必须是 true 或 false",
  "engine.validation.mustBeBytes": "{field} 必须是非空字节",

  "engine.playback.reason.direct": "Streamy 可以直接播放这个文件",
  "engine.playback.reason.directForced": "按你的要求直接播放这个文件",
  "engine.playback.reason.remuxForced": "按你的要求重新封装（画质无损）",
  "engine.playback.reason.transcodeForced": "按你的要求把视频转成 H.264",
  "engine.playback.reason.containerNotDirect":
    "{container} 不能直接播放，正在重新封装（画质无损）",
  "engine.playback.reason.containerNotSupported":
    "Streamy 无法直接播放 {container} 文件，正在重新封装（画质无损）",
  "engine.playback.reason.audioNotSupported":
    "Streamy 无法播放 {codec} 音轨，正在转换音频（视频不动）",
  "engine.playback.reason.otherAudioTrack":
    "选了另一条音轨，正在重新封装（画质无损）",
  "engine.playback.reason.embeddedSubtitles":
    "为了读取内嵌字幕，正在重新封装（画质无损）",
  "engine.playback.reason.cantDecode":
    "这台电脑无法解码 {depth}{codec}，正在转成 {target}",
  "engine.playback.reason.burningSubtitles": "正在烧录图形字幕",
  "engine.playback.reason.lowerQuality": "按要求降低画质（{quality}）",
  "engine.playback.reason.audioConverted": "{codec} 音轨转为 AAC",
  "engine.playback.reason.thisFormat": "这个格式",
  "engine.playback.reason.separator": "。",

  "engine.playback.startFailed": "Streamy 没能准备好这个视频的播放。",
  "engine.playback.lostInput": "Streamy 没能准备好这个视频后面的部分。",
  "engine.playback.superseded": "有更新的播放替换了这次播放",
  "engine.playback.stopped": "这次播放在开始前就被停止了",
  "engine.playback.startTimedOut": "视频没有及时开始播放，种子可能太慢了。",
  "engine.playback.nothingToPlay": "从这个位置开始没有可播放的内容",
  "engine.playback.sessionNotFound": "这个播放会话不存在",
  "engine.playback.tooManyTranscodes": "当前正在转码的视频太多了",
  "engine.playback.noHlsForDirect": "直接播放没有 HLS 文件",
  "engine.playback.noCues": "这个播放会话没有这条字幕轨道的字幕内容",

  "engine.subtitles.textOnly": "只支持文本字幕文件",
  "engine.subtitles.convertFailed": "无法读取这个字幕文件",
};

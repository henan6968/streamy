// Words every part of the app uses, and how time and counts are written
// (see src/renderer/src/lib/format.ts). Shared, so they stay consistent.

import type { Entry } from "../types";

export const en = {
  "common.ok": "OK",
  "common.cancel": "Cancel",
  "common.close": "Close",
  "common.save": "Save",
  "common.done": "Done",
  "common.back": "Back",
  "common.forward": "Forward",
  "common.settings": "Settings",
  "common.tryAgain": "Try again",
  "common.retry": "Retry",
  "common.remove": "Remove",
  "common.delete": "Delete",
  "common.open": "Open",
  "common.play": "Play",
  "common.pause": "Pause",
  "common.loading": "Loading",
  "common.loadingNow": "Loading…",
  "common.off": "Off",
  "common.on": "On",
  "common.automatic": "Automatic",
  "common.unknown": "Unknown",
  "common.copy": "Copy",
  "common.copied": "Copied",
  "common.somethingWentWrong": "Something went wrong. Please try again.",

  // Time: the player and the torrent page (formatElapsed, formatTimeLeft).
  "common.elapsed.seconds": "{seconds} s",
  "common.elapsed.minutes": "{minutes} min {seconds} s",
  "common.timeLeft.lessThanAMinute": "Less than a minute left",
  "common.timeLeft.minutes": "{count} min left",
  "common.timeLeft.hours": "{count} h left",
  "common.timeLeft.hoursAnd": "{hours} h {minutes} min left",
  "common.time.justNow": "just now",
  // A subtitle delay: "+0.3 s", "−1.0 s".
  "common.delay.zero": "0.0 s",
  "common.delay.value": "{sign}{seconds} s",

  // How many peers a torrent has (formatPeers).
  "common.peers": { one: "{count} peer", other: "{count} peers" },
} as const satisfies Record<string, Entry>;

/** Simplified Chinese. */
export const zh: Record<keyof typeof en, Entry> = {
  "common.ok": "确定",
  "common.cancel": "取消",
  "common.close": "关闭",
  "common.save": "保存",
  "common.done": "完成",
  "common.back": "返回",
  "common.forward": "前进",
  "common.settings": "设置",
  "common.tryAgain": "重试",
  "common.retry": "重试",
  "common.remove": "移除",
  "common.delete": "删除",
  "common.open": "打开",
  "common.play": "播放",
  "common.pause": "暂停",
  "common.loading": "正在加载",
  "common.loadingNow": "正在加载…",
  "common.off": "关闭",
  "common.on": "开启",
  "common.automatic": "自动",
  "common.unknown": "未知",
  "common.copy": "复制",
  "common.copied": "已复制",
  "common.somethingWentWrong": "出了点问题，请再试一次。",

  "common.elapsed.seconds": "{seconds} 秒",
  "common.elapsed.minutes": "{minutes} 分 {seconds} 秒",
  "common.timeLeft.lessThanAMinute": "剩余不到 1 分钟",
  "common.timeLeft.minutes": "剩余 {count} 分钟",
  "common.timeLeft.hours": "剩余 {count} 小时",
  "common.timeLeft.hoursAnd": "剩余 {hours} 小时 {minutes} 分钟",
  "common.time.justNow": "刚刚",
  "common.delay.zero": "0.0 秒",
  "common.delay.value": "{sign}{seconds} 秒",

  "common.peers": "{count} 个节点",
};

import { afterEach, describe, expect, it, vi } from "vitest";
import { setLocale } from "../../../shared/i18n";
import {
  formatBytes,
  formatDelay,
  formatElapsed,
  formatPeers,
  formatPercent,
  formatRateLimit,
  formatRelativeTime,
  formatSpeed,
  formatSwarm,
  formatTime,
  formatTimeLeft,
} from "@/lib/format";

// Most tests are about English. The ones about the language switch it, and
// every test after them starts over in English.
afterEach(() => {
  setLocale("en");
});

describe("formatBytes", () => {
  it.each([
    [0, "0 bytes"],
    [999, "999 bytes"],
    [1_000, "1 kB"],
    [1_234_567, "1.2 MB"],
    [3_400_000_000, "3.4 GB"],
    [512_000_000_000, "512 GB"],
    [2_000_000_000_000, "2 TB"],
  ])("%d → %s", (bytes, text) => {
    expect(formatBytes(bytes, "en-US")).toBe(text);
  });

  it("can use another language's number format", () => {
    expect(formatBytes(1_234_567, "de-DE")).toBe("1,2 MB");
  });

  // Numbers follow the language picked in Settings, never the OS language.
  it("writes numbers in the interface's language", () => {
    setLocale("zh-CN");
    const numberFormat = vi.spyOn(Intl, "NumberFormat");

    expect(formatBytes(1_234_567)).toBe("1.2 MB");
    expect(formatBytes(0)).toBe("0字节");
    expect(formatSpeed(1_468_006)).toBe("1.5 MB/秒");
    expect(numberFormat).toHaveBeenCalledWith("zh-CN", expect.anything());
  });
});

describe("formatSpeed", () => {
  it.each([
    [0, "0 kB/s"],
    [500, "0.5 kB/s"],
    [12_300, "12.3 kB/s"],
    [1_468_006, "1.5 MB/s"],
    [250_000_000, "250 MB/s"],
  ])("%d B/s → %s", (speed, text) => {
    expect(formatSpeed(speed, "en-US")).toBe(text);
  });

  it("treats nonsense as nothing", () => {
    expect(formatSpeed(-1, "en-US")).toBe("0 kB/s");
    expect(formatSpeed(Number.NaN, "en-US")).toBe("0 kB/s");
  });
});

describe("formatRateLimit", () => {
  it.each([
    [250, "250 kB/s"],
    [500, "500 kB/s"],
    [1000, "1 MB/s"],
    [2500, "2.5 MB/s"],
    [50000, "50 MB/s"],
  ])("%d KB/s → %s", (kbps, text) => {
    expect(formatRateLimit(kbps)).toBe(text);
  });

  it("looks exactly like the same speed (1 KB = 1000 bytes)", () => {
    expect(formatRateLimit(10_000)).toBe(formatSpeed(10_000_000));
    expect(formatRateLimit(1_500)).toBe(formatSpeed(1_500_000));
  });
});

describe("formatTime", () => {
  it.each([
    [0, "0:00"],
    [5, "0:05"],
    [59.9, "0:59"],
    [75, "1:15"],
    [600, "10:00"],
    [3600, "1:00:00"],
    [4330, "1:12:10"],
  ])("%s s → %s", (seconds, expected) => {
    expect(formatTime(seconds)).toBe(expected);
  });

  it("shows 0:00 for negative or unknown times", () => {
    expect(formatTime(-3)).toBe("0:00");
    expect(formatTime(Number.NaN)).toBe("0:00");
    expect(formatTime(Number.POSITIVE_INFINITY)).toBe("0:00");
  });
});

describe("formatPercent", () => {
  it("rounds down, so nothing says 100% before it's done", () => {
    expect(formatPercent(0.4567)).toBe("45%");
    expect(formatPercent(0.999)).toBe("99%");
    expect(formatPercent(1)).toBe("100%");
  });

  it("stays within 0–100%", () => {
    expect(formatPercent(-0.2)).toBe("0%");
    expect(formatPercent(1.5)).toBe("100%");
    expect(formatPercent(Number.NaN)).toBe("0%");
  });
});

describe("formatElapsed", () => {
  it("counts seconds, then minutes", () => {
    expect(formatElapsed(0)).toBe("0 s");
    expect(formatElapsed(12.7)).toBe("12 s");
    expect(formatElapsed(60)).toBe("1 min 00 s");
    expect(formatElapsed(185)).toBe("3 min 05 s");
    expect(formatElapsed(-4)).toBe("0 s");
  });

  it("writes its units in the interface's language", () => {
    setLocale("zh-CN");
    expect(formatElapsed(12.7)).toBe("12 秒");
    expect(formatElapsed(185)).toBe("3 分 05 秒");
  });
});

describe("formatTimeLeft", () => {
  it.each([
    [0, "Less than a minute left"],
    [25, "Less than a minute left"],
    [720, "12 min left"],
    [3600, "1 h left"],
    [3900, "1 h 5 min left"],
    [-10, "Less than a minute left"],
  ])("%s s → %s", (seconds, expected) => {
    expect(formatTimeLeft(seconds)).toBe(expected);
  });

  it("is written in the interface's language", () => {
    setLocale("zh-CN");
    expect(formatTimeLeft(0)).toBe("剩余不到 1 分钟");
    expect(formatTimeLeft(720)).toBe("剩余 12 分钟");
    expect(formatTimeLeft(3600)).toBe("剩余 1 小时");
    expect(formatTimeLeft(3900)).toBe("剩余 1 小时 5 分钟");
  });
});

describe("formatDelay", () => {
  it("always shows the sign and one decimal", () => {
    expect(formatDelay(0.3)).toBe("+0.3 s");
    expect(formatDelay(-1)).toBe("−1.0 s");
    expect(formatDelay(0)).toBe("0.0 s");
  });

  it("doesn't show -0.0 after rounding", () => {
    expect(formatDelay(-0.04)).toBe("0.0 s");
    expect(formatDelay(0.1 + 0.2)).toBe("+0.3 s");
  });

  it("is written in the interface's language", () => {
    setLocale("zh-CN");
    expect(formatDelay(0.3)).toBe("+0.3 秒");
    expect(formatDelay(0)).toBe("0.0 秒");
  });
});

describe("formatPeers / formatSwarm", () => {
  it("says how a torrent is doing", () => {
    expect(formatPeers(1)).toBe("1 peer");
    expect(formatPeers(0)).toBe("0 peers");
    expect(formatSwarm({ peers: 12, downloadSpeed: 1_400_000 })).toMatch(
      /^12 peers · 1[.,]4 MB\/s$/,
    );
  });

  it("is written in the interface's language", () => {
    setLocale("zh-CN");
    expect(formatPeers(1)).toBe("1 个节点");
    expect(formatPeers(12)).toBe("12 个节点");
  });
});

describe("formatRelativeTime", () => {
  const now = Date.parse("2026-10-21T12:00:00.000Z");
  const ago = (ms: number) => new Date(now - ms).toISOString();

  it.each([
    [10_000, "just now"],
    [5 * 60_000, "5 minutes ago"],
    [3 * 3_600_000, "3 hours ago"],
    [26 * 3_600_000, "yesterday"],
    [3 * 86_400_000, "3 days ago"],
  ])("%d ms ago → %s", (ms, expected) => {
    expect(formatRelativeTime(ago(ms), now, "en-US")).toBe(expected);
  });

  it("shows the date after a week", () => {
    expect(formatRelativeTime("2026-10-02T12:00:00.000Z", now, "en-US")).toBe(
      "Oct 2",
    );
    expect(formatRelativeTime("2025-10-02T12:00:00.000Z", now, "en-US")).toBe(
      "Oct 2, 2025",
    );
  });

  it("is null for dates it can't read", () => {
    expect(formatRelativeTime("not a date", now)).toBeNull();
  });

  // "Opened vor 5 Minuten" mixed two languages in one sentence: dates follow
  // the interface's language, never the OS language.
  it("writes dates in the interface's language", () => {
    setLocale("zh-CN");
    const relative = vi.spyOn(Intl, "RelativeTimeFormat");
    const dates = vi.spyOn(Intl, "DateTimeFormat");

    expect(formatRelativeTime(ago(5 * 60_000), now)).toBe("5分钟前");
    expect(formatRelativeTime("2026-10-02T12:00:00.000Z", now)).toBe("10月2日");
    expect(relative).toHaveBeenCalledWith("zh-CN", expect.anything());
    expect(dates).toHaveBeenCalledWith("zh-CN", expect.anything());
  });
});

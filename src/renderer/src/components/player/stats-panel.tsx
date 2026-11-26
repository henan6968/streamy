import { X } from "lucide-react";
import { type RefObject, useEffect, useState } from "react";
import type {
  MediaInfo,
  PlaybackMode,
  TorrentSummary,
} from "../../../../shared/engine-api";
import type { EngineSnapshot } from "@/components/player/playback-engine";
import {
  bufferedAhead,
  toMovieRanges,
} from "@/components/player/playback-logic";
import { channelLayout, codecName } from "@/components/player/tracks";
import { encoderLabel } from "@/lib/encoders";
import {
  formatPeers,
  formatPercent,
  formatSpeed,
  formatTime,
} from "@/lib/format";
import { useT } from "@/lib/i18n";

function seconds(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value)
    ? `${value.toFixed(1)} s`
    : "—";
}

/** The message for a session's mode ("direct", "remux", "transcode"). */
function modeKey(mode: PlaybackMode): `player.stats.mode.${PlaybackMode}` {
  return `player.stats.mode.${mode}`;
}

function sourceLine(media: MediaInfo | null, audioIndex: number | null) {
  if (!media?.video) return "—";
  const v = media.video;
  const video = [
    `${codecName(v.codec)}${v.profile ? ` ${v.profile}` : ""}`,
    `${v.width}×${v.height}`,
    v.fps ? `${Number(v.fps.toFixed(3))} fps` : null,
    `${v.bitDepth}-bit${v.hdr ? " HDR" : ""}`,
  ]
    .filter(Boolean)
    .join(" · ");
  const tracks = media.audioTracks;
  const audio =
    tracks.find((track) => track.index === audioIndex) ??
    tracks.find((track) => track.isDefault) ??
    tracks[0];
  return audio
    ? `${video} | ${codecName(audio.codec)} ${channelLayout(audio.channels)}`
    : video;
}

type Sample = {
  time: number;
  videoTime: number;
  ahead: number;
  width: number;
  height: number;
  frames: { dropped: number; total: number } | null;
};

/** The video element's numbers change without events: read them every second. */
function useVideoSample(
  videoRef: RefObject<HTMLVideoElement | null>,
  getTime: () => number,
  offset: number,
) {
  const [sample, setSample] = useState<Sample | null>(null);

  useEffect(() => {
    const read = () => {
      const video = videoRef.current;
      if (!video) return;
      const time = getTime();
      const quality =
        "getVideoPlaybackQuality" in video
          ? video.getVideoPlaybackQuality()
          : null;
      setSample({
        time,
        videoTime: video.currentTime,
        ahead: bufferedAhead(toMovieRanges(video.buffered, offset), time),
        width: video.videoWidth,
        height: video.videoHeight,
        frames: quality
          ? {
              dropped: quality.droppedVideoFrames,
              total: quality.totalVideoFrames,
            }
          : null,
      });
    };
    const first = setTimeout(read, 0);
    const timer = setInterval(read, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [videoRef, getTime, offset]);

  return sample;
}

/** The numbers behind the picture, refreshed every second. */
export function StatsPanel({
  snapshot,
  media,
  torrent,
  videoRef,
  getTime,
  onClose,
}: {
  snapshot: EngineSnapshot;
  media: MediaInfo | null;
  torrent: TorrentSummary | undefined;
  videoRef: RefObject<HTMLVideoElement | null>;
  getTime: () => number;
  onClose: () => void;
}) {
  const t = useT();
  const { session, status, producedUntil } = snapshot;
  const offset = session?.offset ?? 0;
  const sample = useVideoSample(videoRef, getTime, offset);
  const player =
    session?.mode === "direct"
      ? t("player.stats.playerDirect")
      : (snapshot.hlsPlayer ?? "—");

  const rows: [string, string][] = [
    [
      t("player.stats.mode"),
      session
        ? t("player.stats.modeValue", {
            mode: t(modeKey(session.mode)),
            reason: session.reason,
          })
        : "—",
    ],
    [
      t("player.stats.session"),
      session?.id
        ? `${session.id.slice(0, 8)} · ${status?.state ?? "…"}${status?.error ? ` (${status.error})` : ""}`
        : "—",
    ],
    [
      t("player.stats.source"),
      sourceLine(media, snapshot.selection.audioTrack),
    ],
    [
      t("player.stats.output"),
      session && session.output.width > 0
        ? `${session.output.videoCodec} / ${session.output.audioCodec} · ${session.output.width}×${session.output.height}`
        : sample?.width
          ? `${sample.width}×${sample.height}`
          : "—",
    ],
    [t("player.stats.encoder"), session ? encoderLabel(session.encoder) : "—"],
    [t("player.stats.player"), player],
    [t("player.stats.container"), media ? media.container : "—"],
    [
      t("player.stats.bitrate"),
      media?.bitRate ? `${(media.bitRate / 1_000_000).toFixed(1)} Mb/s` : "—",
    ],
    [t("player.stats.offset"), session ? seconds(offset) : "—"],
    [
      t("player.stats.produced"),
      producedUntil !== null
        ? t("player.stats.producedUntil", {
            time: formatTime(producedUntil),
            seconds: seconds(producedUntil),
          })
        : "—",
    ],
    [
      t("player.stats.position"),
      sample
        ? t("player.stats.positionValue", {
            time: formatTime(sample.time),
            seconds: seconds(sample.time),
            video: seconds(sample.videoTime),
          })
        : "—",
    ],
    [t("player.stats.bufferAhead"), seconds(sample?.ahead)],
    [
      t("player.stats.frames"),
      sample?.frames
        ? t("player.stats.framesValue", {
            dropped: sample.frames.dropped,
            total: sample.frames.total,
          })
        : "—",
    ],
    [
      t("player.stats.torrent"),
      torrent
        ? `${formatPeers(torrent.peers)} · ↓ ${formatSpeed(torrent.downloadSpeed)} · ↑ ${formatSpeed(torrent.uploadSpeed)} · ${formatPercent(torrent.progress)}`
        : "—",
    ],
    [t("player.stats.forcedMode"), snapshot.forceMode ?? t("player.stats.no")],
  ];

  return (
    <div className="absolute top-16 left-4 z-20 w-[min(26rem,calc(100vw-2rem))] rounded-lg bg-black/80 p-3 font-mono text-[11px] leading-5 text-white/90 shadow-xl backdrop-blur-sm select-text">
      <button
        type="button"
        aria-label={t("player.stats.close")}
        onClick={onClose}
        className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded text-white/60 outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <X className="size-3.5" />
      </button>
      {/* Room on the right for the close button. */}
      <dl className="grid grid-cols-[6.5rem_1fr] gap-x-2 pr-5">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-white/50">{label}</dt>
            <dd className="min-w-0 break-words">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

import type {
  ClientCapabilities,
  MediaInfo,
  Playback,
  PlaybackMode,
  Quality,
} from "../../shared/engine-api";
import { t } from "../../shared/i18n";
import { AppError, ErrorCode } from "../http/errors";

/*
 * How to play a file in Streamy's player: as it is (direct), repackaged
 * without touching the video (remux), or with the video re-encoded
 * (transcode). Pure, so every branch is easy to test.
 */

export const QUALITY_HEIGHTS: Record<Exclude<Quality, "original">, number> = {
  "1080p": 1080,
  "720p": 720,
  "480p": 480,
  "360p": 360,
};

export type DecideInput = {
  media: MediaInfo;
  fileName: string;
  audioTrack: number | null;
  quality: Quality;
  burnSubtitle: string | null;
  embeddedSubtitles: boolean;
  forceMode: PlaybackMode | null;
  capabilities: ClientCapabilities;
  /** The H.264 encoder a transcode would use. */
  encoder: string;
};

export type Decision = {
  mode: PlaybackMode;
  /** For people: why this mode. */
  reason: string;
  /** The audio track that plays (audio-relative index), null when the file has none. */
  audioTrack: number | null;
  /**
   * remux: copy the audio as is; otherwise it's converted to AAC stereo.
   * Always false for transcode (its audio is cut to start with the video).
   */
  audioCopy: boolean;
  /** transcode only: scale down to this height; null = keep the size. */
  scaleToHeight: number | null;
  /** transcode only: embedded subtitle `0:s:<n>` burned into the picture. */
  burnSubtitle: number | null;
  output: Playback["output"];
  /** "copy" for remux, the encoder for transcode, null for direct. */
  encoder: string | null;
};

type Container = "mp4" | "webm" | "mkv" | "other";

const VIDEO_NAMES: Record<string, string> = {
  h264: "H.264",
  hevc: "HEVC",
  av1: "AV1",
  vp9: "VP9",
  vp8: "VP8",
  mpeg4: "MPEG-4",
  mpeg2video: "MPEG-2",
  msmpeg4v3: "DivX",
  wmv3: "WMV",
  vc1: "VC-1",
};

const AUDIO_NAMES: Record<string, string> = {
  aac: "AAC",
  mp3: "MP3",
  ac3: "AC3",
  eac3: "E-AC3",
  dts: "DTS",
  truehd: "TrueHD",
  flac: "FLAC",
  opus: "Opus",
  vorbis: "Vorbis",
};

function videoName(codec: string) {
  return VIDEO_NAMES[codec] ?? codec.toUpperCase();
}

function audioName(codec: string) {
  return AUDIO_NAMES[codec] ?? codec.toUpperCase();
}

function extensionOf(fileName: string) {
  const dot = fileName.lastIndexOf(".");
  return dot > 0 ? fileName.slice(dot + 1).toLowerCase() : "";
}

function containerOf(
  media: MediaInfo,
  extension: string,
  audioCodec: string | null,
): Container {
  const format = media.container;
  const videoCodec = media.video?.codec ?? "";
  if (format.includes("mp4") || format.includes("mov")) return "mp4";
  if (
    format.includes("webm") &&
    extension === "webm" &&
    ["vp8", "vp9", "av1"].includes(videoCodec) &&
    (audioCodec === null || ["opus", "vorbis"].includes(audioCodec))
  ) {
    return "webm";
  }
  if (format.includes("matroska")) return "mkv";
  return "other";
}

/** Can the player decode the video as it is (inside MP4/HLS)? */
function canDecodeVideo(
  video: NonNullable<MediaInfo["video"]>,
  caps: ClientCapabilities,
): boolean {
  const highBitDepth = video.bitDepth > 8;
  switch (video.codec) {
    case "h264":
      return highBitDepth ? caps.video.h264High10 : caps.video.h264;
    case "hevc":
      return highBitDepth ? caps.video.hevcMain10 : caps.video.hevc;
    case "av1":
      return caps.video.av1;
    case "vp9":
      return caps.video.vp9;
    default:
      return false;
  }
}

function cantDecodeReason(video: NonNullable<MediaInfo["video"]>) {
  if (video.codec === "h264" && video.bitDepth > 8) {
    return t("engine.playback.reason.cantDecode", {
      depth: `${video.bitDepth}-bit `,
      codec: "H.264",
      target: "8-bit H.264",
    });
  }
  const depth = video.bitDepth > 8 ? `${video.bitDepth}-bit ` : "";
  return t("engine.playback.reason.cantDecode", {
    depth,
    codec: videoName(video.codec),
    target: "H.264",
  });
}

function evenRound(value: number) {
  return Math.max(2, Math.round(value / 2) * 2);
}

function parseBurnSubtitle(media: MediaInfo, id: string | null): number | null {
  if (id === null) return null;
  const track = media.subtitleTracks.find((track) => track.id === id);
  const match = /^embedded:(\d+)$/.exec(id);
  if (!track || !match) {
    throw new AppError(
      ErrorCode.BadRequest,
      track
        ? t("engine.errors.pictureSubtitlesOnly")
        : t("engine.errors.noSuchSubtitle"),
    );
  }
  if (track.isText) {
    throw new AppError(
      ErrorCode.BadRequest,
      t("engine.errors.textSubtitlesNotBurnable"),
    );
  }
  return Number(match[1]);
}

export function decide(input: DecideInput): Decision {
  const { media, capabilities: caps } = input;
  const video = media.video;
  if (!video)
    throw new AppError(ErrorCode.BadRequest, t("engine.errors.noVideo"));

  // The audio that will play: the one asked for, else the file's default.
  if (
    input.audioTrack !== null &&
    !media.audioTracks.some((track) => track.index === input.audioTrack)
  ) {
    throw new AppError(
      ErrorCode.BadRequest,
      t("engine.errors.noSuchAudioTrack"),
    );
  }
  const audio =
    input.audioTrack !== null
      ? media.audioTracks.find((track) => track.index === input.audioTrack)
      : (media.audioTracks.find((track) => track.isDefault) ??
        media.audioTracks[0]);
  const audioCodec = audio?.codec ?? null;

  const burnSubtitle = parseBurnSubtitle(media, input.burnSubtitle);

  const extension = extensionOf(input.fileName);
  const container = containerOf(media, extension, audioCodec);
  const containerName =
    container === "other"
      ? extension.toUpperCase() || t("engine.playback.reason.thisFormat")
      : container.toUpperCase();

  const videoOk = canDecodeVideo(video, caps);
  /** Audio the browser plays as it is inside HLS. */
  const audioCopyable =
    (audioCodec === "aac" && caps.audio.aac) ||
    (audioCodec === "mp3" && caps.audio.mp3);

  const targetHeight =
    input.quality === "original"
      ? video.height
      : Math.min(QUALITY_HEIGHTS[input.quality], video.height);
  const lowerQuality = targetHeight < video.height;
  const needVideoTranscode = !videoOk || burnSubtitle !== null || lowerQuality;

  // Why the video has to be re-encoded, most important first.
  const transcodeReasons: string[] = [];
  if (!videoOk) transcodeReasons.push(cantDecodeReason(video));
  if (burnSubtitle !== null)
    transcodeReasons.push(t("engine.playback.reason.burningSubtitles"));
  if (lowerQuality) {
    transcodeReasons.push(
      t("engine.playback.reason.lowerQuality", { quality: input.quality }),
    );
  }

  // Why it can't play as it is (in order of what to fix first).
  const hasEmbeddedText = media.subtitleTracks.some(
    (track) => track.source === "embedded" && track.isText,
  );
  const directAudio =
    audioCodec === null ||
    (container === "mp4" &&
      (audioCodec === "aac" ||
        audioCodec === "mp3" ||
        (audioCodec === "ac3" && caps.audio.ac3) ||
        (audioCodec === "eac3" && caps.audio.eac3))) ||
    (container === "webm" &&
      (audioCodec === "opus" || audioCodec === "vorbis"));

  let notDirect: string | null = null;
  let audioExplained = false;
  if (container !== "mp4" && container !== "webm") {
    notDirect = t("engine.playback.reason.containerNotDirect", {
      container: containerName,
    });
  } else if (!caps.direct[container]) {
    notDirect = t("engine.playback.reason.containerNotSupported", {
      container: containerName,
    });
  } else if (!directAudio) {
    notDirect = t("engine.playback.reason.audioNotSupported", {
      codec: audioName(audioCodec),
    });
    audioExplained = true;
  } else if (audio && audio.index !== 0) {
    notDirect = t("engine.playback.reason.otherAudioTrack");
  } else if (input.embeddedSubtitles && hasEmbeddedText) {
    notDirect = t("engine.playback.reason.embeddedSubtitles");
  }

  // Between two reasons: ". " (English), "。" (Chinese).
  const separator = t("engine.playback.reason.separator");

  let mode: PlaybackMode;
  let reason: string;
  if (needVideoTranscode) {
    // Even a forced direct/remux can't copy video the browser can't use.
    mode = "transcode";
    reason = transcodeReasons.join(separator);
  } else if (input.forceMode === "transcode") {
    mode = "transcode";
    reason = t("engine.playback.reason.transcodeForced");
  } else if (input.forceMode === "remux") {
    mode = "remux";
    reason = t("engine.playback.reason.remuxForced");
  } else if (input.forceMode === "direct" || notDirect === null) {
    mode = "direct";
    reason =
      input.forceMode === "direct"
        ? t("engine.playback.reason.directForced")
        : t("engine.playback.reason.direct");
  } else {
    mode = "remux";
    reason = notDirect;
  }

  // Transcode re-encodes even AAC: only decoded audio can be cut to start
  // exactly with the first video frame.
  const audioCopy = mode === "remux" && audioCopyable;

  const scaleToHeight =
    mode === "transcode" && lowerQuality ? evenRound(targetHeight) : null;
  const output: Playback["output"] =
    mode === "transcode"
      ? {
          videoCodec: "h264",
          audioCodec: audioCodec === null ? "none" : "aac",
          width: scaleToHeight
            ? evenRound((video.width * scaleToHeight) / video.height)
            : video.width - (video.width % 2),
          height: scaleToHeight ?? video.height - (video.height % 2),
        }
      : {
          videoCodec: video.codec,
          audioCodec:
            audioCodec === null
              ? "none"
              : mode === "direct" || audioCopy
                ? audioCodec
                : "aac",
          width: video.width,
          height: video.height,
        };

  // A format change of the audio: say so, unless the reason did.
  const remuxReasonShown = mode === "remux" && reason === notDirect;
  if (
    audioCodec !== null &&
    output.audioCodec !== audioCodec &&
    !(audioExplained && remuxReasonShown)
  ) {
    reason +=
      separator +
      t("engine.playback.reason.audioConverted", {
        codec: audioName(audioCodec),
      });
  }

  return {
    mode,
    reason,
    audioTrack: audio?.index ?? null,
    audioCopy,
    scaleToHeight,
    burnSubtitle: mode === "transcode" ? burnSubtitle : null,
    output,
    encoder:
      mode === "direct" ? null : mode === "remux" ? "copy" : input.encoder,
  };
}

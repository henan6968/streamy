import {
  Activity,
  AudioLines,
  Check,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Maximize,
  Minus,
  Plus,
  Captions,
  SlidersHorizontal,
} from "lucide-react";
import {
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import type { MediaInfo, Quality } from "../../../../shared/engine-api";
import type { MessageKey } from "../../../../shared/i18n";
import type {
  SubtitleBackground,
  SubtitleColor,
  SubtitleSize,
} from "../../../../shared/settings";
import type { SubtitleLook } from "@/components/player/subtitle-overlay";
import {
  audioLabel,
  audioShortLabel,
  qualityLabel,
  qualityOptions,
  type Selection,
  subtitleDetail,
  subtitleLabel,
} from "@/components/player/tracks";
import { SPEEDS, speedLabel } from "@/components/player/speed";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { cn } from "@/lib/cn";
import { formatDelay } from "@/lib/format";
import { useT } from "@/lib/i18n";

export type Fit = "contain" | "fill";

type Panel =
  | "main"
  | "quality"
  | "audio"
  | "subtitles"
  | "subtitle-style"
  | "subtitle-delay"
  | "speed"
  | "fit";

export type SettingsMenuProps = {
  onClose: () => void;
  /** The settings button: clicking it toggles, so it isn't "outside". */
  anchorRef?: RefObject<HTMLElement | null>;
  /** null = no media info (raw playback): only speed, fit and stats. */
  media: MediaInfo | null;
  selection: Selection;
  onQuality: (quality: Quality) => void;
  onAudio: (index: number) => void;
  onSubtitle: (id: string | null) => void;
  /** From Settings → Playback; changing it here changes the setting. */
  subtitleLook: SubtitleLook;
  onSubtitleLook: (patch: Partial<SubtitleLook>) => void;
  subtitleDelay: number;
  onSubtitleDelay: (delay: number) => void;
  rate: number;
  onRate: (rate: number) => void;
  fit: Fit;
  onFit: (fit: Fit) => void;
  stats: boolean;
  onStats: (on: boolean) => void;
};

/**
 * The player's settings: a popover with sub-panels (the generic Menu closes
 * on every click, which doesn't work for "pick, then adjust"). Render it only
 * while open; it always starts on the main panel.
 */
export function SettingsMenu(props: SettingsMenuProps) {
  const { onClose, anchorRef, media } = props;
  const t = useT();
  const [panel, setPanel] = useState<Panel>("main");
  const ref = useRef<HTMLDivElement>(null);

  // Close on a press outside (the settings button handles its own toggle).
  useEffect(() => {
    const onPointerDown = (event: globalThis.PointerEvent) => {
      const target = event.target as Node;
      if (ref.current?.contains(target)) return;
      if (anchorRef?.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [onClose, anchorRef]);

  // Keyboard users land on the chosen item (or the first) of each panel.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const target =
      root.querySelector<HTMLElement>(
        '[aria-checked="true"][role="menuitemradio"]',
      ) ?? root.querySelector<HTMLElement>("[data-item]");
    target?.focus({ preventScroll: true });
  }, [panel]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      // Back to where the keyboard user came from.
      anchorRef?.current?.focus();
      onClose();
      return;
    }
    if (event.key === "ArrowLeft" && panel !== "main") {
      event.preventDefault();
      setPanel(parentOf(panel));
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const items = [
        ...(ref.current?.querySelectorAll<HTMLElement>("[data-item]") ?? []),
      ];
      const at = items.indexOf(document.activeElement as HTMLElement);
      const next =
        event.key === "ArrowDown"
          ? items[(at + 1) % items.length]
          : items[(at - 1 + items.length) % items.length];
      next?.focus();
    }
    // Keys the player would act on (space, F, M…) are for the menu now.
    event.stopPropagation();
  };

  // Anchored above the settings button, growing up from the controls.
  return (
    <div
      ref={ref}
      role="menu"
      aria-label={t("player.menu.title")}
      onKeyDown={onKeyDown}
      className="absolute right-0 bottom-full z-30 mb-2 w-80 max-w-[calc(100vw-1rem)] origin-bottom-right overflow-hidden rounded-xl border border-border bg-background/95 text-foreground shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-150 starting:translate-y-1 starting:opacity-0"
    >
      <div className="max-h-[min(28rem,calc(100dvh-10rem))] overflow-y-auto overscroll-contain p-1.5">
        {panel === "main" && <MainPanel {...props} onOpen={setPanel} />}
        {panel === "quality" && media && (
          <SubPanel
            title={t("player.quality.title")}
            onBack={() => {
              setPanel("main");
            }}
          >
            {qualityOptions(media).map((option) => (
              <Choice
                key={option.value}
                checked={props.selection.quality === option.value}
                label={option.label}
                detail={option.hint}
                onSelect={() => {
                  props.onQuality(option.value);
                  onClose();
                }}
              />
            ))}
          </SubPanel>
        )}
        {panel === "audio" && media && (
          <SubPanel
            title={t("player.audio.title")}
            onBack={() => {
              setPanel("main");
            }}
          >
            {media.audioTracks.map((track) => (
              <Choice
                key={track.index}
                checked={currentAudioIndex(props) === track.index}
                label={audioLabel(track)}
                onSelect={() => {
                  props.onAudio(track.index);
                  onClose();
                }}
              />
            ))}
          </SubPanel>
        )}
        {panel === "subtitles" && media && (
          <SubtitlesPanel {...props} media={media} onOpen={setPanel} />
        )}
        {panel === "subtitle-style" && (
          <StylePanel
            {...props}
            onBack={() => {
              setPanel("subtitles");
            }}
          />
        )}
        {panel === "subtitle-delay" && (
          <DelayPanel
            {...props}
            onBack={() => {
              setPanel("subtitles");
            }}
          />
        )}
        {panel === "speed" && (
          <SubPanel
            title={t("player.speed.title")}
            onBack={() => {
              setPanel("main");
            }}
          >
            {SPEEDS.map((rate) => (
              <Choice
                key={rate}
                checked={props.rate === rate}
                label={speedLabel(rate)}
                onSelect={() => {
                  props.onRate(rate);
                  onClose();
                }}
              />
            ))}
          </SubPanel>
        )}
        {panel === "fit" && (
          <SubPanel
            title={t("player.fit.title")}
            onBack={() => {
              setPanel("main");
            }}
          >
            <Choice
              checked={props.fit === "contain"}
              label={t("player.fit.contain")}
              detail={t("player.fit.containDetail")}
              onSelect={() => {
                props.onFit("contain");
                onClose();
              }}
            />
            <Choice
              checked={props.fit === "fill"}
              label={t("player.fit.fill")}
              detail={t("player.fit.fillDetail")}
              onSelect={() => {
                props.onFit("fill");
                onClose();
              }}
            />
          </SubPanel>
        )}
      </div>
    </div>
  );
}

function parentOf(panel: Panel): Panel {
  return panel === "subtitle-style" || panel === "subtitle-delay"
    ? "subtitles"
    : "main";
}

function currentAudioIndex({ media, selection }: SettingsMenuProps) {
  if (selection.audioTrack !== null) return selection.audioTrack;
  const tracks = media?.audioTracks ?? [];
  return (tracks.find((track) => track.isDefault) ?? tracks[0])?.index ?? null;
}

function MainPanel(
  props: SettingsMenuProps & { onOpen: (panel: Panel) => void },
) {
  const t = useT();
  const { media, selection, onOpen } = props;
  const audio = media?.audioTracks.find(
    (track) => track.index === currentAudioIndex(props),
  );
  const subtitle = media?.subtitleTracks.find(
    (track) => track.id === selection.subtitleId,
  );

  return (
    <>
      {media && (
        <Row
          icon={<SlidersHorizontal />}
          label={t("player.quality.title")}
          value={qualityLabel(selection.quality, media)}
          onClick={() => {
            onOpen("quality");
          }}
        />
      )}
      {media && media.audioTracks.length > 0 && (
        <Row
          icon={<AudioLines />}
          label={t("player.audio.title")}
          value={audio ? audioShortLabel(audio) : t("player.audio.default")}
          onClick={() => {
            onOpen("audio");
          }}
        />
      )}
      {media && (
        <Row
          icon={<Captions />}
          label={t("player.subtitles.title")}
          value={subtitle ? subtitleLabel(subtitle) : t("common.off")}
          onClick={() => {
            onOpen("subtitles");
          }}
        />
      )}
      <Row
        icon={<Gauge />}
        label={t("player.speed.title")}
        value={speedLabel(props.rate)}
        onClick={() => {
          onOpen("speed");
        }}
      />
      <Row
        icon={<Maximize />}
        label={t("player.fit.title")}
        value={
          props.fit === "contain"
            ? t("player.fit.contain")
            : t("player.fit.fill")
        }
        onClick={() => {
          onOpen("fit");
        }}
      />
      <button
        type="button"
        role="menuitemcheckbox"
        aria-checked={props.stats}
        data-item
        onClick={() => {
          props.onStats(!props.stats);
        }}
        className={itemClass}
      >
        <span className="flex size-5 items-center justify-center text-muted-foreground [&_svg]:size-4">
          <Activity />
        </span>
        <span className="flex-1">{t("player.stats.title")}</span>
        <span
          aria-hidden
          className={cn(
            "relative h-5 w-9 rounded-full transition-colors",
            props.stats ? "bg-primary" : "bg-input",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 size-4 rounded-full bg-background shadow transition-transform",
              props.stats && "translate-x-4",
            )}
          />
        </span>
      </button>
    </>
  );
}

function SubtitlesPanel(
  props: SettingsMenuProps & {
    media: MediaInfo;
    onOpen: (panel: Panel) => void;
  },
) {
  const { media, selection, onSubtitle, onOpen, onClose } = props;
  const t = useT();
  return (
    <SubPanel
      title={t("player.subtitles.title")}
      onBack={() => {
        onOpen("main");
      }}
    >
      <Choice
        checked={selection.subtitleId === null}
        label={t("common.off")}
        onSelect={() => {
          onSubtitle(null);
          onClose();
        }}
      />
      {media.subtitleTracks.map((track) => (
        <Choice
          key={track.id}
          checked={selection.subtitleId === track.id}
          label={subtitleLabel(track)}
          detail={subtitleDetail(track)}
          onSelect={() => {
            onSubtitle(track.id);
            onClose();
          }}
        />
      ))}
      {media.subtitleTracks.length === 0 && (
        <p className="px-3 py-2 text-sm text-muted-foreground">
          {t("player.subtitles.none")}
        </p>
      )}
      <div className="my-1.5 h-px bg-border" />
      <Row
        label={t("player.subtitles.style")}
        onClick={() => {
          onOpen("subtitle-style");
        }}
      />
      <Row
        label={t("player.subtitles.delay")}
        value={formatDelay(props.subtitleDelay)}
        onClick={() => {
          onOpen("subtitle-delay");
        }}
      />
    </SubPanel>
  );
}

const SIZE_OPTIONS = [
  { value: "s", label: "player.subtitleStyle.size.s" },
  { value: "m", label: "player.subtitleStyle.size.m" },
  { value: "l", label: "player.subtitleStyle.size.l" },
  { value: "xl", label: "player.subtitleStyle.size.xl" },
] as const satisfies readonly { value: SubtitleSize; label: MessageKey }[];
const BACKGROUND_OPTIONS = [
  { value: "none", label: "player.subtitleStyle.background.none" },
  { value: "shadow", label: "player.subtitleStyle.background.shadow" },
  { value: "box", label: "player.subtitleStyle.background.box" },
] as const satisfies readonly {
  value: SubtitleBackground;
  label: MessageKey;
}[];
const COLOR_OPTIONS = [
  { value: "white", label: "player.subtitleStyle.color.white" },
  { value: "yellow", label: "player.subtitleStyle.color.yellow" },
] as const satisfies readonly { value: SubtitleColor; label: MessageKey }[];

/**
 * The menu is always dark: there, the selected segment (the page colour on
 * a muted group) would be darker than the rest and hard to see. A lighter
 * selection reads at a glance.
 */
const segmentedClass =
  "w-full [&>button]:flex-1 [&>[aria-checked=true]]:bg-accent [&>[aria-checked=true]]:shadow-none";

function StylePanel({
  subtitleLook,
  onSubtitleLook,
  onBack,
}: SettingsMenuProps & { onBack: () => void }) {
  const t = useT();
  const set = (patch: Partial<SubtitleLook>) => {
    onSubtitleLook(patch);
  };
  return (
    <SubPanel title={t("player.subtitleStyle.title")} onBack={onBack}>
      <div className="flex flex-col gap-3 px-3 pt-1 pb-3">
        <StyleRow label={t("player.subtitleStyle.size")}>
          <SegmentedControl
            label={t("player.subtitleStyle.size")}
            size="sm"
            className={segmentedClass}
            options={SIZE_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.label),
            }))}
            value={subtitleLook.size}
            onChange={(size) => {
              set({ size });
            }}
          />
        </StyleRow>
        <StyleRow label={t("player.subtitleStyle.background")}>
          <SegmentedControl
            label={t("player.subtitleStyle.background")}
            size="sm"
            className={segmentedClass}
            options={BACKGROUND_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.label),
            }))}
            value={subtitleLook.background}
            onChange={(background) => {
              set({ background });
            }}
          />
        </StyleRow>
        <StyleRow label={t("player.subtitleStyle.color")}>
          <SegmentedControl
            label={t("player.subtitleStyle.color")}
            size="sm"
            className={segmentedClass}
            options={COLOR_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.label),
            }))}
            value={subtitleLook.color}
            onChange={(color) => {
              set({ color });
            }}
          />
        </StyleRow>
        <p className="text-xs text-muted-foreground">
          {t("player.subtitleStyle.hint")}
        </p>
      </div>
    </SubPanel>
  );
}

function StyleRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

function DelayPanel({
  subtitleDelay,
  onSubtitleDelay,
  onBack,
}: SettingsMenuProps & { onBack: () => void }) {
  const t = useT();
  const change = (step: number) => {
    onSubtitleDelay(Math.round((subtitleDelay + step) * 10) / 10);
  };
  return (
    <SubPanel title={t("player.subtitleDelay.title")} onBack={onBack}>
      <div className="flex flex-col gap-3 px-3 pt-1 pb-3">
        <div className="flex items-center justify-between gap-2">
          <StepButton
            label={t("player.subtitleDelay.earlier")}
            onClick={() => {
              change(-0.1);
            }}
          >
            <Minus />
          </StepButton>
          <output
            aria-live="polite"
            className="font-mono text-lg font-medium tabular-nums"
          >
            {formatDelay(subtitleDelay)}
          </output>
          <StepButton
            label={t("player.subtitleDelay.later")}
            onClick={() => {
              change(0.1);
            }}
          >
            <Plus />
          </StepButton>
        </div>
        <p className="text-xs text-muted-foreground">
          {t("player.subtitleDelay.hint")}
        </p>
        <button
          type="button"
          data-item
          disabled={subtitleDelay === 0}
          onClick={() => {
            onSubtitleDelay(0);
          }}
          className="h-8 rounded-md border border-input text-sm font-medium transition-colors outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          {t("player.subtitleDelay.reset")}
        </button>
      </div>
    </SubPanel>
  );
}

function StepButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-item
      aria-label={label}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-full bg-accent transition-colors outline-none hover:bg-border focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4"
    >
      {children}
    </button>
  );
}

const itemClass =
  "flex min-h-10 w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors outline-none hover:bg-accent focus-visible:bg-accent";

function Row({
  icon,
  label,
  value,
  onClick,
}: {
  icon?: ReactNode;
  label: string;
  value?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      data-item
      onClick={onClick}
      className={itemClass}
    >
      {icon && (
        <span className="flex size-5 items-center justify-center text-muted-foreground [&_svg]:size-4">
          {icon}
        </span>
      )}
      <span className="flex-1">{label}</span>
      {value && (
        <span className="max-w-[55%] truncate text-muted-foreground">
          {value}
        </span>
      )}
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </button>
  );
}

function SubPanel({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: ReactNode;
}) {
  const t = useT();
  return (
    <div role="group" aria-label={title}>
      <button
        type="button"
        data-item
        onClick={onBack}
        className="mb-1 flex h-10 w-full items-center gap-2 rounded-lg border-b border-border px-2 text-sm font-medium transition-colors outline-none hover:bg-accent focus-visible:bg-accent"
      >
        <ChevronLeft className="size-4 text-muted-foreground" aria-hidden />
        <span>{title}</span>
        <span className="sr-only">{t("player.menu.back")}</span>
      </button>
      {children}
    </div>
  );
}

function Choice({
  checked,
  label,
  detail,
  onSelect,
}: {
  checked: boolean;
  label: string;
  detail?: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={checked}
      data-item
      onClick={onSelect}
      className={itemClass}
    >
      <span className="flex size-5 items-center justify-center">
        {checked && <Check className="size-4" />}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate">{label}</span>
        {detail && (
          <span className="truncate text-xs text-muted-foreground">
            {detail}
          </span>
        )}
      </span>
    </button>
  );
}

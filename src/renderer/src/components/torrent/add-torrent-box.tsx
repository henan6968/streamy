import { FolderOpen, Play } from "lucide-react";
import {
  type ClipboardEvent,
  type SubmitEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useAddAndOpen } from "@/hooks/use-add-and-open";
import { useT } from "@/lib/i18n";
import { checkMagnetInput, isTorrentFile, looksLikeMagnet } from "@/lib/magnet";
import { isMac, isModKey } from "@/lib/platform";

/**
 * The way in: paste a magnet link or info hash, or pick a .torrent file.
 * (Dropping a .torrent works anywhere in the window: see DropZone.)
 * ⌘K / Ctrl+K jumps here.
 */
export function AddTorrentBox() {
  const t = useT();
  const { addAndOpen, pendingInput } = useAddAndOpen();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | undefined>();
  const input = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K focuses the box.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isModKey(event) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        input.current?.focus();
        input.current?.select();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const addMagnet = (magnet: string) => {
    const problem = checkMagnetInput(magnet);
    if (problem) {
      setError(problem);
      return;
    }
    setError(undefined);
    void addAndOpen({ kind: "magnet", magnet: magnet.trim() }).then(
      (message) => {
        if (message) setError(message);
      },
    );
  };

  const addFile = (file: File) => {
    if (!isTorrentFile(file)) {
      setError(t("app.add.notTorrent", { name: file.name }));
      return;
    }
    setError(undefined);
    void addAndOpen({ kind: "file", file }).then((message) => {
      if (message) setError(message);
    });
  };

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    addMagnet(value);
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    // A whole magnet pasted = they want to watch it. Skip the click.
    const text = event.clipboardData.getData("text/plain");
    if (!looksLikeMagnet(text) || pendingInput) return;
    event.preventDefault();
    setValue(text.trim());
    addMagnet(text);
  };

  const addingMagnet = pendingInput?.kind === "magnet";
  const addingFile = pendingInput?.kind === "file";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-full flex-col items-center gap-3"
    >
      <div className="flex w-full items-start gap-2">
        <Field
          ref={input}
          label={t("app.add.label")}
          hideLabel
          size="lg"
          className="flex-1 text-left"
          placeholder="magnet:?xt=urn:btih:…"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          value={value}
          error={error}
          onChange={(event) => {
            setValue(event.target.value);
            setError(undefined);
          }}
          onPaste={onPaste}
          aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
        />
        <Button
          type="submit"
          size="lg"
          loading={addingMagnet}
          disabled={addingFile}
        >
          {!addingMagnet && <Play className="fill-current" aria-hidden />}
          {t("common.play")}
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          loading={addingFile}
          disabled={addingMagnet}
          onClick={() => fileInput.current?.click()}
        >
          {!addingFile && <FolderOpen aria-hidden />}
          {t("app.add.openFile")}
        </Button>
        <span>{t("app.add.orDrop")}</span>
      </div>

      <input
        ref={fileInput}
        type="file"
        accept=".torrent,application/x-bittorrent"
        className="hidden"
        aria-label={t("app.add.chooseFile")}
        onChange={(event) => {
          const file = event.target.files?.[0];
          // Reset, so picking the same file again still fires onChange.
          event.target.value = "";
          if (file) addFile(file);
        }}
      />
    </form>
  );
}

import { Clapperboard } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SINTEL_MAGNET, useAddAndOpen } from "@/hooks/use-add-and-open";
import { useT } from "@/lib/i18n";
import { toast } from "@/lib/toast";

/**
 * The sentence with its {button} where the button goes, so the whole thing
 * stays one message in every language.
 */
function withButton(message: string, button: ReactNode) {
  const [before = "", after = ""] = message.split("{button}");
  return (
    <>
      {before}
      {button}
      {after}
    </>
  );
}

/** Nothing watched or opened yet. Offers a legal movie to try it with. */
export function EmptyState() {
  const t = useT();
  const { addAndOpen, isPending } = useAddAndOpen();

  return (
    <Card
      variant="dashed"
      className="flex flex-col items-center gap-3 px-6 py-10 text-center"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-accent text-muted-foreground">
        <Clapperboard className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-1">
        <p className="font-medium">{t("app.home.emptyTitle")}</p>
        <p className="text-sm text-balance text-muted-foreground">
          {t("app.home.emptyBody")}
        </p>
      </div>
      <p className="text-sm text-balance text-muted-foreground">
        {withButton(
          t("app.home.sintelHint"),
          <Button
            variant="link"
            // The size variant's height and padding would win over "link".
            className="h-auto px-0 align-baseline text-sm"
            loading={isPending}
            onClick={() => {
              void addAndOpen({ kind: "magnet", magnet: SINTEL_MAGNET }).then(
                (problem) => {
                  if (problem) {
                    toast.error(t("app.home.sintelFailed"), {
                      description: problem,
                    });
                  }
                },
              );
            }}
          >
            {t("app.home.trySintel")}
          </Button>,
        )}
      </p>
    </Card>
  );
}

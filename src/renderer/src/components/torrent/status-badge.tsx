import type { TorrentSummary } from "../../../../shared/engine-api";
import { Badge } from "@/components/ui/badge";
import { useT } from "@/lib/i18n";

type Props = Pick<TorrentSummary, "status" | "progress" | "downloadSpeed">;

/** Finding peers / Checking / Downloading / Downloaded / Ready / Error. */
export function StatusBadge({ status, progress, downloadSpeed }: Props) {
  const t = useT();
  if (status === "fetching_metadata") {
    return (
      <Badge tone="info" dot>
        {t("app.status.findingPeers")}
      </Badge>
    );
  }
  if (status === "checking") {
    return (
      <Badge tone="info" dot>
        {t("app.status.checking")}
      </Badge>
    );
  }
  if (status === "error") {
    return (
      <Badge tone="danger" dot>
        {t("app.status.error")}
      </Badge>
    );
  }
  if (progress >= 1) {
    return (
      <Badge tone="success" dot>
        {t("app.status.downloaded")}
      </Badge>
    );
  }
  if (downloadSpeed > 0) {
    return (
      <Badge tone="info" dot>
        {t("app.status.downloading")}
      </Badge>
    );
  }
  return (
    <Badge tone="success" dot>
      {t("app.status.ready")}
    </Badge>
  );
}

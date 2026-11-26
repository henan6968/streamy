import { z } from "zod";
import { t } from "../../../../shared/i18n";
import { MAX_MAGNET_LENGTH } from "../../../config";
import { appRoute } from "../../../http/app-route";
import { parseMagnetInput } from "../../../lib/magnet";
import { openTorrent } from "./open";

// The messages are functions: they're only read when a request fails, so
// they're in the language set by then.

const schema = z.object({
  body: z.object(
    {
      magnet: z
        .string({ error: () => t("engine.errors.pasteMagnetOrHash") })
        .max(MAX_MAGNET_LENGTH, {
          error: () =>
            t("engine.errors.magnetTooLong", {
              max: MAX_MAGNET_LENGTH.toLocaleString("en-US"),
            }),
        })
        .superRefine((value, ctx) => {
          const result = parseMagnetInput(value);
          if ("error" in result)
            ctx.addIssue({ code: "custom", message: result.error });
        }),
    },
    { error: () => t("engine.errors.pasteMagnetOrHash") },
  ),
});

/**
 * POST /v1/torrents { magnet }: 201 when added, 200 when it already was.
 * `magnet` may be a bare info hash: how the UI re-opens a torrent from the
 * library (see openTorrent).
 */
export const handler = appRoute({ schema }, async ({ body }, _req, res) => {
  const { torrent, created } = await openTorrent({ magnet: body.magnet });
  res.status(created ? 201 : 200).json({ torrent });
});

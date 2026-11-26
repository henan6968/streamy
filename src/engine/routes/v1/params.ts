import { z } from "zod";
import { t } from "../../../shared/i18n";

// Path parameters shared by the v1 routes.

/** 40 hex chars, any case → lower case (the torrent's id everywhere). */
export const infoHashSchema = z
  .string()
  .regex(/^[0-9a-f]{40}$/i, {
    error: () => t("engine.validation.infoHash"),
  })
  .transform((value) => value.toLowerCase());

export const fileIndexSchema = z.coerce.number().int().min(0);

export const torrentFileParams = z.object({
  infoHash: infoHashSchema,
  fileIndex: fileIndexSchema,
});

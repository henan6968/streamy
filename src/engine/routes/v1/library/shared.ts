import { t } from "../../../../shared/i18n";
import { AppError, ErrorCode } from "../../../http/errors";
import { LibraryError, type LibraryStore } from "../../../library";
import { engineServices } from "../../../services";

// What the library routes share: getting the library, and turning its
// errors into the API's.

/** The engine's library, or 503 outside a running engine. */
export function requireLibrary(): LibraryStore {
  const library = engineServices()?.library;
  if (!library) {
    throw new AppError(
      ErrorCode.ServiceUnavailable,
      t("engine.errors.libraryUnavailable"),
    );
  }
  return library;
}

/** A LibraryError as the API answers it; anything else unchanged. */
export function toApiError(err: unknown): unknown {
  if (!(err instanceof LibraryError)) return err;
  switch (err.code) {
    case "not_found":
      return new AppError(
        ErrorCode.NotFound,
        t("engine.errors.torrentNotInLibrary"),
      );
    case "invalid_input":
      return new AppError(
        ErrorCode.ValidationFailed,
        t("engine.errors.invalidFields"),
        {
          issues: [{ path: err.field ?? "", message: err.message }],
        },
      );
    case "closed":
    case "newer_version":
    case "unavailable":
      return new AppError(
        ErrorCode.ServiceUnavailable,
        t("engine.errors.libraryUnavailable"),
      );
  }
}

/** Runs a library call, with its errors turned into the API's. */
export function libraryCall<T>(work: () => T): T {
  try {
    return work();
  } catch (err) {
    throw toApiError(err);
  }
}

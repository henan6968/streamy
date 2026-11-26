import { type MessageKey, t } from "../../shared/i18n";
import { isInfoHash } from "../lib/info-hash";
import { LibraryError } from "./types";

// Checks on everything that goes into the library. Values come from HTTP
// requests and player heartbeats, so they're checked at run time even though
// TypeScript already knows their types (hence `unknown` parameters).

/** `field`'s name stays as it is (the API's key); the rest is translated. */
function invalid(field: string, key: MessageKey): LibraryError {
  return new LibraryError("invalid_input", t(key, { field }), { field });
}

export function checkInfoHash(value: unknown): string {
  if (!isInfoHash(value)) {
    throw invalid("infoHash", "engine.validation.mustBeInfoHash");
  }
  return value;
}

/** A whole number ≥ 0 (file indexes, audio tracks, sizes). */
export function checkIndex(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw invalid(field, "engine.validation.mustBeWholeNumber");
  }
  return value;
}

/** Rejects NaN, infinities and negative numbers. */
export function checkSeconds(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw invalid(field, "engine.validation.mustBeFiniteNumber");
  }
  return value;
}

export function checkLimit(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 1) {
    throw invalid("limit", "engine.validation.mustBePositiveWholeNumber");
  }
  return value;
}

/** A non-empty string (names, subtitle ids, magnet links). */
export function checkText(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw invalid(field, "engine.validation.mustBeText");
  }
  return value;
}

export function checkBoolean(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") {
    throw invalid(field, "engine.validation.mustBeBoolean");
  }
  return value;
}

export function checkBytes(value: unknown, field: string): Uint8Array {
  if (!(value instanceof Uint8Array) || value.byteLength === 0) {
    throw invalid(field, "engine.validation.mustBeBytes");
  }
  return value;
}

/** Runs `check` unless the value is null or undefined (kept as they are). */
export function optional<T>(
  value: unknown,
  check: (value: unknown) => T,
): T | null | undefined {
  if (value === null || value === undefined) return value;
  return check(value);
}

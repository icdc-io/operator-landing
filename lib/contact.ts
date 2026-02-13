/**
 * Parses a comma-separated environment variable into a trimmed, non-empty string array.
 * Accepts separators with or without surrounding spaces.
 */
export function parseList(env?: string): string[] {
  if (!env) return [];
  return env.split(',').map((s) => s.trim()).filter(Boolean);
}

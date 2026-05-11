/**
 * Estimates reading time for a given body of text.
 *
 * @param body - The text content to estimate reading time for
 * @returns Reading time in minutes (minimum 1)
 */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

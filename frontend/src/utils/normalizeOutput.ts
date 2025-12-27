export function normalizeOutput(value: string): string {
  return value
    .replace(/\r\n/g, '\n')   // Windows → Unix
    .replace(/\n+$/g, '')     // remove trailing newlines
    .trim()                   // remove leading/trailing spaces
}

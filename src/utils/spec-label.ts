/**
 * Prepends the translated "Up to" / "Hasta" prefix to a spec value.
 * Used for voltageRange, powerRange, etc. that need the prefix.
 */
export function withUpTo(value: string, upToLabel: string): string {
  return `${upToLabel} ${value}`;
}

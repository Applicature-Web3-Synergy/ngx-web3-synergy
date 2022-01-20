export function getClientLocale(): string {
  return Intl.NumberFormat().resolvedOptions().locale || 'en-US';
}

export function getAuthHeaders(): Record<string, string> {
  if (typeof document === 'undefined') return {};
  const match = document.cookie.match(/(?:^|;\s*)eco_session=([^;]+)/);
  const token = match ? decodeURIComponent(match[1]) : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

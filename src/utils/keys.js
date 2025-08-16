const ALLOWED = ['Q','W','E','R','F']
export function normalizeKey(k) {
  const up = (k || '').toUpperCase()
  return ALLOWED.includes(up) ? up : ''
}

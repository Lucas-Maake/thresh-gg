export function cleanHash(hash) {
  const h = String(hash || '')
  if (h.startsWith('#/')) return h.slice(2)
  if (h.startsWith('#'))  return h.slice(1)
  return h
}


export default cleanHash
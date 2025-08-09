export function FormatDate (datestring: string) {
  return new Date(datestring).toLocaleDateString('ru-Ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function calculateProgress (dataStart: string, dataEnd: string) {
  if (!dataStart || !dataEnd) {
    return Math.floor(Math.random() * 101) // рандом, как раньше
  }
  const start = new Date(dataStart).getTime()
  const end = new Date(dataEnd).getTime()
  const now = Date.now()

  if (isNaN(start) || isNaN(end)) return Math.floor(Math.random() * 101)
  if (now < start) return 0
  if (now > end) return 100

  return Math.round(((now - start) / (end - start)) * 100)
}

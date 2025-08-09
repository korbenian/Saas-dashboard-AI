export function FormatDate (datestring: string) {
  return new Date(datestring).toLocaleDateString('ru-Ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function calculateProgress (dataEnd: string, dataStart: string) {
  const start = new Date(dataStart).getDate()
  const end = new Date(dataEnd).getDate()
  const now = Date.now()
  if (now < start) return 0
  if (now > end) return 0
  const total = end - start
  const passed = now - start
  return Math.round((total / passed) * 100)
}

export function getRandomProgress () {
  return Math.floor(Math.random() * 40) + 40
} // ⚠️ Временно используем случайный прогресс (от 40% до 80%) для красоты интерфейса.
// В будущем можно заменить на реальный расчёт по задачам проекта.

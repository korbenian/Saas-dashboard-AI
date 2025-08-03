export function FormatDate (datestring: string) {
  return new Date(datestring).toLocaleDateString('ru-Ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function getRandomProgress () {
 return Math.floor(Math.random() * 40) + 40
} // ⚠️ Временно используем случайный прогресс (от 40% до 80%) для красоты интерфейса.
// В будущем можно заменить на реальный расчёт по задачам проекта.

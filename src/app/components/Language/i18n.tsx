export type Locale = 'ru' | 'en'

const translations = {
  ru: {
    sign: 'Вход',
    sign_with_git: 'Войти с помощью Github',
    sign_with_goog: 'Войти с помощью Google',
    projects_title: 'Проекты',
    create_project: 'Создать проект',
    sign_out: 'Выйти',
    no_projects: 'Проекты не найдены.',
    start_end: '📅 {{start}} — {{end}}',
    completed: 'Выполнено: {{progress}}%',
    created: 'Создан: {{date}}',
    delete: 'Удалить',
    unauthorized: 'Доступ воспрещён.',
    sign_in: 'Войти',
    name: 'Название',
    description: 'Описание',
    startDate: 'Дата начала',
    endDate: 'Дата окончания',
    save: 'Сохранить',
    ai_chat_title: '🤖 AI-Чат',
    chat_with_ai: 'Чат с нейросетью',
    theme: 'Тема',
    switch_language: 'Сменить язык'
  },
  en: {
    sign: 'Sign in',
    sign_with_git: 'Sign with Github',
    sign_with_goog: 'Sign with Google',
    projects_title: 'Projects',
    create_project: 'Create Project',
    sign_out: 'Sign Out',
    no_projects: 'No projects found.',
    start_end: '📅 {{start}} — {{end}}',
    completed: 'Completed: {{progress}}%',
    created: 'Created: {{date}}',
    delete: 'Delete',
    unauthorized: 'Access denied.',
    sign_in: 'Sign In',
    name: 'Name',
    description: 'Description',
    startDate: 'Start Date',
    endDate: 'End Date',
    save: 'Save',
    ai_chat_title: '🤖 AI Chat',
    chat_with_ai: 'Chat with AI',
    theme: 'Theme',
    switch_language: 'Switch language'
  }
}

type TranslationKey = keyof typeof translations['ru']

export function t (
  key: TranslationKey,
  locale: Locale = 'en',
  vars: Record<string, string> = {}
): string {
  const template = translations[locale][key] || key
  return template.replace(
    /{{(.*?)}}/g,
    (_, varName) => vars[varName.trim()] ?? ''
  )
}

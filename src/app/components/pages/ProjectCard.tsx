'use client'

import {
  getRandomProgress,
  FormatDate,
  calculateProgress
} from '../../utils/utils'
import { useLocale } from '../Language/LocaleProvider'
import { t } from '../Language/i18n'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useProject } from '../hooks/useProject'
import { useSession } from 'next-auth/react'

export const ProjectCard = () => {
  const { locale } = useLocale()
  const { data: session, status } = useSession()

  const email = session?.user?.email || ''
  const { projects, removeTask } = useProject(email) // Хук вызывается всегда

  if (status === 'loading') {
    return <p>Загрузка...</p>
  }

  if (!session || !session.user?.email) {
    return (
      <h1>
        Доступ воспрещён. <Link href='/'>Войти</Link>
      </h1>
    )
  }

  return (
    <div className='w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 ml-4'>
      {/* Header and buttons */}
      <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
        <h1 className='text-3xl font-bold text-blue-700'>
          {t('projects_title', locale)}
        </h1>
        <div className='flex gap-4'>
          <Link
            href='/createProject'
            className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition'
          >
            {t('create_project', locale)}
          </Link>
        </div>
      </div>

      {/* Project list */}
      {projects.length === 0 ? (
        <p className='text-center text-gray-500'>{t('no_projects', locale)}</p>
      ) : (
        <div className='space-y-6 grid grid-cols-2 gap-4'>
          <AnimatePresence>
            {[...projects]
              .sort(
                (a, b) =>
                  new Date(a.dataStart).getTime() -
                  new Date(b.dataStart).getTime()
              )
              .map(p => {
                const progress = calculateProgress(p.dataStart, p.dataEnd)

                return (
                  <motion.div
                    key={p.index}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, padding: 0, margin: 0 }}
                    transition={{ duration: 0.3 }}
                    className='border break-words whitespace-pre-wrap w-full border-gray-200 rounded-lg p-6 bg-gray-50 shadow-sm overflow-hidden'
                  >
                    <h2 className='text-xl font-semibold text-gray-800'>
                      {p.name}
                    </h2>
                    <p className='text-gray-600 mt-1'>{p.desc}</p>
                    <p className='text-sm text-gray-500 mt-2'>
                      {t('start_end', locale, {
                        start: p.dataStart,
                        end: p.dataEnd
                      })}
                    </p>
                    <div className='mt-4'>
                      <div className='w-full bg-gray-300 rounded-full h-3 overflow-hidden'>
                        <motion.div
                          className='bg-green-500 h-3'
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <p className='text-sm text-gray-600 mt-1'>
                        {t('completed', locale, { progress: `${progress}` })}
                      </p>
                    </div>
                    <p className='text-xs text-gray-400 mt-1'>
                      {t('created', locale, {
                        date: FormatDate(p.createdAt)
                      })}
                    </p>
                    <button
                      onClick={() => removeTask(p.index)}
                      className='mt-4 bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded-md transition'
                    >
                      {t('delete', locale)}
                    </button>
                  </motion.div>
                )
              })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

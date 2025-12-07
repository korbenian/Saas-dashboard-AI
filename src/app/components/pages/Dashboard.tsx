//C:\Users\User\Saas-dashboard-AI\src\app\components\pages\Dashboard.tsx

'use client'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { t } from '../Language/i18n'
import { authOptions } from '../../../lib/authOptions'
import { redirect } from 'next/navigation'
import { useLocale } from '../Language/LocaleProvider'
import { ProjectCard } from './ProjectCard'

import Sidebar from '../../components/NewSidebar'


interface Project {
  name: string
  desc: string
  dataStart: string
  dataEnd: string
  index: string
}

const Dashboard = () => {
  const { locale } = useLocale()

  return (
    <div className='flex gap-8 bg-white text-black p-4 min-h-screen'>
      
      {/* Левая колонка: проекты */}
     <div className="w-64">
    <Sidebar />
  </div>

      <div className='flex-1'>
        <ProjectCard />
      </div>

      {/* Правая колонка: AI-чат */}
      <div className='flex-1 min-w-[300px] max-w-[600px] h-[50vh] flex justify-center items-end rounded-2xl relative overflow-hidden bg-gradient-to-br from-cyan-400 via-cyan-500 to-teal-600 shadow-lg'>
        <div className='absolute top-6 left-6 text-white text-2xl font-semibold'>
          {t('ai_chat_title', locale)}
        </div>

        <Link
          href='/chat'
          className='z-10 bg-green-600 hover:bg-green-900 mb-[5%] text-white py-2 px-4 rounded-lg transition'
        >
          {t('chat_with_ai')}
        </Link>
      </div>
    </div>
  )
}

export default Dashboard

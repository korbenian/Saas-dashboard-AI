'use client'
import { db } from 'src/lib/firebase'
import { query, where, getDocs } from 'firebase/firestore'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { t } from '../Language/i18n'
import { useSession } from 'next-auth/react'
import { useLocale } from '../Language/LocaleProvider'
const CreateProject = () => {
  const [name, setName] = useState('')
  const [desc, setDesk] = useState('')
  const [dataStart, setDataStart] = useState('')
  const [dataEnd, setDataEnd] = useState('')
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { locale } = useLocale()
  const handleSaved = async () => {
    if (!session?.user?.email) return alert('Пользователь не найден')
    setLoading(true)
    try {
      // 1️⃣ Считаем проекты пользователя
      const q = query(
        collection(db, 'projects'),
        where('userEmail', '==', session.user.email)
      )
      const snap = await getDocs(q)

      if (snap.size >= 6) {
        alert('Максимум 6 проектов. Удалите один, чтобы создать новый.')
        return
      }

      const newProject = {
        name: name || 'Без названия',
        desc: desc || '',
        dataStart: dataStart || '',
        dataEnd: dataEnd || '',
        createdAt: new Date().toISOString(),
        userEmail: session.user.email
      }
      if (snap.size > 6) {
        alert('Слишком много проектов,Выполните хотя бы один')
        return
      }
      try {
        console.log('Сохраняем проект...')
        await addDoc(collection(db, 'projects'), newProject)
        console.log('Проект сохранён, переходим на /dashboard')
        router.push('/dashboard')
      } catch (err) {
        console.error('Firestore code →', (err as any).code)
        console.error('Firestore message →', (err as any).message)
        console.error('Ошибка при сохранении:', err)
        alert('Не удалось сохранить проект')
      } finally {
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className='max-w-xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-6'>
      <Link
        href='/dashboard'
        className='fixed top-3 left-0 z-10 bg-green-600 hover:bg-green-900 mb-[5%] text-white py-2 px-4 rounded-lg transition'
      >
        return
      </Link>
      <h1 className='text-3xl font-bold text-center text-gray-800 dark:text-white'>
        {t('create_project', locale)}
      </h1>

      <div className='space-y-2'>
        <label className='block text-gray-700 dark:text-gray-300 text-sm font-medium'>
          {t('name', locale)}
        </label>
        <input
          className='w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className='space-y-2'>
        <label className='block text-gray-700 dark:text-gray-300 text-sm font-medium'>
          {t('description', locale)}
        </label>
        <input
          className='w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          type='text'
          value={desc}
          onChange={e => setDesk(e.target.value)}
        />
      </div>

      <div className='space-y-2'>
        <label className='block text-gray-700 dark:text-gray-300 text-sm font-medium'>
          {t('startDate', locale)}
        </label>
        <input
          className='w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          type='date'
          value={dataStart}
          onChange={e => setDataStart(e.target.value)}
        />
      </div>

      <div className='space-y-2'>
        <label className='block text-gray-700 dark:text-gray-300 text-sm font-medium'>
          {t('endDate', locale)}
        </label>
        <input
          className='w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          type='date'
          value={dataEnd}
          onChange={e => setDataEnd(e.target.value)}
        />
      </div>

      <button
        type='button'
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white font-semibold transition ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        onClick={handleSaved}
      >
        {t('save', locale)}
      </button>
    </div>
  )
}
export default CreateProject

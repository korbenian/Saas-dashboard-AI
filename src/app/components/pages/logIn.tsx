'use client'
import { t } from '../Language/i18n'
import { signIn } from 'next-auth/react'
import { useLocale } from '../Language/LocaleProvider'

export default function LoginPage () {
  const { locale } = useLocale()
  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4'>
        <div className='fixed top-3 left-0 z-10 mb-[5%]  py-2 px-4 rounded-lg transition'>
         
        </div>
        <div className='bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-sm text-center'>
          <h1 className='text-3xl font-extrabold text-blue-600 dark:text-white mb-6'>
            {t('sign', locale)}
          </h1>

          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className='flex items-center cursor-pointer justify-center gap-2 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300 w-full mb-4'
          >
            <svg
              className='w-5 h-5 fill-current'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path d='M12 0C5.37 0 0 5.373 0 12a12 12 0 008.205 11.385c.6.113.82-.26.82-.577v-2.234c-3.338.726-4.043-1.61-4.043-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.082-.73.082-.73 1.204.084 1.837 1.237 1.837 1.237 1.07 1.834 2.808 1.304 3.495.997.107-.775.42-1.304.763-1.603-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.124-.303-.535-1.527.117-3.182 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016 0C17.99 2.465 19 2.787 19 2.787c.655 1.655.245 2.88.12 3.182.77.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.1.823 2.22v3.293c0 .32.216.694.825.576A12.005 12.005 0 0024 12c0-6.627-5.373-12-12-12z' />
            </svg>
            {t('sign_with_git', locale)}
          </button>

          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className='flex items-center cursor-pointer justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-all duration-300 w-full'
          >
            <svg className='w-5 h-5' viewBox='0 0 48 48' aria-hidden='true'>
              <path
                fill='#FFC107'
                d='M43.6 20.5H42V20H24v8h11.3C33.6 32.2 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C33.1 6.1 28.8 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.5-.4-3.5z'
              />
              <path
                fill='#FF3D00'
                d='M6.3 14.7l6.6 4.8C14.3 16.1 18.8 13 24 13c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C33.1 6.1 28.8 4 24 4 16.3 4 9.6 8.6 6.3 14.7z'
              />
              <path
                fill='#4CAF50'
                d='M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.5 35.6 26.9 37 24 37c-5.2 0-9.6-3.2-11.3-7.7l-6.6 5C9.6 39.4 16.3 44 24 44z'
              />
              <path
                fill='#1976D2'
                d='M43.6 20.5H42V20H24v8h11.3c-1.3 3.5-4.6 6-8.3 6-4.1 0-7.6-2.9-8.6-6.7l-6.6 5C14.4 38.8 18.9 42 24 42c11 0 20-9 20-20 0-1.3-.1-2.5-.4-3.5z'
              />
            </svg>
            {t('sign_with_goog', locale)}
          </button>
        </div>
      </div>
    </>
  )
}

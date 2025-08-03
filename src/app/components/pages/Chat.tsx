'use client'
import React, { useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
interface ChatInputProps {
  input: string
  setInput: (v: string) => void
  send: () => void
  loading?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  send,
  loading = false
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // авторасширение поля ввода
  const resizeTextarea = useCallback(() => {
    if (!textareaRef.current) return
    textareaRef.current.style.height = 'auto'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }, [])

  useEffect(() => {
    resizeTextarea()
  }, [input, resizeTextarea])

  // отправка по Enter (без Shift)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className='relative w-full max-w-3xl mx-auto px-4 py-2'>
      <Link
        href='/dashboard'
        className='fixed top-3 left-0 z-10 bg-green-600 hover:bg-green-900 mb-[5%] text-white py-2 px-4 rounded-lg transition'
      >
        return
      </Link>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder='Напиши что-нибудь...'
        className='w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-md px-3 py-2 pr-16 resize-none border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 break-words'
        disabled={loading}
      />

      <button
        onClick={send}
        disabled={!input.trim() || loading}
        className={`absolute bottom-3 right-6 px-4 py-2 rounded text-white transition ${
          !input.trim() || loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        aria-label='Отправить'
      >
        ➤
      </button>
    </div>
  )
}

export default ChatInput

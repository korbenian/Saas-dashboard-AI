'use client'
// components/MessageList.tsx
import React, { useEffect, useRef } from 'react'

interface Message {
  id?: string
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface Props {
  messages: Message[]
}

export const MessageList: React.FC<Props> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // Скролл вниз при появлении нового сообщения
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-2'>
      {messages.map((m, i) => (
        <div
          key={m.id ?? i}
          className={`max-w-[80%] px-4 py-2 rounded-lg ${
            m.role === 'user'
              ? 'bg-blue-600 text-white self-end ml-auto'
              : m.role === 'assistant'
              ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
              : 'bg-yellow-100 text-gray-900 text-sm italic'
          }`}
        >
          {m.content}
        </div>
      ))}
      <div ref={bottomRef} /> {/* якорь для автоскролла */}
    </div>
  )
}
export default MessageList

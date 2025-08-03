'use client'
import axios from 'axios'
import { useState } from 'react'

type Role = 'user' | 'assistant' | 'system'

interface Message {
  role: Role
  content: string
}

export const useChatLogic = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  async function send () {
    if (!input.trim() || loading) return // блокируем спам
    const userMsg: Message = { role: 'user', content: input }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
 
    try {
      const { data } = await axios.post('http://localhost:3001/api/chat', {
        message: userMsg.content
      })
      const reply = data.choices?.[0]?.message?.content ?? '— пустой ответ —'
      const botMsg: Message = { role: 'assistant', content: reply }

      setMessages(prev => [...prev, botMsg])
    } catch (err) {
      console.error(err)
      setMessages(prev => [
        ...prev,
        { role: 'system', content: '⚠️ Ошибка сети. Попробуйте ещё раз.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  return { input, setInput, messages, loading, send }
}

'use client'
import ChatInput from '../pages/Chat'
import { useChatLogic } from '../hooks/AIChatLogic'
import MessageList from '../Chatlogic/MessageList' // компонент, который выводит bubbles

export default function ChatPage () {
  const { input, setInput, messages, loading, send } = useChatLogic()

  return (
    <div className='flex flex-col h-screen bg-gray-50 dark:bg-gray-800'>
      <MessageList messages={messages} />
      <ChatInput
        input={input}
        setInput={setInput}
        send={send}
        loading={loading}
      />
    </div>
  )
}

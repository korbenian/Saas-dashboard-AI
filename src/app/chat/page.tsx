// app/chat/page.tsx

import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/authOptions'
import { redirect } from 'next/navigation'
import ChatPage from '../components/Chatlogic/ChatPage' // или '@/components/AIChat' — как ты его назовёшь

export default async function ChatRoute () {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/') // редиректим на страницу входа
  }

  return <ChatPage />
}

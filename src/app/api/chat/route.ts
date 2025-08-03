import { NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  const { message } = await req.json()
  console.log('📨 Получено сообщение:', message)

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'MyChatApp'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-405b-instruct:free',
          messages: [
            {
              role: 'system',
              content: 'Ты дружелюбный помощник, отвечай кратко и понятно.'
            },
            {
              role: 'user',
              content: message
            }
          ]
        })
      }
    )

    // Лог статус-кода и текста ответа
    console.log('✅ Ответ от OpenRouter:', response.status)

    const text = await response.text()
    console.log('📦 Тело ответа:', text)

    const data = JSON.parse(text)
    return NextResponse.json(data)
  } catch (err) {
    console.error('❌ Ошибка запроса к OpenRouter:', err)
    return NextResponse.json({
      error: '⚠️ Не удалось получить ответ от модели.'
    })
  }
}

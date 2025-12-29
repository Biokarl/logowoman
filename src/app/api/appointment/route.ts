import { NextRequest, NextResponse } from 'next/server'

// Санитизация строки для предотвращения инъекций
function sanitize(str: string): string {
  if (typeof str !== 'string') return ''
  return str
    .replace(/[<>]/g, '') // Удаляем HTML теги
    .trim()
    .slice(0, 500) // Ограничиваем длину
}

// Валидация телефона
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/
  return phoneRegex.test(phone)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Санитизация входных данных
    const name = sanitize(body.name)
    const phone = sanitize(body.phone)
    const message = sanitize(body.message || '')

    // Validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: 'Name is required (min 2 characters)' },
        { status: 400 }
      )
    }

    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Valid phone number is required' },
        { status: 400 }
      )
    }

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (!telegramBotToken || !telegramChatId) {
      console.error('Telegram credentials not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const text = `
🔔 Новая заявка с сайта Logowoman!

👤 Имя: ${name}
📞 Телефон: ${phone}
${message ? `📝 О ребёнке: ${message}` : ''}
    `.trim()

    const response = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: text,
        }),
      }
    )

    const result = await response.json()

    if (!result.ok) {
      console.error('Telegram API error:', result)
      return NextResponse.json(
        { error: result.description || 'Failed to send message' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing appointment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


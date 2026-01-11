import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://logowoman.ru'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Контакты центра Logowoman в Краснодаре. Адрес: ул. Карякина, 27. Телефон: +7 (918) 139-14-80. Работаем: Пн-Пт 9:00-20:00, Сб 10:00-18:00',
  keywords: ['контакты логопеда', 'адрес центра', 'телефон', 'Краснодар ул. Карякина', 'запись на прием'],
  alternates: {
    canonical: '/contacts',
  },
  openGraph: {
    title: 'Контакты | Logowoman — Центр в Краснодаре',
    description: 'Контакты центра Logowoman: ул. Карякина, 27, Краснодар. Телефон: +7 (918) 139-14-80',
    url: `${siteUrl}/contacts`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Контакты | Logowoman',
    description: 'Контакты центра Logowoman: ул. Карякина, 27, Краснодар. Телефон: +7 (918) 139-14-80',
  },
}

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


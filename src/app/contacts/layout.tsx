import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Контакты центра Logowoman в Краснодаре. Адрес: ул. Карякина, 27. Телефон: +7 918 139 14 80. Запишитесь на консультацию!',
  openGraph: {
    title: 'Контакты | Logowoman',
    description: 'Адрес, телефон, время работы центра Logowoman. Запишитесь на консультацию!',
  },
}

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


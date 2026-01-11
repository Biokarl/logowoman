import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://logowoman.ru'

export const metadata: Metadata = {
  title: 'Услуги',
  description: 'Комплексные услуги логопеда, дефектолога, детского психолога и нейропсихолога в Краснодаре. Индивидуальные программы развития речи и коррекции задержек развития.',
  keywords: ['услуги логопеда', 'дефектолог Краснодар', 'детский психолог', 'нейропсихолог', 'коррекция речи', 'задержка развития'],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Услуги | Logowoman — Центр психо-речевой коррекции',
    description: 'Комплексные услуги логопеда, дефектолога, детского психолога и нейропсихолога в Краснодаре',
    url: `${siteUrl}/services`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Услуги | Logowoman',
    description: 'Комплексные услуги логопеда, дефектолога, детского психолога и нейропсихолога в Краснодаре',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


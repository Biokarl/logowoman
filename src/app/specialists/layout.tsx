import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://logowoman.ru'

export const metadata: Metadata = {
  title: 'Специалисты',
  description: 'Команда из 11 опытных специалистов: логопеды, дефектологи, психологи, нейропсихологи, ABA-тераписты в Краснодаре. Дипломы и сертификаты.',
  keywords: ['логопед Краснодар', 'дефектолог', 'психолог для детей', 'нейропсихолог', 'специалисты по развитию речи', 'ABA-терапист'],
  alternates: {
    canonical: '/specialists',
  },
  openGraph: {
    title: 'Специалисты | Logowoman — Команда профессионалов',
    description: 'Команда из 11 опытных специалистов: логопеды, дефектологи, психологи, нейропсихологи в Краснодаре',
    url: `${siteUrl}/specialists`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Специалисты | Logowoman',
    description: 'Команда из 11 опытных специалистов: логопеды, дефектологи, психологи, нейропсихологи в Краснодаре',
  },
}

export default function SpecialistsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://logowoman.ru'

export const metadata: Metadata = {
  title: 'Сертификаты',
  description: 'Дипломы и сертификаты специалистов центра Logowoman. Все специалисты имеют высшее образование и регулярно повышают квалификацию.',
  keywords: ['сертификаты логопеда', 'дипломы специалистов', 'образование специалистов', 'квалификация'],
  alternates: {
    canonical: '/certificates',
  },
  openGraph: {
    title: 'Сертификаты специалистов | Logowoman',
    description: 'Дипломы и сертификаты специалистов центра Logowoman. Все специалисты имеют высшее образование и регулярно повышают квалификацию.',
    url: `${siteUrl}/certificates`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Сертификаты специалистов | Logowoman',
    description: 'Дипломы и сертификаты специалистов центра Logowoman',
  },
}

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


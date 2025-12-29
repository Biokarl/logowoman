import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Сертификаты',
  description: 'Дипломы и сертификаты специалистов центра Logowoman. Подтверждение квалификации логопедов, дефектологов и психологов.',
  openGraph: {
    title: 'Сертификаты | Logowoman',
    description: 'Дипломы и сертификаты наших специалистов.',
  },
}

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


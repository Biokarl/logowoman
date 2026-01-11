import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://logowoman.ru'

export const metadata: Metadata = {
  title: {
    default: 'Logowoman — Центр психо-речевой коррекции в Краснодаре',
    template: '%s | Logowoman'
  },
  description: 'Профессиональная помощь логопеда, дефектолога, психолога и нейропсихолога для детей в Краснодаре. Индивидуальные программы развития. Запись: +7 (918) 139-14-80',
  keywords: ['логопед', 'дефектолог', 'психолог', 'нейропсихолог', 'Краснодар', 'коррекция речи', 'развитие детей', 'детский центр', 'задержка развития'],
  authors: [{ name: 'Logowoman' }],
  creator: 'Logowoman',
  publisher: 'Logowoman',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'Logowoman',
    title: 'Logowoman — Центр психо-речевой коррекции в Краснодаре',
    description: 'Профессиональная помощь логопеда, дефектолога, психолога и нейропсихолога для детей в Краснодаре',
    images: [
      {
        url: '/images/hero/Команда.JPG',
        width: 1200,
        height: 630,
        alt: 'Logowoman - Центр психо-речевой коррекции',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logowoman — Центр психо-речевой коррекции в Краснодаре',
    description: 'Профессиональная помощь логопеда, дефектолога, психолога и нейропсихолога для детей в Краснодаре',
    images: ['/images/hero/Команда.JPG'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Структурированные данные JSON-LD для SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Logowoman',
    description: 'Центр психо-речевой коррекции в Краснодаре. Профессиональная помощь логопеда, дефектолога, психолога и нейропсихолога для детей.',
    url: siteUrl,
    logo: `${siteUrl}/images/hero/logo.jpg`,
    image: `${siteUrl}/images/hero/Команда.JPG`,
    telephone: '+79181391480',
    email: 'info@logowoman.ru',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Карякина, 27',
      addressLocality: 'Краснодар',
      addressRegion: 'Краснодарский край',
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.066998,
      longitude: 39.010518,
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Краснодар',
    },
    medicalSpecialty: ['Speech Therapy', 'Developmental Psychology', 'Child Psychology', 'Neuropsychology'],
  }

  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/images/hero/logo.jpg" />
        <link rel="apple-touch-icon" href="/images/hero/logo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {/* Контейнер с декоративными пятнами */}
        <div className="blobs-container" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />
          <div className="blob blob-5" />
          <div className="blob blob-6" />
          <div className="blob blob-7" />
          <div className="blob blob-8" />
          <div className="blob blob-9" />
          <div className="blob blob-10" />
        </div>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}


import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://logowoman.ru'),
  title: {
    default: 'Logowoman — Центр психо-речевой коррекции в Краснодаре',
    template: '%s | Logowoman'
  },
  description: 'Логопед, дефектолог, психолог в Краснодаре. Профессиональная помощь детям с задержкой речи, ЗПР, СДВГ. Опытные специалисты, индивидуальный подход, современные методики.',
  keywords: ['логопед Краснодар', 'дефектолог Краснодар', 'детский психолог', 'задержка речи', 'ЗРР', 'ЗПР', 'развитие речи', 'коррекция речи', 'нейропсихолог', 'Logowoman'],
  authors: [{ name: 'Logowoman' }],
  creator: 'Logowoman',
  publisher: 'Logowoman',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://logowoman.ru',
    siteName: 'Logowoman',
    title: 'Logowoman — Центр психо-речевой коррекции в Краснодаре',
    description: 'Логопед, дефектолог, психолог для детей. Помогаем детям говорить и развиваться. Запишитесь на консультацию!',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Logowoman — Центр психо-речевой коррекции',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logowoman — Центр психо-речевой коррекции',
    description: 'Логопед, дефектолог, психолог для детей в Краснодаре',
    images: ['/images/og-image.jpg'],
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
  verification: {
    yandex: 'your-yandex-verification-code',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Logowoman — Центр психо-речевой коррекции',
  description: 'Логопед, дефектолог, психолог для детей в Краснодаре. Профессиональная помощь в развитии речи.',
  url: 'https://logowoman.ru',
  telephone: '+7 918 139 14 80',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Карякина, 27',
    addressLocality: 'Краснодар',
    addressRegion: 'Краснодарский край',
    postalCode: '350000',
    addressCountry: 'RU'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.066998,
    longitude: 39.010518
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '16:00'
    }
  ],
  sameAs: [
    'https://t.me/yana_logowoman',
    'https://wa.me/79181391480'
  ],
  priceRange: '$$',
  image: 'https://logowoman.ru/images/og-image.jpg'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/images/hero/logo.jpg" />
        <link rel="apple-touch-icon" href="/images/hero/logo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Контейнер с декоративными пятнами */}
        <div className="blobs-container">
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


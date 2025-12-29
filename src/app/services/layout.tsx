import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Услуги',
  description: 'Логопед, дефектолог, детский психолог, нейропсихолог в Краснодаре. Диагностика и коррекция речевых нарушений, работа с ЗПР, СДВГ. Индивидуальный подход.',
  openGraph: {
    title: 'Услуги | Logowoman',
    description: 'Логопед, дефектолог, детский психолог, нейропсихолог. Профессиональная помощь детям.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


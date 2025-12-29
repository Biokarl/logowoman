import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Специалисты',
  description: 'Команда опытных логопедов, дефектологов, психологов и нейропсихологов центра Logowoman в Краснодаре. Более 10 лет опыта работы с детьми.',
  openGraph: {
    title: 'Наши специалисты | Logowoman',
    description: 'Опытные логопеды, дефектологи, психологи. Профессиональная команда для помощи вашему ребёнку.',
  },
}

export default function SpecialistsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


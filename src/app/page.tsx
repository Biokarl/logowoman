import Hero from '@/components/sections/Hero/Hero'
import About from '@/components/sections/About/About'
import Team from '@/components/sections/Team/Team'
import Specialists from '@/components/sections/Specialists/Specialists'
import Videos from '@/components/sections/Videos/Videos'
import FAQ from '@/components/sections/FAQ/FAQ'
import Appointment from '@/components/sections/Appointment/Appointment'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      {/* <Team /> */}
      <Specialists />
      <Videos />
      <FAQ />
      <Appointment />
    </>
  )
}


'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import styles from './About.module.css'

import 'swiper/css'

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Оснащенные кабинеты',
    description: 'Наш центр оснащен проверенным на практике    оборудованием  и авторскими пособиями от ведущих специалистов России,  а так же огромным количеством различных развивающих  материалов'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Постоянный мониторинг динамики',
    description: 'Каждый квартал оцениваем результат от проделанной работы , ставим новые задачи и корректируем текущие'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Индивидуальные программы',
    description: 'Разрабатываем персональную программу для каждого ребёнка'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Проверенные методики',
    description: 'Используем только научно обоснованные и эффективные методы коррекции'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    title: 'Гарантированные результаты',
    description: 'Видимые улучшения уже после первых занятий благодаря комплексному подходу'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Забота и поддержка',
    description: 'Поддерживаем не только детей, но и их родителей на всём пути'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.iconWrapper}>
        {feature.icon}
      </div>
      <h3 className={styles.cardTitle}>{feature.title}</h3>
      <p className={styles.cardDesc}>{feature.description}</p>
    </div>
  )
}

export default function About() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>О нашем центре</h2>
          <p>
            Мы создали пространство, где:
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Swiper */}
        <div className={styles.mobileSwiper}>
          <div className={styles.swiperNavigation}>
            <button 
              className={`${styles.navBtn} ${isBeginning ? styles.navBtnDisabled : ''}`}
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Предыдущий"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button 
              className={`${styles.navBtn} ${isEnd ? styles.navBtnDisabled : ''}`}
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Следующий"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
          
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1.15}
            centeredSlides={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              handleSlideChange(swiper)
            }}
            onSlideChange={handleSlideChange}
            className={styles.swiper}
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <FeatureCard feature={feature} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion } from 'framer-motion'
import styles from './Specialists.module.css'

import 'swiper/css'

const specialists = [
  {
    id: 1,
    name: 'Яна Орловская',
    specialty: 'Логопед-дефектолог',
    experience: '12 лет опыта',
    photo: '/images/specialists/specialist-1.jpg',
    reviewsCount: 156
  },
  {
    id: 2,
    name: 'Елена Смирнова',
    specialty: 'Детский психолог',
    experience: '8 лет опыта',
    photo: '/images/specialists/specialist-2.jpg',
    reviewsCount: 98
  },
  {
    id: 3,
    name: 'Марина Козлова',
    specialty: 'Нейропсихолог',
    experience: '10 лет опыта',
    photo: '/images/specialists/specialist-3.jpg',
    reviewsCount: 124
  },
  {
    id: 4,
    name: 'Анна Петрова',
    specialty: 'Логопед',
    experience: '6 лет опыта',
    photo: '/images/specialists/specialist-4.jpg',
    reviewsCount: 87
  },
  {
    id: 5,
    name: 'Ольга Иванова',
    specialty: 'Дефектолог',
    experience: '9 лет опыта',
    photo: '/images/specialists/specialist-5.jpg',
    reviewsCount: 112
  },
]

export default function Specialists() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <section className={`section ${styles.specialists}`} id="specialists">
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-title" style={{ marginBottom: 0 }}>
            <h2>Наши специалисты</h2>
            <p>Познакомьтесь с нашей командой профессионалов</p>
          </div>
          
          <div className={styles.navigation}>
            <button 
              className={`${styles.navBtn} ${isBeginning ? styles.navBtnDisabled : ''}`}
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Предыдущий"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button 
              className={`${styles.navBtn} ${isEnd ? styles.navBtnDisabled : ''}`}
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Следующий"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              handleSlideChange(swiper)
            }}
            onSlideChange={handleSlideChange}
            breakpoints={{
              500: { slidesPerView: 1.2 },
              700: { slidesPerView: 2 },
              1000: { slidesPerView: 2.5 },
              1200: { slidesPerView: 3 },
            }}
            className={styles.swiper}
          >
            {specialists.map((specialist) => (
              <SwiperSlide key={specialist.id}>
                <div className={`card ${styles.card}`}>
                  <div className={styles.photoWrapper}>
                    <div className={styles.photoPlaceholder}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className={styles.info}>
                    <h3 className={styles.name}>{specialist.name}</h3>
                    <p className={styles.specialty}>{specialist.specialty}</p>
                    <p className={styles.experience}>{specialist.experience}</p>
                    
                    <div className={styles.actions}>
                      <Link href={`/specialists?open=${specialist.id}`} className={styles.detailsBtn}>
                        Подробнее
                      </Link>
                      <a 
                        href="https://wa.me/79181391480" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.messageBtn} 
                        aria-label="Написать в WhatsApp"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                      </a>
                    </div>
                    
                    <div className={styles.reviews}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-active)">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>{specialist.reviewsCount} отзывов</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div 
          className={styles.viewAll}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/specialists" className="btn btn-outline">
            Все специалисты
          </Link>
        </motion.div>
      </div>
    </section>
  )
}


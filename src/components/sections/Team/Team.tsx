'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './Team.module.css'

const teamImages = [
  { src: '/images/team/team1.jpg', alt: 'Занятия с детьми' },
  { src: '/images/team/team2.jpg', alt: 'Рабочий процесс' },
  { src: '/images/team/team3.jpg', alt: 'Индивидуальные занятия' },
  { src: '/images/team/team4.jpg', alt: 'Работа специалистов' },
  { src: '/images/team/team5.jpg', alt: 'Развитие речи' },
  { src: '/images/team/team6.jpg', alt: 'Коррекционная работа' },
]

export default function Team() {
  return (
    <section className={`section ${styles.team}`}>
      <div className="container">
        <div className={styles.content}>
          <motion.div 
            className={styles.text}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.title}>Чем мы можем помочь?</h2>
            <p className={styles.description}>
              Мы можем помочь  детям без речи , без понимания речи , с трудностями в обучении , поведении и коммуникации . 
              Справимся со скудным словарным запасом ,   отсутствием фразовой и вопросительной речи .
            </p>
            <p className={styles.description}>
              Исправим  нарушения  в  грамматическом  строе речи , фонематическом слухе .  Скорректируем  звукопроизношение при любом виде расстройства от миофункционального до проблем с иннервацией и тонусом мышц .
            </p>
            <p className={styles.description}>
              Справимся с задержками в развитии мыслительных операций:  памяти , логики , внимания  и других ментальных нарушений .
            </p>
            
            <ul className={styles.list}>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--text-active)">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Высшее профильное образование
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--text-active)">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Регулярное повышение квалификации
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--text-active)">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Индивидуальный подход к каждому ребёнку
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--text-active)">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Работа с современным оборудованием
              </li>
            </ul>
          </motion.div>

          <motion.div 
            className={styles.images}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.imageGrid}>
              {/* Главное большое фото */}
              <div className={styles.imageLarge}>
                <Image 
                  src={teamImages[0].src}
                  alt={teamImages[0].alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              {/* Маленькие фото в сетке */}
              <div className={styles.smallGrid}>
                {teamImages.slice(1, 5).map((img, index) => (
                  <motion.div 
                    key={img.src}
                    className={styles.imageSmall}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Image 
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 600px) 50vw, (max-width: 900px) 25vw, 15vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './Team.module.css'

const teamImages = [
  { src: '/images/team/team1.jpg', alt: 'Команда Logowoman' },
  { src: '/images/team/team2.jpg', alt: 'Рабочий процесс' },
  { src: '/images/team/team3.jpg', alt: 'Занятия с детьми' },
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
            <h2 className={styles.title}>Наша команда</h2>
            <p className={styles.description}>
              Постоянно повышает квалификацию и применяют передовые методики в своей работе,  исходя из законов развития психики , речи и мышления .
            </p>
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
              <div className={styles.imageLarge}>
                <div className={styles.imagePlaceholder}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span>Фото команды</span>
                </div>
              </div>
              <div className={styles.imageSmall}>
                <div className={styles.imagePlaceholder}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              </div>
              <div className={styles.imageSmall}>
                <div className={styles.imagePlaceholder}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


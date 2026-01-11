'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.heroContainer}`}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.badge}>Центр психо-речевой коррекции</span>
          <h1 id="hero-heading" className={styles.title}>
            Комплексная <span className={styles.highlight}>помощь</span> детям с задержкой в развитии
          </h1>
          <p className={styles.description}>
          Место, где результат говорит за нас.
          Профессиональная команда коррекционных специалистов.
          Индивидуальные программы абилитации и развития, постоянный мониторинг динамики. Все специалисты постоянно повышают свои компетенции и владеют самыми современными коррекционными методиками.
          </p>
          <div className={styles.buttons}>
            <Link href="/#appointment" className="btn btn-primary">
              Записаться на приём
            </Link>
            <Link href="/specialists" className="btn btn-outline" aria-label="Перейти к списку специалистов">
              Наши специалисты
            </Link>
          </div>
          
          <dl className={styles.stats} aria-label="Статистика центра">
            <div className={styles.stat}>
              <dt className={styles.statNumber}>10+</dt>
              <dd className={styles.statLabel}>лет опыта</dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statNumber}>1000+</dt>
              <dd className={styles.statLabel}>счастливых семей</dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statNumber}>11</dt>
              <dd className={styles.statLabel}>специалистов</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.imageDecor}>
            <div className={styles.decorCircle1}></div>
            <div className={styles.decorCircle2}></div>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/images/hero/Команда.JPG"
              alt="Логопеды и дефектологи в Краснодаре | Центр Logowoman"
              fill
              priority
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.imageInfo}>
            <span className={styles.infoName}>Комплексная помощь в развитии</span>
            <span className={styles.infoRole}>Профессионалы с опытом более 10 лет</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


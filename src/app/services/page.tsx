'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './services.module.css'
import { services } from '@/data/services'
import { specialists } from '@/data/specialists'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

// Получить специалистов по их ID
function getSpecialistsByIds(ids: number[]) {
  return specialists.filter(s => ids.includes(s.id))
}

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Наши услуги
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Комплексная помощь в развитии речи и психологическая поддержка детей
          </motion.p>
        </div>
      </section>

      <section className={`section ${styles.services}`}>
        <div className="container">
          <motion.div 
            className={styles.servicesList}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => {
              const serviceSpecialists = getSpecialistsByIds(service.specialistIds)
              
              return (
                <motion.div 
                  key={service.id} 
                  id={service.id}
                  className={`card ${styles.serviceCard} ${index % 2 === 1 ? styles.reversed : ''}`}
                  variants={itemVariants}
                >
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h2 className={styles.cardTitle}>{service.title}</h2>
                      <p className={styles.cardDesc}>{service.description}</p>
                    </div>
                    
                    <ul className={styles.features}>
                      {service.features.map((feature, idx) => (
                        <li key={idx}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--text-active)">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className={styles.specialistsList}>
                      <h4 className={styles.specialistsTitle}>Специалисты:</h4>
                      {serviceSpecialists.map(spec => (
                        <div key={spec.id} className={styles.specialist}>
                          <div className={styles.specialistPhoto}>
                            <Image
                              src={spec.photo}
                              alt={spec.name}
                              width={48}
                              height={48}
                              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                          </div>
                          <div className={styles.specialistInfo}>
                            <span className={styles.specialistName}>{spec.name}</span>
                            <span className={styles.specialistRole}>{spec.specialty}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.cardImage}>
                    <div className={styles.imagePlaceholder}>
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span className={styles.imagePlaceholderText}>Фото с занятий</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

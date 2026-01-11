'use client'

import { useMemo } from 'react'
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

// Создаем Map для быстрого поиска специалистов (O(1) вместо O(n))
const specialistsMap = new Map(specialists.map(s => [s.id, s]))

export default function ServicesPage() {
  // Мемоизируем соответствие услуг и специалистов
  const servicesWithSpecialists = useMemo(() => {
    return services.map(service => ({
      ...service,
      specialists: service.specialistIds
        .map(id => specialistsMap.get(id))
        .filter((s): s is typeof specialists[0] => s !== undefined)
    }))
  }, [])

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

      <section className={`section ${styles.services}`} aria-labelledby="services-heading">
        <div className="container">
          <h2 id="services-heading" className="visually-hidden">Список услуг</h2>
          <motion.div 
            className={styles.servicesList}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {servicesWithSpecialists.map((service, index) => {
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
                      {service.specialists.map(spec => (
                        <div key={spec.id} className={styles.specialist}>
                          <div className={styles.specialistPhoto}>
                            <Image
                              src={spec.photo}
                              alt={`${spec.name} - ${spec.specialty}`}
                              width={48}
                              height={48}
                              loading="lazy"
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
                    <Image
                      src={service.image}
                      alt={`${service.title} - ${service.description}`}
                      fill
                      sizes="(max-width: 1000px) 100vw, 400px"
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      style={{ objectFit: 'cover' }}
                    />
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

'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './certificates.module.css'
import { specialists, Certificate } from '@/data/specialists'

type CertificateWithSpecialist = Certificate & {
  specialistId: number
  specialistName: string
}

// Собираем все сертификаты из специалистов
function getAllCertificates(): CertificateWithSpecialist[] {
  const allCerts: CertificateWithSpecialist[] = []
  
  specialists.forEach(specialist => {
    if (specialist.certificates) {
      specialist.certificates.forEach(cert => {
        allCerts.push({
          ...cert,
          specialistId: specialist.id,
          specialistName: specialist.name
        })
      })
    }
  })
  
  return allCerts
}

// Получаем список специалистов с сертификатами
function getSpecialistsWithCertificates() {
  return specialists.filter(s => s.certificates && s.certificates.length > 0)
}

function CertificatesContent() {
  const searchParams = useSearchParams()
  const specialistId = searchParams.get('specialist')
  
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateWithSpecialist | null>(null)
  const [activeFilter, setActiveFilter] = useState<number | null>(
    specialistId ? parseInt(specialistId) : null
  )

  const allCertificates = getAllCertificates()
  const specialistsWithCerts = getSpecialistsWithCertificates()
  
  const filteredCertificates = activeFilter 
    ? allCertificates.filter(c => c.specialistId === activeFilter)
    : allCertificates

  const activeSpecialist = activeFilter 
    ? specialists.find(s => s.id === activeFilter)
    : null

  // Обновляем фильтр при изменении URL
  useEffect(() => {
    if (specialistId) {
      setActiveFilter(parseInt(specialistId))
    }
  }, [specialistId])

  // Блокировка скролла при открытии модального окна
  useEffect(() => {
    if (selectedCertificate) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [selectedCertificate])

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
            {activeSpecialist ? `Сертификаты: ${activeSpecialist.name}` : 'Сертификаты'}
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {activeSpecialist 
              ? `${activeSpecialist.specialty}`
              : 'Дипломы и сертификаты наших специалистов'
            }
          </motion.p>
        </div>
      </section>

      <section className={`section ${styles.certificates}`}>
        <div className="container">
          {/* Фильтры */}
          {specialistsWithCerts.length > 0 && (
            <motion.div 
              className={styles.filters}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <button
                className={`${styles.filterBtn} ${!activeFilter ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(null)}
              >
                Все
              </button>
              {specialistsWithCerts.map(specialist => (
                <button
                  key={specialist.id}
                  className={`${styles.filterBtn} ${activeFilter === specialist.id ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveFilter(specialist.id)}
                >
                  {specialist.name.split(' ')[0]} {specialist.name.split(' ')[1]}
                </button>
              ))}
            </motion.div>
          )}

          {filteredCertificates.length === 0 ? (
            <motion.div 
              className={styles.empty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>Сертификаты скоро будут добавлены</p>
            </motion.div>
          ) : (
            <motion.div 
              className={styles.grid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {filteredCertificates.map((cert, index) => (
                <motion.div
                  key={`${cert.specialistId}-${cert.id}`}
                  className={styles.card}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  onClick={() => cert.image && setSelectedCertificate(cert)}
                  style={{ cursor: cert.image ? 'pointer' : 'default' }}
                >
                  {cert.image ? (
                    <div className={`${styles.imageWrapper} ${cert.orientation === 'landscape' ? styles.imageWrapperLandscape : ''}`}>
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        sizes="(max-width: 550px) 100vw, (max-width: 800px) 50vw, (max-width: 1100px) 33vw, 25vw"
                        style={{ objectFit: cert.orientation === 'landscape' ? 'contain' : 'cover' }}
                      />
                    </div>
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  )}
                  <div className={styles.cardInfo}>
                    <span className={styles.cardTitle}>{cert.title}</span>
                    <span className={styles.cardSpecialist}>{cert.specialistName}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCertificate && selectedCertificate.image && (
          <motion.div 
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div 
              className={styles.lightboxContent}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button 
                className={styles.closeBtn}
                onClick={() => setSelectedCertificate(null)}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
              
              <div className={`${styles.lightboxImageWrapper} ${selectedCertificate.orientation === 'landscape' ? styles.lightboxImageLandscape : ''}`}>
                <Image
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  fill
                  sizes="(max-width: 800px) 90vw, 600px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              
              <div className={styles.lightboxInfo}>
                <h3>{selectedCertificate.title}</h3>
                <p>{selectedCertificate.specialistName}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CertificatesPage() {
  return (
    <Suspense fallback={<div className={styles.page}><div className="container">Загрузка...</div></div>}>
      <CertificatesContent />
    </Suspense>
  )
}

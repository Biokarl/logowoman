'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './certificates.module.css'

// Заглушки для сертификатов
const certificates = [
  { id: 1, title: 'Диплом о высшем образовании', specialist: 'Яна Орловская' },
  { id: 2, title: 'Сертификат повышения квалификации', specialist: 'Яна Орловская' },
  { id: 3, title: 'Диплом логопеда-дефектолога', specialist: 'Яна Орловская' },
  { id: 4, title: 'Сертификат по нейропсихологии', specialist: 'Марина Козлова' },
  { id: 5, title: 'Диплом детского психолога', specialist: 'Елена Смирнова' },
  { id: 6, title: 'Сертификат по игровой терапии', specialist: 'Елена Смирнова' },
  { id: 7, title: 'Диплом дефектолога', specialist: 'Ольга Иванова' },
  { id: 8, title: 'Сертификат по АВА-терапии', specialist: 'Ольга Иванова' },
  { id: 9, title: 'Диплом логопеда', specialist: 'Анна Петрова' },
  { id: 10, title: 'Сертификат по коррекции дислексии', specialist: 'Анна Петрова' },
  { id: 11, title: 'Сертификат по сенсорной интеграции', specialist: 'Марина Козлова' },
  { id: 12, title: 'Диплом о переподготовке', specialist: 'Яна Орловская' },
]

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null)

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
            Сертификаты
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Дипломы и сертификаты наших специалистов
          </motion.p>
        </div>
      </section>

      <section className={`section ${styles.certificates}`}>
        <div className="container">
          <motion.div 
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                onClick={() => setSelectedCertificate(cert)}
              >
                <div className={styles.imagePlaceholder}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardTitle}>{cert.title}</span>
                  <span className={styles.cardSpecialist}>{cert.specialist}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCertificate && (
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
              
              <div className={styles.lightboxImage}>
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Сертификат</span>
              </div>
              
              <div className={styles.lightboxInfo}>
                <h3>{selectedCertificate.title}</h3>
                <p>{selectedCertificate.specialist}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


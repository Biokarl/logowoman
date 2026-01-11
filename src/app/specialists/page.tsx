'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './specialists.module.css'
import { specialists, YANDEX_REVIEWS_URL } from '@/data/specialists'

// Создаем Map для быстрого поиска специалистов (O(1) вместо O(n))
const specialistsMap = new Map(specialists.map(s => [s.id, s]))

function SpecialistsContent() {
  const searchParams = useSearchParams()
  const [selectedSpecialist, setSelectedSpecialist] = useState<typeof specialists[0] | null>(null)

  useEffect(() => {
    const openId = searchParams.get('open')
    if (openId) {
      const specialist = specialistsMap.get(parseInt(openId))
      if (specialist) {
        setSelectedSpecialist(specialist)
      }
    }
  }, [searchParams])

  // Блокировка скролла при открытии модального окна
  useEffect(() => {
    if (selectedSpecialist) {
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
  }, [selectedSpecialist])

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
            Наши специалисты — Логопеды, дефектологи, нейропсихологи в Краснодаре
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Команда из 11 профессионалов с многолетним опытом работы. Логопеды, дефектологи, нейропсихологи, ABA-тераписты, тренеры АФК.
          </motion.p>
        </div>
      </section>

      <section className={`section ${styles.specialists}`}>
        <div className="container">
          <motion.div 
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {specialists.map((specialist, index) => (
              <motion.div
                key={specialist.id}
                className={`card ${styles.card}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onClick={() => setSelectedSpecialist(specialist)}
              >
                <div className={styles.photoWrapper}>
                  <Image
                    src={specialist.photo}
                    alt={specialist.name}
                    fill
                    className={styles.photo}
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                
                <div className={styles.info}>
                  <h3 className={styles.name}>{specialist.name}</h3>
                  <p className={styles.specialty}>{specialist.specialty}</p>
                  <p className={styles.experience}>{specialist.experience}</p>
                  
                  <button className={styles.detailsBtn}>
                    Подробнее
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedSpecialist && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSpecialist(null)}
          >
            <motion.div 
              className={styles.modal}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeBtn}
                onClick={() => setSelectedSpecialist(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                  <div className={styles.modalPhoto}>
                    <Image
                      src={selectedSpecialist.photo}
                      alt={selectedSpecialist.name}
                      fill
                      className={styles.modalPhotoImg}
                      sizes="150px"
                    />
                  </div>
                  <div className={styles.modalInfo}>
                    <h2 className={styles.modalName}>{selectedSpecialist.name}</h2>
                    <p className={styles.modalSpecialty}>{selectedSpecialist.specialty}</p>
                    <p className={styles.modalExperience}>{selectedSpecialist.experience}</p>
                    
                    <div className={styles.modalActions}>
                      <a 
                        href="https://wa.me/79181391480" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.messageBtn}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Написать в WhatsApp
                      </a>
                      {selectedSpecialist.certificates && selectedSpecialist.certificates.length > 0 && (
                        <Link 
                          href={`/certificates?specialist=${selectedSpecialist.id}`}
                          className={styles.certificatesBtn}
                          onClick={() => setSelectedSpecialist(null)}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                          </svg>
                          Сертификаты ({selectedSpecialist.certificates.length})
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.modalBody}>
                  <div className={styles.modalSection}>
                    <h4>О специалисте</h4>
                    <p>{selectedSpecialist.description}</p>
                  </div>

                  <div className={styles.modalSection}>
                    <h4>Чем может помочь</h4>
                    <ul className={styles.skillsList}>
                      {selectedSpecialist.skills.map((skill, idx) => (
                        <li key={idx}>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="var(--text-active)">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.modalSection}>
                    <h4>Образование</h4>
                    <ul className={styles.educationList}>
                      {selectedSpecialist.education.map((edu, idx) => (
                        <li key={idx}>{edu}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.modalSection}>
                    <a 
                      href={YANDEX_REVIEWS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.leaveReviewBtn}
                    >
                      Оставить отзыв
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SpecialistsPage() {
  return (
    <Suspense fallback={<div className={styles.page}><div className="container">Загрузка...</div></div>}>
      <SpecialistsContent />
    </Suspense>
  )
}

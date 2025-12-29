'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './specialists.module.css'

const specialists = [
  {
    id: 1,
    name: 'Яна Орловская',
    specialty: 'Логопед-дефектолог',
    experience: '12 лет опыта',
    education: ['МГУ им. Ломоносова, факультет психологии', 'Дополнительное образование по нейропсихологии'],
    description: 'Основатель центра Logowoman. Специализируется на работе с детьми с задержкой речевого развития, дизартрией, алалией. Автор методики комплексной речевой коррекции.',
    skills: [
      'Диагностика речевых нарушений',
      'Коррекция звукопроизношения',
      'Работа с ЗРР и алалией',
      'Логопедический массаж',
      'Развитие связной речи'
    ],
    reviewsCount: 156
  },
  {
    id: 2,
    name: 'Елена Смирнова',
    specialty: 'Детский психолог',
    experience: '8 лет опыта',
    education: ['РГГУ, факультет психологии', 'Курсы детской психотерапии'],
    description: 'Специалист по детской психологии. Работает с эмоциональными и поведенческими проблемами, помогает детям адаптироваться к детскому саду и школе.',
    skills: [
      'Психологическая диагностика',
      'Игровая терапия',
      'Работа со страхами',
      'Коррекция поведения',
      'Семейное консультирование'
    ],
    reviewsCount: 98
  },
  {
    id: 3,
    name: 'Марина Козлова',
    specialty: 'Нейропсихолог',
    experience: '10 лет опыта',
    education: ['Санкт-Петербургский государственный университет', 'Специализация по нейропсихологии детского возраста'],
    description: 'Эксперт в области нейропсихологической диагностики и коррекции. Помогает детям с трудностями обучения, СДВГ, нарушениями внимания и памяти.',
    skills: [
      'Нейропсихологическая диагностика',
      'Сенсомоторная коррекция',
      'Работа с СДВГ',
      'Развитие внимания и памяти',
      'Подготовка к школе'
    ],
    reviewsCount: 124
  },
  {
    id: 4,
    name: 'Анна Петрова',
    specialty: 'Логопед',
    experience: '6 лет опыта',
    education: ['Кубанский государственный университет', 'Курсы повышения квалификации по логопедии'],
    description: 'Логопед с опытом работы в детских садах и школах. Специализируется на постановке звуков и развитии фонематического слуха у детей.',
    skills: [
      'Постановка звуков',
      'Развитие фонематического слуха',
      'Обогащение словаря',
      'Подготовка к школе',
      'Работа с дислексией'
    ],
    reviewsCount: 87
  },
  {
    id: 5,
    name: 'Ольга Иванова',
    specialty: 'Дефектолог',
    experience: '9 лет опыта',
    education: ['Московский педагогический университет', 'Специализация по коррекционной педагогике'],
    description: 'Дефектолог с большим опытом работы с детьми с ОВЗ. Специализируется на работе с задержкой психического развития и расстройствами аутистического спектра.',
    skills: [
      'Работа с ЗПР',
      'Коррекция при РАС',
      'Сенсорная интеграция',
      'Развитие познавательных процессов',
      'АВА-терапия'
    ],
    reviewsCount: 112
  },
]

const YANDEX_REVIEWS_URL = 'https://yandex.ru/maps/org/yana_logowoman_korrektsionny_tsentr/143810668969/reviews/?add-review=true&ll=39.010518%2C45.066998&mode=search&sctx=ZAAAAAgBEAAaKAoSCXpwd9ZufUNAEQAce%2FZchEZAEhIJutxgqMMKpz8RgQncupunij8iBgABAgMEBSgKOABAI0gBagJydZ0BzczMPaABAKgBAL0BLIsN78IBBqnTot6XBIICGdGP0L3RiyDQvtGA0LvQvtCy0YHQutC%2B0LmKAgCSAgYxMDgyMTSaAgxkZXNrdG9wLW1hcHM%3D&sll=39.010518%2C45.066998&sspn=0.003322%2C0.000960&tab=reviews&text=яны%20орловской&z=19.72'

export default function SpecialistsPage() {
  const searchParams = useSearchParams()
  const [selectedSpecialist, setSelectedSpecialist] = useState<typeof specialists[0] | null>(null)

  useEffect(() => {
    const openId = searchParams.get('open')
    if (openId) {
      const specialist = specialists.find(s => s.id === parseInt(openId))
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
            Наши специалисты
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Команда профессионалов с многолетним опытом работы
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
                  <div className={styles.photoPlaceholder}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>
                
                <div className={styles.info}>
                  <h3 className={styles.name}>{specialist.name}</h3>
                  <p className={styles.specialty}>{specialist.specialty}</p>
                  <p className={styles.experience}>{specialist.experience}</p>
                  
                  <div className={styles.reviews}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-active)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>{specialist.reviewsCount} отзывов</span>
                  </div>
                  
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
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
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
                    <h4>Отзывы</h4>
                    <div className={styles.reviewsInfo}>
                      <div className={styles.reviewsCount}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--text-active)">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span>{selectedSpecialist.reviewsCount} отзывов</span>
                      </div>
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


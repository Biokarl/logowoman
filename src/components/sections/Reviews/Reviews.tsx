'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import styles from './Reviews.module.css'

import 'swiper/css'

const reviews = [
  { id: 1, src: '/images/reviews/Отзыв_1.jpg' },
  { id: 2, src: '/images/reviews/Отзыв_2.jpg' },
  { id: 3, src: '/images/reviews/Отзыв_3.jpg' },
  { id: 4, src: '/images/reviews/Отзыв_4.jpg' },
  { id: 5, src: '/images/reviews/Отзыв_5.jpg' },
  { id: 6, src: '/images/reviews/Отзыв_6.jpg' },
  { id: 7, src: '/images/reviews/Отзыв_7.jpg' },
  { id: 8, src: '/images/reviews/Отзыв_8.jpg' },
  { id: 9, src: '/images/reviews/Отзыв_9.jpg' },
  { id: 10, src: '/images/reviews/Отзыв_10.jpg' },
  { id: 11, src: '/images/reviews/Отзыв_11.jpg' },
  { id: 12, src: '/images/reviews/Отзыв_12.jpg' },
  { id: 13, src: '/images/reviews/Отзыв_13.jpg' },
  { id: 14, src: '/images/reviews/Отзыв_14.jpg' },
  { id: 15, src: '/images/reviews/Отзыв_15.jpg' },
  { id: 16, src: '/images/reviews/Отзыв_16.jpg' },
]

export default function Reviews() {
  const [selectedReview, setSelectedReview] = useState<typeof reviews[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const openReview = (review: typeof reviews[0], index: number) => {
    setSelectedReview(review)
    setCurrentIndex(index)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
  }

  const closeReview = () => {
    setSelectedReview(null)
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }

  const goToPrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : reviews.length - 1
    setCurrentIndex(newIndex)
    setSelectedReview(reviews[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentIndex < reviews.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setSelectedReview(reviews[newIndex])
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  // Keyboard navigation in modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedReview) return
      if (e.key === 'Escape') closeReview()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedReview, currentIndex])

  return (
    <section className={`section ${styles.reviews}`} id="reviews">
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-title" style={{ marginBottom: 0 }}>
            <h2>Отзывы наших клиентов</h2>
            <p>Реальные истории успеха и благодарности</p>
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
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={false}
            loop={false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              handleSlideChange(swiper)
            }}
            onSlideChange={handleSlideChange}
            breakpoints={{
              500: { slidesPerView: 1.5, spaceBetween: 16 },
              700: { slidesPerView: 2.2, spaceBetween: 20 },
              1000: { slidesPerView: 3, spaceBetween: 24 },
              1200: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className={styles.swiper}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={review.id} className={styles.slide}>
                <div 
                  className={styles.reviewCard}
                  onClick={() => openReview(review, index)}
                >
                  <Image
                    src={review.src}
                    alt={`Отзыв ${review.id}`}
                    fill
                    className={styles.reviewImage}
                    sizes="(max-width: 500px) 80vw, (max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw"
                  />
                  <div className={styles.overlay}>
                    <div className={styles.zoomIcon}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReview}
          >
            <button 
              className={styles.closeBtn}
              onClick={closeReview}
              aria-label="Закрыть"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <button 
              className={`${styles.modalNavBtn} ${styles.modalNavBtnPrev} ${styles.desktopOnly}`}
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              aria-label="Предыдущий отзыв"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <motion.div 
              className={styles.modalContent}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              key={selectedReview.id}
            >
              <div className={styles.modalImageWrapper}>
                <Image
                  src={selectedReview.src}
                  alt={`Отзыв ${selectedReview.id}`}
                  fill
                  className={styles.modalImage}
                  sizes="90vw"
                  priority
                />
              </div>
            </motion.div>

            <button 
              className={`${styles.modalNavBtn} ${styles.modalNavBtnNext} ${styles.desktopOnly}`}
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              aria-label="Следующий отзыв"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            {/* Mobile Navigation */}
            <div className={styles.mobileModalNav} onClick={(e) => e.stopPropagation()}>
              <button 
                className={styles.modalNavBtn}
                onClick={goToPrev}
                aria-label="Предыдущий отзыв"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              
              <div className={styles.modalCounter}>
                {currentIndex + 1} / {reviews.length}
              </div>

              <button 
                className={styles.modalNavBtn}
                onClick={goToNext}
                aria-label="Следующий отзыв"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}


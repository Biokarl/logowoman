'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import styles from './Videos.module.css'

import 'swiper/css'

const videos = [
  {
    id: 1,
    title: 'О нашем центре',
    src: '/videos/video_1.mp4',
  },
  {
    id: 2,
    title: 'Занятие с логопедом',
    src: '/videos/video_2025-12-27_15-37-02.mp4',
  },
  {
    id: 3,
    title: 'Результаты работы',
    src: '/videos/video_2025-12-27_15-50-35.mp4',
  },
  {
    id: 4,
    title: 'Наши методики',
    src: '/videos/video_2025-12-27_15-50-45.mp4',
  },
  {
    id: 5,
    title: 'Отзывы родителей',
    src: '/videos/video_2025-12-27_15-50-51.mp4',
  },
  {
    id: 6,
    title: 'Фрагмент урока',
    src: '/videos/video_2025-12-27_15-50-57.mp4',
  },
]

const VideoCard = ({ video, onClick }: { video: typeof videos[0], onClick: () => void }) => (
  <div 
    className={styles.videoCard}
    onClick={onClick}
  >
    <video
      className={styles.videoPreview}
      src={video.src}
      muted
      playsInline
      preload="metadata"
    />
    
    <div className={styles.overlay}>
      <button className={styles.playBtn} aria-label="Воспроизвести">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      </button>
      <span className={styles.videoTitle}>{video.title}</span>
    </div>
  </div>
)

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const openVideo = (video: typeof videos[0]) => {
    setSelectedVideo(video)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
  }

  const closeVideo = () => {
    setSelectedVideo(null)
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <section className={`section ${styles.videos}`} id="videos">
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-title" style={{ marginBottom: 0 }}>
            <h2>Видео о нас</h2>
            <p>Посмотрите, как проходят занятия в нашем центре</p>
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
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides={true}
            watchSlidesProgress={true}
            grabCursor={true}
            slidesOffsetAfter={0}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              handleSlideChange(swiper)
            }}
            onSlideChange={handleSlideChange}
            breakpoints={{
              700: { slidesPerView: 2, centeredSlides: false, spaceBetween: 24 },
              1000: { slidesPerView: 2.5, centeredSlides: false, spaceBetween: 24 },
              1200: { slidesPerView: 3, centeredSlides: false, spaceBetween: 24, slidesOffsetAfter: 200 },
            }}
            className={styles.swiper}
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id} className={styles.slide}>
                <VideoCard video={video} onClick={() => openVideo(video)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeBtn}
                onClick={closeVideo}
                aria-label="Закрыть"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
              
              <video
                className={styles.modalVideo}
                src={selectedVideo.src}
                controls
                autoPlay
                playsInline
              />
              
              <h3 className={styles.modalTitle}>{selectedVideo.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

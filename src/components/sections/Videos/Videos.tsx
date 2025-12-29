'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Videos.module.css'

const videos = [
  {
    id: 1,
    title: 'О нашем центре',
    src: '/videos/video_2025-12-27_15-37-02.mp4',
  },
  {
    id: 2,
    title: 'Занятие с логопедом',
    src: '/videos/video_2025-12-27_15-50-35.mp4',
  },
  {
    id: 3,
    title: 'Результаты работы',
    src: '/videos/video_2025-12-27_15-50-45.mp4',
  },
  {
    id: 4,
    title: 'Отзывы родителей',
    src: '/videos/video_2025-12-27_15-50-51.mp4',
  },
]

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null)

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

  return (
    <section className={`section ${styles.videos}`} id="videos">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Видео о нас</h2>
          <p>Посмотрите, как проходят занятия в нашем центре</p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {videos.map((video, index) => (
            <div 
              key={video.id} 
              className={`${styles.videoCard} ${index === 0 ? styles.featured : ''}`}
              onClick={() => openVideo(video)}
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
          ))}
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

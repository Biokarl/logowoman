'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FAQ.module.css'

const faqItems = [
  {
    id: 1,
    question: 'С какого возраста можно начинать занятия с логопедом?',
    answer: 'Занятия с логопедом можно начинать с 2-3 лет. В этом возрасте специалист может оценить речевое развитие ребенка и при необходимости начать коррекционную работу. Чем раньше выявлены нарушения, тем эффективнее будет коррекция.'
  },
  {
    id: 2,
    question: 'Как часто нужно посещать занятия?',
    answer: 'Оптимальная частота занятий — 2-3 раза в неделю. Регулярность очень важна для достижения результатов. Также мы даем домашние задания для закрепления навыков между занятиями.'
  },
  {
    id: 3,
    question: 'Сколько длится одно занятие?',
    answer: 'Индивидуальное занятие длится 30-45 минут в зависимости от возраста ребенка и типа коррекции. Для детей младшего возраста занятия короче, чтобы сохранить их внимание и интерес.'
  },
  {
    id: 4,
    question: 'Как быстро будет виден результат?',
    answer: 'Первые результаты обычно заметны через 1-2 месяца регулярных занятий. Полный курс коррекции может занять от 3 месяцев до года в зависимости от сложности нарушения и индивидуальных особенностей ребенка.'
  },
  {
    id: 5,
    question: 'Нужно ли присутствие родителей на занятии?',
    answer: 'На первых занятиях присутствие родителя желательно для комфортной адаптации ребенка. В дальнейшем мы рекомендуем оставлять ребенка одного, но всегда подробно рассказываем о ходе занятия и даем рекомендации.'
  },
  {
    id: 6,
    question: 'Проводите ли вы онлайн-занятия?',
    answer: 'Да, мы проводим онлайн-консультации и занятия для детей старше 4 лет. Однако для максимальной эффективности рекомендуем очные занятия, особенно при серьезных нарушениях речи.'
  },
  {
    id: 7,
    question: 'Как записаться на первичную консультацию?',
    answer: 'Записаться можно через форму на сайте, по телефону или в мессенджерах (Telegram, WhatsApp). На первичной консультации специалист проведет диагностику и составит индивидуальный план коррекции.'
  },
]

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className={`section ${styles.faq}`} id="faq">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Часто задаваемые вопросы</h2>
          <p>Ответы на популярные вопросы о наших услугах</p>
        </motion.div>

        <motion.div 
          className={styles.list}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${styles.item} ${openId === item.id ? styles.itemOpen : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
            >
              <button 
                className={styles.question}
                onClick={() => toggleItem(item.id)}
                aria-expanded={openId === item.id}
              >
                <span>{item.question}</span>
                <svg 
                  className={styles.icon}
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    className={styles.answerWrapper}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className={styles.answer}>
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


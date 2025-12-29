'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Appointment.module.css'

interface FormData {
  name: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
}

export default function Appointment() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона'
    } else if (!/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка отправки')
      }

      setIsSuccess(true)
      setFormData({ name: '', phone: '', message: '' })
      
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Ошибка отправки. Попробуйте позже или позвоните нам.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section className={`section ${styles.appointment}`} id="appointment">
      <div className="container">
        <div className={styles.wrapper}>
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.title}>Запишитесь на консультацию</h2>
            <p className={styles.description}>
              Оставьте заявку, и мы свяжемся с вами в ближайшее время 
              для подбора удобного времени приёма
            </p>
            
            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-active)" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>Бесплатная первичная консультация</span>
              </div>
              <div className={styles.benefit}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-active)" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>Индивидуальный план занятий</span>
              </div>
              <div className={styles.benefit}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-active)" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>Ответим в течение 30 минут</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.formWrapper}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSuccess ? (
              <div className={styles.success}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-active)" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3>Заявка отправлена!</h3>
                <p>Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>ФИО *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder="Введите ваше имя"
                  />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Телефон *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    placeholder="+7 (___) ___-__-__"
                  />
                  {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>О ребёнке (необязательно)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Расскажите кратко о вашем ребёнке и причине обращения"
                    rows={4}
                  />
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Записаться'}
                </button>
                
                <p className={styles.privacy}>
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}


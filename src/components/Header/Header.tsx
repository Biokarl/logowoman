'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.css'
import { services as servicesData } from '@/data/services'

const services = servicesData.map(service => ({
  title: service.title,
  description: service.description.slice(0, 50) + '...',
  href: `/services#${service.id}`
}))

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleServicesMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsServicesOpen(true)
  }

  const handleServicesMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : ''
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <Image 
            src="/images/hero/logo.jpg" 
            alt="Logowoman" 
            width={60} 
            height={60}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>Logowoman</span>
        </Link>

        <nav className={styles.nav}>
          <div 
            className={styles.navItemWithDropdown}
            ref={servicesRef}
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <Link href="/services" className={styles.navLink}>
              Услуги
              <svg className={`${styles.dropdownArrow} ${isServicesOpen ? styles.arrowOpen : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            
            <div className={`${styles.dropdown} ${isServicesOpen ? styles.dropdownOpen : ''}`}>
              {services.map((service) => (
                <Link key={service.href} href={service.href} className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>{service.title}</span>
                  <span className={styles.dropdownDesc}>{service.description}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/specialists" className={styles.navLink}>
            Специалисты
          </Link>
          <Link href="/certificates" className={styles.navLink}>
            Сертификаты
          </Link>
          <Link href="/contacts" className={styles.navLink}>
            Контакты
          </Link>
        </nav>

        <Link href="/#appointment" className={`btn btn-primary ${styles.appointmentBtn}`}>
          Записаться
        </Link>

        <button 
          className={`${styles.burger} ${isMobileMenuOpen ? styles.burgerOpen : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <div className={styles.mobileNavItem}>
            <button 
              className={styles.mobileNavLink}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Услуги
              <svg className={`${styles.dropdownArrow} ${isServicesOpen ? styles.arrowOpen : ''}`} width="16" height="16" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {isServicesOpen && (
              <div className={styles.mobileDropdown}>
                {services.map((service) => (
                  <Link 
                    key={service.href} 
                    href={service.href} 
                    className={styles.mobileDropdownItem}
                    onClick={closeMobileMenu}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/specialists" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            Специалисты
          </Link>
          <Link href="/certificates" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            Сертификаты
          </Link>
          <Link href="/contacts" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            Контакты
          </Link>
          
          <Link 
            href="/#appointment" 
            className={`btn btn-primary ${styles.mobileAppointmentBtn}`}
            onClick={closeMobileMenu}
          >
            Записаться
          </Link>
        </nav>
      </div>
    </header>
  )
}

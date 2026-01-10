'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.css'
import { services as servicesData } from '@/data/services'
import { specialists as specialistsData } from '@/data/specialists'

const services = servicesData.map(service => ({
  title: service.title,
  description: service.description.slice(0, 50) + '...',
  href: `/services#${service.id}`
}))

const specialistsWithCertificates = specialistsData
  .filter(s => s.certificates && s.certificates.length > 0)
  .map(specialist => ({
    id: specialist.id,
    name: specialist.name,
    certificatesCount: specialist.certificates?.length || 0
  }))

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const certificatesRef = useRef<HTMLDivElement>(null)
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const certificatesTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
    }
    setIsServicesOpen(true)
  }

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 150)
  }

  const handleCertificatesMouseEnter = () => {
    if (certificatesTimeoutRef.current) {
      clearTimeout(certificatesTimeoutRef.current)
    }
    setIsCertificatesOpen(true)
  }

  const handleCertificatesMouseLeave = () => {
    certificatesTimeoutRef.current = setTimeout(() => {
      setIsCertificatesOpen(false)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current)
      }
      if (certificatesTimeoutRef.current) {
        clearTimeout(certificatesTimeoutRef.current)
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
    <>
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
            <div 
              className={styles.navItemWithDropdown}
              ref={certificatesRef}
              onMouseEnter={handleCertificatesMouseEnter}
              onMouseLeave={handleCertificatesMouseLeave}
            >
              <Link href="/certificates" className={styles.navLink}>
                Сертификаты
                <svg className={`${styles.dropdownArrow} ${isCertificatesOpen ? styles.arrowOpen : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              
              <div className={`${styles.dropdown} ${isCertificatesOpen ? styles.dropdownOpen : ''}`}>
                {specialistsWithCertificates.map((specialist) => (
                  <Link key={specialist.id} href={`/certificates?specialist=${specialist.id}`} className={styles.dropdownItem}>
                    <span className={styles.dropdownTitle}>{specialist.name}</span>
                    <span className={styles.dropdownDesc}>Сертификатов: {specialist.certificatesCount}</span>
                  </Link>
                ))}
                {specialistsWithCertificates.length === 0 && (
                  <div className={styles.dropdownItem}>
                    <span className={styles.dropdownDesc}>Сертификаты скоро появятся</span>
                  </div>
                )}
              </div>
            </div>
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
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileMenuOverlay}
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
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
          <div className={styles.mobileNavItem}>
            <button 
              className={styles.mobileNavLink}
              onClick={() => setIsCertificatesOpen(!isCertificatesOpen)}
            >
              Сертификаты
              <svg className={`${styles.dropdownArrow} ${isCertificatesOpen ? styles.arrowOpen : ''}`} width="16" height="16" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {isCertificatesOpen && (
              <div className={styles.mobileDropdown}>
                <Link 
                  href="/certificates"
                  className={styles.mobileDropdownItem}
                  onClick={closeMobileMenu}
                >
                  Все сертификаты
                </Link>
                {specialistsWithCertificates.map((specialist) => (
                  <Link 
                    key={specialist.id} 
                    href={`/certificates?specialist=${specialist.id}`} 
                    className={styles.mobileDropdownItem}
                    onClick={closeMobileMenu}
                  >
                    {specialist.name} ({specialist.certificatesCount})
                  </Link>
                ))}
              </div>
            )}
          </div>
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
    </>
  )
}

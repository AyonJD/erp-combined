'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { getMe } from '@/backend/auth/auth'
import { useGlobalContext } from './context/Context'
import LanguageSwitch from './component/LanguageSwitch'

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  }),
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      yoyo: Number.POSITIVE_INFINITY,
    },
  },
}

const WelcomePageContent = () => {
  const router = useRouter()
  const controls = useAnimation()
  const containerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { t, setLoggedInUser } = useGlobalContext()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('erp_authtoken')
      if (!token) {
        router.push('/login')
        return
      }

      try {
        const response = await getMe(token)

        if (response?.status_code === 200) {
          setIsAuthenticated(true)
          setLoggedInUser(response.data)
          setIsLoading(false)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Error validating user:', error)
        router.push('/login')
      }
    }

    if (typeof window !== 'undefined') {
      checkAuth()
    }

    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight}px`
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [router])

  useEffect(() => {
    if (isAuthenticated) {
      controls.start('visible')
    }
  }, [isAuthenticated, controls])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-gray-800 text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative bg-white flex flex-col items-center justify-center overflow-hidden h-screen"
    >
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t.heading}
        </motion.h1>
        <motion.h2
          className="text-2xl md:text-3xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.subheading}
        </motion.h2>
        {/* <motion.h3 className="text-3xl text-center md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          {t.welcome.split('').map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              initial="hidden"
              animate={controls}
              custom={index}
              className="inline-block"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h3> */}
        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {t.description}
        </motion.p>
        <motion.div
          className="mb-8 flex justify-center"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <LanguageSwitch />
        </motion.div>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <button
            onClick={() => router.push('/survey')}
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {t.buttonText}
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default function WelcomePage() {
  return <WelcomePageContent />
}

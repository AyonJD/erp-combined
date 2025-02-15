'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { getMe } from '@/backend/auth/auth'
import { useGlobalContext } from '../context/Context'
import LanguageSwitch from '../component/LanguageSwitch'
import AnimatedIcon from '../component/AnimatedIcon'
import incon1 from '../../assets/icons/biff.jpg'
import incon2 from '../../assets/icons/bun.jpg'
import incon3 from '../../assets/icons/drinks.jpg'
import incon4 from '../../assets/icons/egg.jpg'
import incon5 from '../../assets/icons/hotdog.jpg'
import incon6 from '../../assets/icons/sandwitch.jpg'

const icons = [incon1, incon2, incon3, incon4, incon5, incon6]

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

  const generateEdgePosition = index => {
    if (index < 3) {
      // Top Left: Icons 0, 1, 2
      return {
        bottom: '5%',
        left: `${5 + index * 5}%`, // Horizontally aligned with spacing
        transform: 'translateX(-50%)',
      }
    } else {
      // Bottom Right: Icons 3, 4, 5
      return {
        bottom: '5%',
        right: `${5 + (index - 3) * 5}%`, // Horizontally aligned with spacing
        transform: 'translateX(50%)',
      }
    }
  }

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
      {icons.map((icon, index) => {
        const position = generateEdgePosition(index)
        return (
          <AnimatedIcon
            key={index}
            src={icon}
            alt={`Icon ${index + 1}`}
            {...position}
          />
        )
      })}

      {/* Main content */}
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-[#4A2219] mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t.heading}
        </motion.h1>
        <motion.h2
          className="text-lg md:text-xl text-[#4A2219] mb-8 "
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.subheading}
        </motion.h2>

        <motion.p
          className="text-sm md:text-base text-[#6A4B40] mb-8 px-2 w-full md:w-1/2 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {t.description}
        </motion.p>
        <motion.div
          className="mb-8 flex justify-center flex-col items-center"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-base font-bold mb-2 text-slate-600">
            {t.select_language}
          </p>
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

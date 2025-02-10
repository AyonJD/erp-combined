'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'

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
      delay: 1.5,
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

const StarField = () => {
  const stars = new Array(100).fill(0).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

const Moon = () => {
  return (
    <motion.div
      className="absolute top-8 left-8 w-24 h-24 rounded-full bg-gray-300"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{
        boxShadow:
          'inset -8px -8px 0 0 rgba(0,0,0,0.2), 0 0 20px 5px rgba(255, 255, 255, 0.3)',
        background: 'radial-gradient(circle at 30% 30%, #f0f0f0, #c0c0c0)',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        style={{
          background:
            'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.5), transparent 50%)',
          boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.1)',
        }}
      />
    </motion.div>
  )
}

export default function WelcomePage() {
  const router = useRouter()
  const controls = useAnimation()
  const containerRef = useRef(null)

  useEffect(() => {
    controls.start('visible')

    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight}px`
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [controls])

  const welcomeText = 'Welcome to Our Servey App'

  return (
    <div
      ref={containerRef}
      className="relative bg-gray-900 flex flex-col items-center justify-center overflow-hidden"
    >
      <StarField />
      <Moon />
      <div className="relative z-10 text-center">
        <motion.h1 className="text-4xl text-center md:text-5xl lg:text-6xl font-bold text-white mb-8">
          {welcomeText.split('').map((letter, index) => (
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
        </motion.h1>
        <motion.div
          variants={buttonVariants}
          initial="visible"
          animate="visible"
          whileHover="hover"
        >
          <button
            onClick={() => router.push('/survey')}
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Go to Survey
          </button>
        </motion.div>
      </div>
    </div>
  )
}

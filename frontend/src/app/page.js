'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '../assets/logo.png'

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
      router.push('/onboarding')
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden bg-[#FFFAF1]"
      initial={{ opacity: 1 }}
      animate={{ opacity: showIntro ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ scale: 1.2, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      >
        <div className="w-full h-full bg-[url('/circuit-pattern.svg')] bg-repeat"></div>
      </motion.div>

      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 1,
          type: 'spring',
          stiffness: 100,
        }}
      >
        <Image
          src={logo.src}
          alt="SEL Logo"
          width={200}
          height={200}
          className="mb-6 drop-shadow-2xl"
        />
      </motion.div>

      {/* Animated Underline */}
      {/* <motion.div
        className="h-1 bg-[#B07E5B] my-4 mb-4"
        initial={{ width: 0 }}
        animate={{ width: '40%' }}
        transition={{ duration: 1.5, delay: 2 }}
      /> */}

      {/* Text Animation */}
      <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <h1 className="text-2xl text-primary text-slate-600 font-bold">
          Food Quality Survey
        </h1>
        <h2 className="text-3xl  text-[#B07E5B]"></h2>
      </motion.div>
    </motion.div>
  )
}

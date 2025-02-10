'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PartyPopper, Check, Sparkles, Star, X } from 'lucide-react'

const SuccessPopup2 = ({ isOpen, onClose, onRedirect }) => {
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onRedirect()
      }, 5000) // Show for 5 seconds before redirecting

      return () => clearTimeout(timer)
    }
  }, [isOpen, onRedirect])

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const modalVariants = {
    hidden: { 
      scale: 0.5, 
      opacity: 0,
      rotateY: 90
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    },
    exit: { 
      scale: 0.8,
      opacity: 0,
      rotateY: -90,
      transition: {
        duration: 0.3
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.4
      }
    }
  }

  const Particle = ({ delay }) => (
    <motion.div
      className="absolute w-2 h-2 bg-yellow-300 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, Math.random() * 200 - 100],
        y: [0, Math.random() * 200 - 100],
      }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Infinity,
        repeatType: 'loop'
      }}
    />
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4 backdrop-blur-sm"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-xl max-w-md w-full relative overflow-hidden p-8 text-white"
          >
            {/* Confetti Icon with animation */}
            <motion.div 
              className="absolute top-4 right-4"
              initial={{ rotate: -45, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <PartyPopper className="w-12 h-12 text-yellow-400" />
            </motion.div>

            {/* Success Icon */}
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <Check className="w-16 h-16 text-green-500" />
              </div>
            </motion.div>

            {/* Content with staggered animation */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="text-center space-y-4"
            >
              <motion.h2 
                className="text-3xl font-bold"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Fantastic Job!
              </motion.h2>
              <motion.p 
                className="text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Your survey has been submitted successfully. Your input is invaluable to us!
              </motion.p>
              <motion.div
                className="flex justify-center space-x-2 my-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(star)}
                  >
                    <Star className="w-8 h-8" fill={rating >= star ? 'currentColor' : 'none'} />
                  </motion.button>
                ))}
              </motion.div>
              <motion.p 
                className="text-green-300 font-medium"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Response recorded successfully
              </motion.p>
            </motion.div>

            {/* Close button */}
            <motion.button
              className="absolute top-2 right-2 text-white hover:text-gray-200"
              onClick={onClose}
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Sparkles effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[...Array(20)].map((_, i) => (
                <Particle key={i} delay={i * 0.1} />
              ))}
            </motion.div>

            {/* Pulsing border effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-white opacity-50"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SuccessPopup2


'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Sparkles, Star, Check, X, Triangle, Square, Circle } from 'lucide-react'

const CreativePopup3 = ({ isOpen, onClose }) => {
  const [currentShape, setCurrentShape] = useState(0)
  const [rating, setRating] = useState(0)
  const audioRef = useRef(null)
  const controls = useAnimation()

  const shapes = [Circle, Triangle, Square]
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1']

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentShape((prev) => (prev + 1) % shapes.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 360, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      })
    }
  }, [isOpen, controls])

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  const Particle = ({ color }) => (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, Math.random() * 200 - 100],
        y: [0, Math.random() * 200 - 100],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop'
      }}
    />
  )

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0,
      rotate: -180
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0,
      scale: 0,
      rotate: 180,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-filter backdrop-blur-lg"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-80 h-80 bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: colors[currentShape] }}
          >
            <motion.div
              animate={controls}
              className="absolute inset-0 flex items-center justify-center"
            >
              {React.createElement(shapes[currentShape], { 
                className: "w-40 h-40 text-white", 
                strokeWidth: 3 
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-x-0 bottom-0 p-6 bg-white bg-opacity-80 backdrop-filter backdrop-blur-md"
            >
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Amazing!</h2>
              <p className="text-gray-600 mb-4">Your feedback shapes our future.</p>
              
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setRating(star)
                      playSound()
                    }}
                  >
                    <Star 
                      className={`w-8 h-8 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill={rating >= star ? 'currentColor' : 'none'}
                    />
                  </motion.button>
                ))}
              </div>

              <motion.button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                Close
              </motion.button>
            </motion.div>

            <motion.button
              className="absolute top-2 right-2 text-white"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {[...Array(20)].map((_, i) => (
              <Particle key={i} color={colors[(i + currentShape) % colors.length]} />
            ))}
          </motion.div>

          <audio ref={audioRef}>
            <source src="/pop-sound.mp3" type="audio/mpeg" />
          </audio>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CreativePopup3


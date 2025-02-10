'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Star, Award, ThumbsUp } from 'lucide-react'

const SuccessPopup5 = ({ isOpen, onClose, onRedirect }) => {
  const [showAward, setShowAward] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowAward(true)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: 'spring',
        stiffness: 120
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: { duration: 0.3 }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }
  }

  const starVariants = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { delay: 0.5, type: 'spring', stiffness: 200 } }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg p-8 max-w-md w-full mx-4 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-2 bg-yellow-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />

            <motion.div
              className="text-center text-white"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex justify-center mb-6" variants={starVariants} initial="initial" animate="animate">
                <Star className="text-yellow-400 w-16 h-16" />
              </motion.div>

              <h2 className="text-3xl font-bold mb-4">Fantastic Job!</h2>
              <p className="text-lg mb-6">Your feedback is incredibly valuable to us. Thank you for taking the time to complete our survey!</p>

              <AnimatePresence>
                {showAward && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="mb-6"
                  >
                    <Award className="text-yellow-400 w-24 h-24 mx-auto" />
                    <p className="text-xl font-semibold mt-2">You've earned our appreciation badge!</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out transform hover:shadow-lg"
                  onClick={onRedirect}
                >
                  Continue
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out transform hover:bg-white hover:text-purple-600"
                  onClick={onClose}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-4 right-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <ThumbsUp className="text-white w-8 h-8" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SuccessPopup5


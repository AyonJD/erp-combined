

import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper } from 'lucide-react';
import { useEffect } from 'react';

const SuccessPopup1 = ({ isOpen, onClose, onRedirect }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onRedirect();
      }, 2000); // Show for 2 seconds before redirecting

      return () => clearTimeout(timer);
    }
  }, [isOpen, onRedirect]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { 
      scale: 0.5, 
      opacity: 0,
      y: 100
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }
    },
    exit: { 
      scale: 0.8,
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.2
      }
    }
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    }
  };

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
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-3xl shadow-xl max-w-md w-full relative overflow-hidden p-8"
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
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <motion.svg 
                  viewBox="0 0 24 24" 
                  className="w-10 h-10 text-green-500"
                >
                  <motion.path 
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={checkmarkVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </motion.svg>
              </div>
            </div>

            {/* Content with staggered animation */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="text-center space-y-4"
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                Thank You!
              </h2>
              <p className="text-gray-600">
                Your survey has been submitted successfully. We appreciate your valuable feedback!
              </p>
              <p className="text-green-500 font-medium">
                Response recorded successfully
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessPopup1;



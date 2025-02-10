'use client'
import { motion } from 'framer-motion'
import { useGlobalContext } from '../context/Context'

const LanguageSwitch = () => {
  const { language, setLanguage, t } = useGlobalContext()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en')
    if (typeof window !== 'undefined') {
      localStorage.setItem('erp_language', language === 'en' ? 'bn' : 'en')
    }
  }

  return (
    <motion.div
      className="relative w-24 h-12 bg-gray-200 rounded-full p-1 cursor-pointer shadow-inner"
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1 left-1 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-sm font-medium"
        animate={{
          x: language === 'en' ? 0 : 50,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: language === 'en' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          EN
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: language === 'en' ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{ position: 'absolute' }}
        >
          BN
        </motion.span>
      </motion.div>
      <div className="flex justify-between items-center h-full px-3">
        <span
          className={`text-xs font-semibold ${
            language === 'en' ? 'text-gray-800' : 'text-gray-500'
          }`}
        >
          EN
        </span>
        <span
          className={`text-xs font-semibold ${
            language === 'bn' ? 'text-gray-800' : 'text-gray-500'
          }`}
        >
          BN
        </span>
      </div>
    </motion.div>
  )
}

export default LanguageSwitch

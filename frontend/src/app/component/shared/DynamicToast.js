import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const colors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
}

const DynamicToast = ({ visible, message, type = 'success' }) => {
  const Icon = icons[type]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3"
        >
          <Icon className={colors[type]} />
          <p className="text-gray-800 font-semibold">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DynamicToast

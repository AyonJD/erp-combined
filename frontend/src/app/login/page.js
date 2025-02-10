'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import pageBg from '../../assets/pageOneBg.jpg'
import { loginApi } from '@/backend/auth/auth'
import DynamicToast from '../component/shared/DynamicToast'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await loginApi({ identifier, password })
      localStorage.setItem('erp_authtoken', response.data.access_token)

      toast.custom(
        t => (
          <DynamicToast
            visible={t.visible}
            message="Login successful!"
            type="success"
          />
        ),
        {
          duration: 3000,
        }
      )

      router.push('/survey')
    } catch (error) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <Image
        src={pageBg.src || '/placeholder.svg'}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-md bg-white/30 p-8 rounded-xl shadow-2xl">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-6 text-center text-white"
          >
            Login
          </motion.h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Email / Phone / Member Serial Number"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-white/50 border border-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-white/50 border border-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin inline-block mr-2" />
                ) : null}
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </motion.div>
          </form>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

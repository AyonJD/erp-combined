import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google'
import './globals.css'
import { ContextProvider } from './context/Context'
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Food Quality Survey System',
  description: 'Welcome to our Food Quality Survey System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  )
}

'use client'

import React from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'

const AnimatedIcon = ({ src, alt, ...position }) => {
  return (
    <motion.div
      className="absolute"
      style={position}
      animate={{
        y: ['0%', '18%', '0%'],
      }}
      transition={{
        duration: 4,
        ease: 'easeInOut',
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      <Image src={src} alt={alt} width={60} height={60} />
    </motion.div>
  )
}

export default AnimatedIcon

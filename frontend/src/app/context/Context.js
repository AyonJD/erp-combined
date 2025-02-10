'use client'

import React from 'react'
import { createContext, useState, useContext } from 'react'
import { en } from '../languages/en'
import { bn } from '../languages/bn'

const Context = createContext(null)

export const ContextProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')
  const [loggedInUser, setLoggedInUser] = useState(null)

  // Add more global states as needed
  const globalState = {
    language,
    setLanguage,
    t: language === 'en' ? en : bn,
    loggedInUser,
    setLoggedInUser,
  }

  return <Context.Provider value={globalState}>{children}</Context.Provider>
}

// Custom hook to use global context
export const useGlobalContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useGlobalContext must be used within a ContextProvider')
  }
  return context
}

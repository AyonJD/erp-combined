"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, Rocket } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

const SuccessPopup4 = ({ isOpen, onRedirect }) => {
  const [showContent, setShowContent] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => {
        if (step < 2) {
          setStep(step + 1);
        } else {
          onRedirect();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showContent, step, onRedirect]);

  const StarField = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * window.innerWidth],
            y: [0, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );

  const Nebula = () => (
    <motion.div
      className="absolute inset-0 bg-gradient-radial from-purple-500 via-pink-500 to-transparent opacity-30"
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: 1.5, rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
  );

  const steps = [
    {
      icon: Rocket,
      title: "Cosmic Success!",
      description: "Your feedback has reached the stars!",
    },
    {
      icon: Star,
      title: "Stellar Rating",
      description: "Your input shines brighter than a supernova!",
    },
    {
      icon: Sparkles,
      title: "Galactic Impact",
      description: "Your insights will shape the universe of our service!",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
        >
          <StarField />
          <Nebula />

          <motion.div
            className="relative bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl shadow-2xl overflow-hidden w-96 h-96"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
          >
            <motion.div
              className="absolute inset-0 bg-blue-500 opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative h-full flex flex-col items-center justify-center p-8 text-white">
              <AnimatePresence mode="wait">
                {showContent && (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      {React.createElement(steps[step].icon, {
                        className: "w-20 h-20 text-yellow-300 mx-auto mb-4",
                      })}
                    </motion.div>

                    <motion.h2
                      className="text-3xl font-bold mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 100 }}
                    >
                      {steps[step].title}
                    </motion.h2>
                    <motion.p
                      className="text-lg mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {steps[step].description}
                    </motion.p>
                    <motion.div
                      className="flex justify-center space-x-2 mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      {[1, 2, 3].map((dot) => (
                        <motion.div
                          key={dot}
                          className={`w-3 h-3 rounded-full ${
                            dot - 1 === step ? "bg-yellow-300" : "bg-gray-400"
                          }`}
                          animate={{
                            scale: dot - 1 === step ? [1, 1.2, 1] : 1,
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                      ))}
                    </motion.div>
                    <motion.button
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (step < 2) {
                          setStep(step + 1);
                        } else {
                          onRedirect();
                        }
                      }}
                    >
                      <span className="flex items-center justify-center">
                        {step < 2 ? (
                          <>
                            Next <ChevronRight className="w-5 h-5 ml-2" />
                          </>
                        ) : (
                          <>
                            Close
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-blue-600 to-transparent"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessPopup4;


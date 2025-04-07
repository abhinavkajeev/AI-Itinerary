import React from 'react';
import { motion } from 'framer-motion';

function CtaSection({ onStartPlanningClick }) {
  // Animation variants
  const cloudAnimation = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const contentAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.4, duration: 0.6 }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.6 + (i * 0.1), duration: 0.5 }
    })
  };

  return (
    <section id="cta" className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto text-center">
        <motion.div
          className="relative mx-auto max-w-3xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={cloudAnimation}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          {/* Main cloud shape with animation - lowered z-index */}
          <motion.div 
            className="absolute inset-0 bg-blue-400 rounded-full blur-md"
            animate={{ 
              background: ['#60a5fa', '#3b82f6', '#2563eb', '#3b82f6', '#60a5fa'],
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
          ></motion.div>
          
          {/* Cloud bumps with subtle animations - all reduced z-index */}
          <motion.div 
            className="absolute -top-12 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-md"
            animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
          ></motion.div>
          <motion.div 
            className="absolute -top-8 left-1/2 w-40 h-40 bg-blue-400 rounded-full blur-md"
            animate={{ y: [0, -12, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", delay: 1 }}
          ></motion.div>
          <motion.div 
            className="absolute -top-10 right-1/4 w-36 h-36 bg-blue-400 rounded-full blur-md"
            animate={{ y: [0, -10, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", delay: 2 }}
          ></motion.div>
          <motion.div 
            className="absolute -bottom-6 left-10 w-28 h-28 bg-blue-400 rounded-full blur-md"
            animate={{ y: [0, 8, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", delay: 0.5 }}  
          ></motion.div>
          <motion.div 
            className="absolute -bottom-8 right-16 w-32 h-32 bg-blue-400 rounded-full blur-md"
            animate={{ y: [0, 10, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", delay: 1.5 }}
          ></motion.div>
          
          {/* Card with enhanced hover effects - increased z-index */}
          <motion.div 
            className="relative bg-blue-500 z-10 rounded-3xl px-6 py-16 shadow-xl"
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.35)",
              background: "linear-gradient(225deg, #3b82f6 0%, #1d4ed8 100%)",
              transition: { duration: 0.5 }
            }}
          >
            {/* Sparkling effects on card hover */}
            <motion.div 
              className="absolute inset-0 z-20 opacity-0"
              whileHover={{ opacity: 1 }}
            >
              {[...Array(12)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 30],
                    y: [0, (Math.random() - 0.5) * 30],
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </motion.div>
            
            {/* Content - increased z-index to ensure visibility */}
            <motion.div 
              className="text-white relative z-20"
              variants={contentAnimation}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                custom={0}
                variants={textVariants}
              >
                Ready to Transform Your Travel Experience?
              </motion.h2>
              
              <motion.p 
                className="text-xl max-w-2xl mx-auto mb-10"
                custom={1}
                variants={textVariants}
              >
                Join thousands of travelers who have discovered the perfect way to plan their trips.
              </motion.p>
              
              {/* Button with enhanced hover and click effects */}
              <motion.div className="relative inline-block">
                {/* Button glow effect */}
                <motion.div
                  className="absolute inset-0 bg-white rounded-full blur-lg opacity-0"
                  whileHover={{ opacity: 0.4, scale: 1.2 }}
                  whileTap={{ scale: 0.9, opacity: 0.6 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
                
                <motion.button 
                  className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold shadow-lg relative overflow-hidden"
                  onClick={onStartPlanningClick}
                  whileHover={{ 
                    scale: 1.05,
                    color: "#0284c7",
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Animated gradient overlay */}
                  <motion.span 
                    className="absolute inset-0 opacity-0 bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-size-200"
                    whileHover={{ 
                      opacity: 0.6,
                      backgroundPosition: ["0% 0%", "100% 0%"],
                      transition: {
                        backgroundPosition: {
                          repeat: Infinity,
                          repeatType: "mirror",
                          duration: 1.5
                        }
                      }
                    }}
                  ></motion.span>
                  
                  {/* Button text with animation */}
                  <motion.span className="relative z-20 inline-flex items-center">
                    <span>Start Planning Now</span>
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2, repeatType: "mirror" }}
                    >→</motion.span>
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced decorative small clouds */}
      <motion.div 
        className="absolute top-12 left-16 w-24 h-12 bg-blue-200 rounded-full blur-md opacity-60"
        animate={{ x: [0, 20, 0], y: [0, -10, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-16 right-20 w-32 h-16 bg-blue-200 rounded-full blur-md opacity-60"
        animate={{ x: [0, -25, 0], y: [0, 15, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut", delay: 2 }}
      ></motion.div>
      <motion.div 
        className="absolute top-32 right-24 w-20 h-10 bg-blue-200 rounded-full blur-md opacity-50"
        animate={{ x: [0, -15, 0], y: [0, -12, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-32 left-32 w-16 h-8 bg-blue-200 rounded-full blur-md opacity-50"
        animate={{ x: [0, 18, 0], y: [0, 8, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 3 }}
      ></motion.div>
    </section>
  );
}

export default CtaSection;
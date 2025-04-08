import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

function Hero({ onPlanTripClick }) {
  const vantaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    // Adjust Vanta effect settings based on device size
    const vantaEffect = CLOUDS({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      backgroundColor: 0x1a365d, 
      cloudColor: 0x3b82f6, 
      cloudShadowColor: 0x000000,
      speed: isMobile ? 0.7 : 1, // Slower on mobile
      zoom: isMobile ? 1 : 0.8   // More zoomed in on mobile for better visibility
    });
    
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [isMobile]);

  // Split headline and description into words for animation
  const headlineWords = "Your AI Travel Companion".split(" ");
  const descriptionWords = "Create personalized travel itineraries in seconds with our AI-powered platform.".split(" ");
  
  return (
    <header 
      ref={vantaRef} 
      className="relative overflow-hidden h-screen flex items-center justify-center"
    >
      <div className="container mx-auto text-center relative z-10 px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white flex flex-wrap justify-center gap-x-2 gap-y-1 mb-4 md:mb-6">
            {headlineWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ y: isMobile ? 20 : 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring", 
                  stiffness: isMobile ? 200 : 300,
                  damping: 10
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-8 md:mb-12 flex flex-wrap justify-center gap-x-1 gap-y-0.5">
            {descriptionWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: headlineWords.length * 0.1 + index * 0.05,
                  duration: 0.3
                }}
              >
                {word}
              </motion.span>
            ))}
          </p>
        </motion.div>
        
        <motion.div
          className="inline-block relative"
          whileHover="hover"
          whileTap="tap"
        >
          {/* Mobile-friendly touch feedback */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            variants={{
              hover: { opacity: 1 },
              tap: { opacity: 1 }
            }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#9D7CE0', '#9D7CE0', '#9D7CE0', '#7765E3', '#9D7CE0'][i % 5],
                }}
                variants={{
                  hover: {
                    x: Math.random() * 150 - 50,
                    y: Math.random() * 150 - 50,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    transition: { 
                      duration: 1 + Math.random(),
                      repeat: Infinity,
                      repeatType: "loop", 
                      repeatDelay: Math.random() * 0.5
                    }
                  },
                  tap: {
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                    transition: { 
                      duration: 0.8 + Math.random() * 0.4,
                      repeat: 1,
                      repeatType: "reverse"
                    }
                  }
                }}
              />
            ))}
          </motion.div>

          <motion.button 
            className="relative bg-white text-indigo-600 px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-xl text-base md:text-lg font-medium shadow-lg z-10 overflow-hidden"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: descriptionWords.length * 0.05 + 0.3, 
              duration: 0.4 
            }}
            variants={{
              hover: { 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255, 61, 113, 0.6)",
                transition: { 
                  duration: 0.3,
                  boxShadow: { duration: 0.2 }
                }
              },
              tap: {
                scale: 0.95,
                boxShadow: "0 0 15px rgba(255, 61, 113, 0.8)",
                transition: { duration: 0.1 }
              }
            }}
            onClick={onPlanTripClick}
          >
            {/* Rainbow border effect */}
            <motion.span 
              className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
              style={{ 
                background: "linear-gradient(90deg, #ff3d71, #0095ff, #00e096, #ffaa00, #f248ff, #ff3d71)",
                backgroundSize: "400% 100%"
              }}
              variants={{
                hover: {
                  opacity: 1,
                  backgroundPosition: ["0% 0%", "100% 0%"],
                  transition: {
                    backgroundPosition: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 3,
                      ease: "linear"
                    }
                  }
                },
                tap: {
                  opacity: 1,
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }
              }}
            />
            
            {/* Inner content with color changing background */}
            <motion.span 
              className="absolute inset-0.5 bg-white rounded-lg" 
              variants={{
                hover: { 
                  backgroundColor: "#FF6F61",
                  transition: { duration: 0.2 }
                },
                tap: {
                  backgroundColor: "#FF8F80",
                  transition: { duration: 0.1 }
                }
              }}
            />
            
            {/* Text content */}
            <motion.span className="relative flex items-center justify-center gap-2 z-10">
              <motion.span
                variants={{
                  hover: { 
                    color: "#ffffff",
                    textShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
                    transition: { duration: 0.2 }
                  },
                  tap: {
                    color: "#ffffff",
                    textShadow: "0 0 12px rgba(255, 255, 255, 0.7)",
                    transition: { duration: 0.1 }
                  }
                }}
              >
                Plan Your Trip
              </motion.span>
              <motion.span
                variants={{
                  hover: {
                    color: "#ffffff",
                    x: [0, 10, 0],
                    transition: {
                      color: { duration: 0.2 },
                      x: {
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut"
                      }
                    }
                  },
                  tap: {
                    color: "#ffffff",
                    x: 15,
                    scale: 1.2,
                    transition: { duration: 0.2 }
                  }
                }}
              >
                →
              </motion.span>
            </motion.span>
          </motion.button>
        </motion.div>
        
        {/* Mobile-specific swipe indicator */}
       
      </div>
    </header>
  );
}

export default Hero;
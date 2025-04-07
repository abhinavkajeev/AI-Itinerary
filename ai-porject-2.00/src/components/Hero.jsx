import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

function Hero({ onPlanTripClick }) {
  const vantaRef = useRef(null);
  
  useEffect(() => {
    const vantaEffect = CLOUDS({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      backgroundColor: 0x1a365d, // Deep blue background color
      cloudColor: 0x3b82f6, // Blue cloud color
      cloudShadowColor: 0x000000,
      speed: 1,
      zoom: 0.8
    });
    
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  // Split headline and description into words for animation
  const headlineWords = "Your AI Travel Companion".split(" ");
  const descriptionWords = "Create personalized travel itineraries in seconds with our AI-powered platform.".split(" ");
  
  return (
    <header ref={vantaRef} className="relative pt-20 pb-28 px-4 overflow-hidden h-screen">
      <div className="container pt-50 mx-auto text-center relative z-10">
      <h1 className="text-5xl md:text-6xl font-bold text-white flex flex-wrap justify-center gap-x-4 mb-6">
  {headlineWords.map((word, index) => (
    <motion.span
      key={index}
      className="inline-block"
      transition={{ type: "spring", stiffness: 300 }}
    >
      {word}
    </motion.span>
  ))}
</h1>

<p className="text-xl text-gray-200 max-w-2xl mx-auto mb-12 flex flex-wrap justify-center gap-x-2">
  {descriptionWords.map((word, index) => (
    <motion.span
      key={index}
      className="inline-block"
      transition={{ type: "spring", stiffness: 400 }}
    >
      {word}
    </motion.span>
  ))}
</p>
        
        <motion.div
          className="inline-block relative"
          whileHover="hover"
        >
          {/* Colorful particles that appear on hover */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            variants={{
              hover: {
                opacity: 1,
              }
            }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
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
                  }
                }}
              />
            ))}
          </motion.div>

          <motion.button 
            className="relative bg-white text-indigo-600 px-10 py-4 rounded-xl text-lg font-medium shadow-lg z-10 overflow-hidden"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            variants={{
              hover: { 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255, 61, 113, 0.6)",
                transition: { 
                  duration: 0.3,
                  boxShadow: { duration: 0.2 }
                }
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
                }
              }}
            />
            
            {/* Inner content with color changing background */}
            <motion.span className="absolute inset-0.5 bg-white rounded-lg" 
              variants={{
                hover: { 
                  backgroundColor: "#FF6F61", // Bright hot pink background on hover
                  transition: { duration: 0.2 }
                }
              }}
            />
            
            {/* Text content */}
            <motion.span className="relative flex items-center justify-center gap-2 z-10">
              <motion.span
                variants={{
                  hover: { 
                    color: "#ffffff", // Bright white text on hover
                    textShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
                    transition: { duration: 0.2 }
                  }
                }}
              >
                Plan Your Trip
              </motion.span>
              <motion.span
                variants={{
                  hover: {
                    color: "#ffffff", // Bright white arrow on hover
                    x: [0, 10, 0],
                    transition: {
                      color: { duration: 0.2 },
                      x: {
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut"
                      }
                    }
                  }
                }}
              >
                →
              </motion.span>
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </header>
  );
}

export default Hero;
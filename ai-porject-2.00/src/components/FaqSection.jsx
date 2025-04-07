import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

function FaqSection() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Enhanced card hover animation (same as CTA section)
  const cardHoverAnimation = {
    rest: { 
      y: 0,
      boxShadow: "0px 4px 10px -2px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: { 
      y: -15,
      boxShadow: "0px 20px 40px -10px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Glow effect animation (same as CTA section)
  const glowAnimation = {
    rest: { opacity: 0 },
    hover: { 
      opacity: 0.4,
      transition: { duration: 0.3 }
    }
  };

  // FAQ data
  const faqItems = [
    { 
      question: "How does the AI create personalized itineraries?", 
      answer: "Our AI analyzes your preferences, travel dates, budget constraints, and interests to generate a custom itinerary that matches your unique travel style." 
    },
    { 
      question: "Can I modify the generated itineraries?", 
      answer: "Absolutely! All itineraries are fully customizable. You can add, remove, or rearrange activities to make the plan perfect for you." 
    },
    { 
      question: "Is there a mobile app available?", 
      answer: "We're currently developing mobile apps for iOS and Android. For now, our web application is fully responsive and works great on mobile devices." 
    },
    { 
      question: "How accurate are the time estimates?", 
      answer: "Our AI considers factors like travel distances, typical visit durations, and even time of year to provide realistic timing estimates for your activities." 
    }
  ];

  // Internal FaqItem component with expanded/collapsed state
  const FaqItem = ({ item, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <motion.div 
        className="relative overflow-hidden rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ delay: index * 0.1 }}
      >
        {/* Card container with hover animations */}
        <motion.div 
          className="relative"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          {/* Glow effect on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-xl blur-lg -z-10"
            variants={glowAnimation}
          ></motion.div>
          
          {/* Card with hover animation */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden"
            variants={cardHoverAnimation}
          >
            <div 
              className="p-6 cursor-pointer flex justify-between items-center"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <motion.h3 
                className="text-xl font-bold text-indigo-900 pr-4"
                variants={{
                  hover: { scale: 1.02, transition: { duration: 0.2 } }
                }}
              >
                {item.question}
              </motion.h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isExpanded ? 
                  <ChevronUp className="text-indigo-600 h-5 w-5" /> : 
                  <ChevronDown className="text-indigo-600 h-5 w-5" />
                }
              </motion.div>
            </div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };
  return (
    <section id="faq" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our AI-powered travel planning
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqItems.map((item, index) => (
            <FaqItem 
              key={index} 
              item={item} 
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FaqSection;
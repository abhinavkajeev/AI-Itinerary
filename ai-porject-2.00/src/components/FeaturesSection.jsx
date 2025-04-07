import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Map, PlaneTakeoff, Hotel, Utensils } from 'lucide-react';

// FeatureCard component with enhanced animations
function FeatureCard({ feature, index, fadeIn }) {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0px 10px 25px rgba(79, 70, 229, 0.15)",
        y: -5
      }}
    >
      {/* Animated background shape on hover */}
      <motion.div 
        className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-indigo-100 z-0"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <motion.div 
        className="relative z-10"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="mb-4 inline-block bg-indigo-100 p-3 rounded-lg"
          whileHover={{ 
            rotate: [0, -10, 10, -5, 0],
            transition: { duration: 0.5 }
          }}
        >
          {React.cloneElement(feature.icon, { 
            className: "h-8 w-8 text-indigo-600" 
          })}
        </motion.div>
        
        <h3 className="text-xl font-bold text-indigo-900 mb-2">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
      </motion.div>
    </motion.div>
  );
}

// Main FeaturesSection component with staggered animations
function FeaturesSection() {
  // Enhanced animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const fadeIn = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const features = [
    { icon: <Calendar className="h-8 w-8 text-indigo-600" />, title: "Personalized Itineraries", description: "Get custom plans based on your preferences, budget, and travel style." },
    { icon: <Clock className="h-8 w-8 text-indigo-600" />, title: "Save Time Planning", description: "Create complete itineraries in seconds instead of hours of research." },
    { icon: <Map className="h-8 w-8 text-indigo-600" />, title: "Local Insights", description: "Discover hidden gems and authentic experiences recommended by our AI." },
    { icon: <PlaneTakeoff className="h-8 w-8 text-indigo-600" />, title: "Smart Logistics", description: "Optimize your daily schedule with efficient routing between attractions." },
    { icon: <Hotel className="h-8 w-8 text-indigo-600" />, title: "Accommodation Matching", description: "Find places to stay that match your style and budget requirements." },
    { icon: <Utensils className="h-8 w-8 text-indigo-600" />, title: "Dining Recommendations", description: "Discover restaurants tailored to your culinary preferences." }
  ];

  return (
    <section id="features" className="py-16 px-4 bg-indigo-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6,
            type: "spring"
          }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-4"
            whileInView={{ 
              scale: [0.9, 1.05, 1],
              opacity: [0, 1]
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose GoGenie?
          </motion.h2>
          
          <motion.p
            className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Our AI-powered platform makes travel planning effortless and personalized
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              feature={feature}
              index={index}
              fadeIn={fadeIn}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
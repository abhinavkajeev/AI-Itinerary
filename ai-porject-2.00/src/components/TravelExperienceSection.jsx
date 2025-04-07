import React, { useState } from 'react';
import { motion } from 'framer-motion';
import img2 from '/immg.png'; // Adjust the import path as needed
// Import images - adjust paths as needed for your project structure
import parisImg from '/image.png';
import tokyoImg from '/download.jpg';
import newYorkImg from '/img.2.jpg';

// Define animation variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } }
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

function DestinationCard({ city, image, index, onPlanTripClick }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInVariant}
      transition={{ delay: index * 0.15 }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
        transition: { type: "spring", stiffness: 300, damping: 15 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="h-56 bg-gray-200 relative overflow-hidden">
        <motion.img 
          src={image} 
          alt={city} 
          className="w-full h-full object-cover" 
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            transition: { duration: 0.5 }
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
          animate={{ 
            opacity: isHovered ? 0.9 : 0.6,
            transition: { duration: 0.3 }
          }}
        />
        <motion.h3 
          className="absolute bottom-4 left-4 text-white text-2xl font-bold"
          animate={{ 
            y: isHovered ? -5 : 0,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          {city}
        </motion.h3>
      </div>
      
      <div className="p-5">
        <p className="text-gray-600">Experience the charm and beauty of {city} with our AI-curated itineraries.</p>
        <motion.button
          className="mt-4 flex items-center text-indigo-600 font-medium relative overflow-hidden group"
          onClick={() => onPlanTripClick(city)}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span>Plan your {city} trip</span>
          <motion.span
            className="ml-1 inline-block"
            animate={{ 
              x: isHovered ? 5 : 0,
              transition: { repeat: isHovered ? Infinity : 0, repeatType: "reverse", duration: 0.6 }  
            }}
          >
            →
          </motion.span>
          <motion.div 
            className="absolute bottom-0 left-0 h-0.5 bg-indigo-600 w-0"
            animate={{ 
              width: isHovered ? "100%" : "0%"
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
      
      <motion.div 
        className="absolute -bottom-2 -right-2 w-12 h-12 bg-indigo-100 rounded-full z-0"
        initial={{ scale: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 0,
          transition: { type: "spring", stiffness: 300 }
        }}
      />
    </motion.div>
  );
}

function TravelExperienceSection({ onPlanTripClick, onTryItClick }) {
  const [demoHovered, setDemoHovered] = useState(false);
  
  // Destinations data
  const destinations = [
    { city: "Paris", image: parisImg, index: 0 },
    { city: "Tokyo", image: tokyoImg, index: 1 },
    { city: "New York", image: newYorkImg, index: 2 }
  ];

  return (
    <div>
      {/* Destinations Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto" id="destinations">
        <motion.div
          className="text-center mb-16"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="inline-block mb-4 relative"
            variants={fadeInVariant}
          >
           <motion.h2
  className="text-3xl md:text-4xl font-bold text-indigo-900 relative z-10"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Popular{" "}
  <motion.span
    className="text-indigo-600"
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
  >
    Destinations
  </motion.span>
</motion.h2>
          
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={fadeInVariant}
          >
            Discover our most popular travel destinations, complete with AI-powered itineraries tailored to your preferences.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.city}
              city={destination.city}
              image={destination.image}
              index={destination.index}
              onPlanTripClick={onPlanTripClick}
            />
          ))}
        </motion.div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 px-4 bg-gradient-to-b from-indigo-50 to-white">
        <motion.div 
          className="container mx-auto text-center"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl font-bold text-indigo-900 mb-6 relative inline-block"
            variants={fadeInVariant}
          >
            See It <span className="text-indigo-600">In Action</span>
            <motion.div 
              className="absolute -bottom-2 -z-10 left-0 h-3 bg-indigo-200 w-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
            variants={fadeInVariant}
          >
            Create your first AI-powered travel itinerary in just a few clicks.
          </motion.p>
          
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto overflow-hidden"
            variants={fadeInVariant}
            onHoverStart={() => setDemoHovered(true)}
            onHoverEnd={() => setDemoHovered(false)}
            whileHover={{
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.15)",
              y: -5,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
          >
            <div className="relative mb-8 overflow-hidden rounded-xl">
              <motion.img 
                src={img2}
                alt="Demo" 
                className="w-full h-auto rounded-lg"
                animate={{ 
                  scale: demoHovered ? 1.03 : 1 
                }}
                transition={{ duration: 0.5 }}
              />
              <motion.div 
                className="absolute inset-0 bg-indigo-600"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: demoHovered ? 0.1 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <motion.button 
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg relative overflow-hidden"
              onClick={onTryItClick}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(79, 70, 229, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.span 
                className="absolute inset-0 bg-indigo-500"
                initial={{ scale: 0, opacity: 0.7 }}
                whileHover={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              Try It Yourself
              <motion.span 
                className="ml-2 inline-block"
                animate={{ 
                  x: demoHovered ? 5 : 0,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex justify-center gap-8 flex-wrap"
            variants={fadeInVariant}
          >
            {["24/7 Support", "AI-Powered", "Customizable"].map((feature, index) => (
              <motion.div 
                key={feature}
                className="flex items-center text-indigo-800 font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (index * 0.2) }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-2 h-2 bg-indigo-600 rounded-full mr-2"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 0.5, delay: index * 0.7 }}
                />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default TravelExperienceSection;
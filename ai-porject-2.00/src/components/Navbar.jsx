import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Menu, X } from 'lucide-react';

function Navbar({ onTryItClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scrolling function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Demo', href: 'demo' },
    { name: 'Features', href: 'features' }, 
 { name: 'FAQ', href: 'faq' },
    
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-blue-200/30 backdrop-blur-lg shadow-lg py-2' // Dark blue background when scrolled
          : 'bg-blue-300/30 backdrop-blur-lg py-4' // Dark blue background in the initial state
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5
            }}
          >
            <Compass className="h-6 w-6 text-indigo-600" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          GoGenie
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              onClick={() => scrollToSection(item.href)} // Smooth scrolling on click
              variants={itemVariants}
              whileHover={{ scale: 1.1, color: '#4F46E5' }}
              className="text-gray-700 font-medium relative group cursor-pointer"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            onClick={onTryItClick}
          >
            Try It Now
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.div variants={itemVariants} className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/30 -z-20 backdrop-blur-lg"
        >
          <div className="container mx-auto px-4 -z-20 py-3 flex flex-col space-y-3">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                onClick={() => {
                  scrollToSection(item.href); // Smooth scrolling on click
                  setMobileMenuOpen(false); // Close menu after clicking
                }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md w-full"
              onClick={() => {
                onTryItClick();
                setMobileMenuOpen(false);
              }}
            >
              Try It Now
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
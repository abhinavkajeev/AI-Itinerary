import React, { useState, useEffect, useCallback } from 'react';
import { Compass, Menu, X } from 'lucide-react';

function Navbar({ onTryItClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Memoize the scroll handler to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu when viewport size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Smooth scrolling function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu after navigation
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Demo', href: 'demo' },
    { name: 'Features', href: 'features' },
    { name: 'FAQ', href: 'faq' },
  ];

  // Toggle mobile menu with improved accessibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-blue-200/30 backdrop-blur-lg shadow-lg py-2'
          : 'bg-blue-300/30 backdrop-blur-lg py-3'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-indigo-600" />
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            GoGenie
          </span>
        </div>

        {/* Desktop Menu - hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-gray-700 font-medium relative group cursor-pointer px-2 py-1"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
            </button>
          ))}
          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            onClick={onTryItClick}
          >
            Try It Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-700 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-white/90 backdrop-blur-sm transition-all duration-200 overflow-hidden ${
          mobileMenuOpen ? 'max-h-64 shadow-lg' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-gray-700 py-2 px-3 rounded-md text-left hover:bg-indigo-50 transition-colors w-full"
            >
              {item.name}
            </button>
          ))}
          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md w-full mt-2"
            onClick={() => {
              onTryItClick();
              setMobileMenuOpen(false);
            }}
          >
            Try It Now
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
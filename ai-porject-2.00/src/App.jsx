import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Landing page components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TravelExperienceSection from './components/TravelExperienceSection';
import FeaturesSection from './components/FeaturesSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

// Import ItineraryApp components
// Replace ItineraryForm with TravelPlannerPage
import TravelPlannerPage from './components/TravelPlannerPage';
import ItineraryLoading from './components/ItineraryLoading';
import ItineraryView from './components/ItineraryView';

import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [modalView, setModalView] = useState('form'); // 'form', 'loading', or 'view'
  const [itineraryId, setItineraryId] = useState(null);

  // Handle modal state based on route changes
  useEffect(() => {
    if (location.pathname !== '/' && showGeneratorModal) {
      setShowGeneratorModal(false);
    }
  }, [location.pathname, showGeneratorModal]);

  const handleOpenGenerator = () => {
    // When on landing page, show the generator as a modal
    if (location.pathname === '/') {
      setModalView('form');
      setShowGeneratorModal(true);
    } else {
      // Otherwise navigate to the dedicated generator page
      navigate('/generator');
    }
  };

  const handleCloseGenerator = () => {
    setShowGeneratorModal(false);
    // Reset the modal state after it's closed
    setTimeout(() => setModalView('form'), 300);
  };

  // Handle form submission within the modal flow
  const handleFormSubmit = async (formData) => {
    // Store form data in session storage
    sessionStorage.setItem('itineraryRequest', JSON.stringify(formData));
    
    // If in modal, transition to loading view
    if (showGeneratorModal) {
      setModalView('loading');
    } else {
      // If on dedicated page, navigate to loading
      navigate('/generating');
    }
  };

  // Handle completion of the loading process
  const handleLoadingComplete = (generatedId) => {
    setItineraryId(generatedId);
    
    // If in modal, transition to itinerary view
    if (showGeneratorModal) {
      setModalView('view');
    } else {
      // If on dedicated page, navigate to itinerary view
      navigate(`/itinerary/${generatedId}`);
    }
  };

  // Landing page layout
  const LandingPage = () => (
    <>
      <Navbar onTryItClick={handleOpenGenerator} />
      <Hero onPlanTripClick={handleOpenGenerator} />
      <TravelExperienceSection onPlanTripClick={handleOpenGenerator} onTryItClick={handleOpenGenerator} />
      <FeaturesSection />
      <FaqSection />
      <CtaSection onStartPlanningClick={handleOpenGenerator} />
      <Footer />
      
      {/* Modal overlay for the itinerary generator */}
      <AnimatePresence>
        {showGeneratorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div 
              className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-indigo-900">
                    {modalView === 'form' ? 'Plan Your Trip' : 
                     modalView === 'loading' ? 'Creating Your Itinerary' : 
                     'Your Travel Itinerary'}
                  </h2>
                  <button 
                    onClick={handleCloseGenerator} 
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <AnimatePresence mode="wait">
                  {modalView === 'form' && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-2" // Add some padding for the modal view
                    >
                      {/* Replace ItineraryForm with TravelPlannerPage */}
                      <TravelPlannerPage onSubmit={handleFormSubmit} isModal={true} />
                    </motion.div>
                  )}
                  
                  {modalView === 'loading' && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ItineraryLoading onComplete={handleLoadingComplete} />
                    </motion.div>
                  )}
                  
                  {modalView === 'view' && itineraryId && (
                    <motion.div
                      key="view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ItineraryView id={itineraryId} isModal={true} onClose={handleCloseGenerator} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/generator" element={
            <div className="container mx-auto py-8">
              {/* Replace ItineraryForm with TravelPlannerPage */}
              <TravelPlannerPage onSubmit={handleFormSubmit} />
            </div>
          } />
          <Route path="/generating" element={
            <div className="max-w-4xl mx-auto p-5">
              <ItineraryLoading onComplete={handleLoadingComplete} />
            </div>
          } />
          <Route path="/itinerary/:id" element={
            <div className="max-w-4xl mx-auto p-5">
              <ItineraryView onNewTrip={() => navigate('/generator')} />
            </div>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
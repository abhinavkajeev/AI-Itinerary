import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import axios from 'axios'; // Make sure to install axios

const ItineraryLoading = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Researching your destination...');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const statuses = [
      'Researching your destination...',
      'Finding the best activities...',
      'Scheduling your perfect days...',
      'Checking weather patterns...',
      'Finalizing your itinerary...'
    ];
    
    // Get form data from session storage
    const formData = JSON.parse(sessionStorage.getItem('itineraryRequest'));
    if (!formData) {
      setError('No itinerary request found');
      return;
    }
    
    // Set up progress simulation
    let currentStep = 0;
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Increase progress more slowly to give API time to respond
        const increment = Math.random() * 1.5 + 0.5; // Random increment between 0.5 and 2
        const newProgress = Math.min(prev + increment, 90); // Cap at 90% until API returns
        
        // Update status text at certain milestones
        if (newProgress >= 20 && currentStep === 0) {
          setStatusText(statuses[1]);
          currentStep = 1;
        } else if (newProgress >= 40 && currentStep === 1) {
          setStatusText(statuses[2]);
          currentStep = 2;
        } else if (newProgress >= 60 && currentStep === 2) {
          setStatusText(statuses[3]);
          currentStep = 3;
        } else if (newProgress >= 80 && currentStep === 3) {
          setStatusText(statuses[4]);
          currentStep = 4;
        }
        
        return newProgress;
      });
    }, 150);
    
    // Call the API to generate the itinerary
    const generateItinerary = async () => {
      try {
        // Option 1: If you're using a backend API endpoint
        const response = await axios.post(import.meta.env.VITE_API_URL, formData);
                const itinerary = response.data;
        
        // Option 2: If you're using the OpenAI API directly from the frontend (not recommended for production)
        // This is just for demonstration purposes - in a real app, you'd make this call from your backend
        // const { generateItinerary } = require('./path-to-your-api-file'); // Adjust the path as needed
        // const itinerary = await generateItinerary(formData);
        
        // Store the generated itinerary
        sessionStorage.setItem(`itinerary-${itinerary.id}`, JSON.stringify(itinerary));
        
        // Complete progress bar and navigate to the itinerary view
        clearInterval(progressInterval);
        setProgress(100);
        setTimeout(() => {
          navigate(`/itinerary/${itinerary.id}`);
        }, 500);
      } catch (err) {
        clearInterval(progressInterval);
        console.error('Error generating itinerary:', err);
        setError('Failed to generate itinerary. Please try again.');
      }
    };
    
    // Wait a bit before starting the API call to show the loading animation
    const apiTimer = setTimeout(() => {
      generateItinerary();
    }, 1000);
    
    return () => {
      clearInterval(progressInterval);
      clearTimeout(apiTimer);
    };
  }, [navigate]);
  
  if (error) {
    return (
      <div className="h-96 flex flex-col items-center justify-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="h-96 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-4 text-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Loader className="h-10 w-10 text-indigo-600 mb-4" />
          </motion.div>
          <h3 className="text-xl font-bold text-indigo-900 mb-2">Creating Your Perfect Trip</h3>
          <p className="text-gray-600">{statusText}</p>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <motion.div 
            className="bg-indigo-600 h-3 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-center text-gray-500 text-sm">
          This may take a minute...
        </div>
      </motion.div>
    </div>
  );
};

export default ItineraryLoading;
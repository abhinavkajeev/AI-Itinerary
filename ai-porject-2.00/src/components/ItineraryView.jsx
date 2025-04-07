import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Map, Clock, Sun, Cloud, Umbrella, ChevronDown, Download, RefreshCw, ArrowLeft, Loader } from 'lucide-react';

const ItineraryView = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [expandedDay, setExpandedDay] = useState(1); // Default expand first day
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get itinerary data from session storage
    const storedItinerary = sessionStorage.getItem(`itinerary-${id}`);
    if (storedItinerary) {
      setItinerary(JSON.parse(storedItinerary));
    }
  }, [id]);
  
  if (!itinerary) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }
  
  const toggleDay = (dayNumber) => {
    if (expandedDay === dayNumber) {
      setExpandedDay(null);
    } else {
      setExpandedDay(dayNumber);
    }
  };
  
  const getWeatherIcon = (weather) => {
    switch (weather.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'partly cloudy':
        return <Cloud className="h-5 w-5 text-gray-400" />;
      case 'rainy':
        return <Umbrella className="h-5 w-5 text-blue-500" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'dining':
        return 'bg-orange-100 text-orange-800';
      case 'sightseeing':
        return 'bg-blue-100 text-blue-800';
      case 'cultural':
        return 'bg-purple-100 text-purple-800';
      case 'outdoor':
        return 'bg-green-100 text-green-800';
      case 'indoor':
        return 'bg-indigo-100 text-indigo-800';
      case 'shopping':
        return 'bg-pink-100 text-pink-800';
      case 'wellness':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const itineraryVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const dayCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <motion.div
      variants={itineraryVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div className="flex items-center justify-between mb-4">
        <Link to="/">
          <motion.button 
            className="flex items-center text-indigo-600 hover:text-indigo-800"
            whileHover={{ x: -3 }}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Form
          </motion.button>
        </Link>
      </motion.div>
      
      <motion.div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold text-indigo-900">
          <span className="mr-2">✨</span>
          {itinerary.destination} Itinerary
        </h3>
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Create New Plan
        </motion.button>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <motion.div 
        className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Calendar className="h-8 w-8 mx-auto mb-3 text-indigo-600" />
        <p className="text-gray-600 text-sm mb-1">Duration</p>
        <p className="font-semibold text-lg">
          {new Date(itinerary.startDate) >= new Date() 
            ? itinerary.duration 
            : "Invalid (Past Date)"}
        </p>
      </motion.div> 
        
        <motion.div 
          className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Clock className="h-8 w-8 mx-auto mb-3 text-indigo-600" />
          <p className="text-gray-600 text-sm mb-1">Pace</p>
          <p className="font-semibold text-lg capitalize">{itinerary.pace}</p>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-indigo-50 to-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Map className="h-8 w-8 mx-auto mb-3 text-indigo-600" />
          <p className="text-gray-600 text-sm mb-1">Budget</p>
          <p className="font-semibold text-lg capitalize">{itinerary.budget}</p>
        </motion.div>
      </motion.div>

      <div className="space-y-5">
        {itinerary.days.map((day) => (
          <motion.div
            key={day.day}
            variants={dayCardVariants}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <motion.div 
              className="flex justify-between items-center p-5 bg-gradient-to-r from-white to-gray-50 cursor-pointer"
              onClick={() => toggleDay(day.day)}
              whileHover={{ backgroundColor: '#f9fafb' }}
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="bg-indigo-100 text-indigo-600 h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg"
                  whileHover={{ scale: 1.1, backgroundColor: '#c7d2fe' }}
                  whileTap={{ scale: 0.9 }}
                >
                  {day.day}
                </motion.div>
                <div>
                  <h4 className="font-semibold text-lg">Day {day.day}</h4>
                  <p className="text-sm text-gray-500">{day.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="flex items-center px-3 py-1 rounded-full bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                >
                  {getWeatherIcon(day.weather)}
                  <span className="text-sm ml-1">{day.weather}</span>
                </motion.div>
                <motion.div
                  animate={{ 
                    rotate: expandedDay === day.day ? 180 : 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </motion.div>
              </div>
            </motion.div>
            
            <AnimatePresence>
              {expandedDay === day.day && (
                <motion.div 
                  className="p-5 bg-white"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="space-y-6">
                    {day.activities.map((activity, index) => (
                      <motion.div 
                        key={index} 
                        className="flex"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="mr-4 text-right w-16">
                          <span className="font-medium text-gray-600">{activity.time}</span>
                        </div>
                        <div className="flex-1 pb-6 border-l-2 border-indigo-200 pl-5 relative">
                          <motion.div 
                            className="absolute w-4 h-4 bg-indigo-400 rounded-full -left-[8px] top-1.5"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          />
                          <div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <h5 className="font-semibold text-lg">{activity.name}</h5>
                              <motion.span 
                                className={`text-xs px-3 py-1 rounded-full ${getActivityColor(activity.type)}`}
                                whileHover={{ scale: 1.05 }}
                              >
                                {activity.type}
                              </motion.span>
                            </div>
                            <p className="text-gray-600">{activity.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div className="flex justify-center mt-8">
        <motion.button
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex items-center"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="h-5 w-5 mr-2" />
          Export Itinerary
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ItineraryView;
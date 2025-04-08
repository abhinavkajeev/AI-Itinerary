import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Map,
  Calendar,
  Compass,
  PlusCircle,
  Briefcase,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const TravelPlannerPage = ({ onSubmit, isModal = false }) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interests, setInterests] = useState("");
  const [budget, setBudget] = useState("medium");
  const [pace, setPace] = useState("moderate");
  const [formProgress, setFormProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Calculate form progress
  useEffect(() => {
    let progress = 0;
    if (destination) progress += 20;
    if (startDate) progress += 20;
    if (endDate) progress += 20;
    if (interests) progress += 20;
    if (budget && pace) progress += 20;
    setFormProgress(progress);
  }, [destination, startDate, endDate, interests, budget, pace]);

  // Initialize Google Maps Autocomplete
  useEffect(() => {
    // Check if the Google Maps script is already loaded
    if (!window.google) {
      // Load the Google Maps script
      const googleMapScript = document.createElement("script");
      googleMapScript.src = "AIzaSyCXD8XzOQWNTOskUerm0ERrUV5cQbBRdUaA";
      googleMapScript.async = true;
      googleMapScript.defer = true;
      googleMapScript.onload = initAutocomplete;
      
      window.document.body.appendChild(googleMapScript);
    } else {
      initAutocomplete();
    }

    return () => {
      // Clean up if component unmounts
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const initAutocomplete = () => {
    if (!inputRef.current) return;
    
    // Create the autocomplete object
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ['(cities)'] }
    );

    // Add listener for place changed event
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace();
      
      if (place && place.formatted_address) {
        setDestination(place.formatted_address);
        setShowSuggestions(false);
      }
    });
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      destination,
      startDate,
      endDate,
      interests: interests.split(",").map((i) => i.trim()),
      budget,
      pace,
    };

    // If onSubmit prop exists, use it (for modal flow)
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Otherwise use the original sessionStorage approach
      sessionStorage.setItem("itineraryRequest", JSON.stringify(formData));
      navigate("/generating");
    }
  };

  const nextStep = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
      // Auto-scroll to top on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Close sidebar on next step for mobile
      setSidebarOpen(false);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      // Auto-scroll to top on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Close sidebar on prev step for mobile
      setSidebarOpen(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3, // Reduced animation time for mobile
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 }, // Reduced movement for mobile
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Faster transitions for mobile
        when: "beforeChildren",
        staggerChildren: 0.05, // Faster staggering for mobile
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 }, // Reduced movement for mobile
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  // Adjust container classes based on whether this is used in a modal or full page
  const containerClasses = isModal ? "w-full" : "w-full px-3 py-4 md:max-w-6xl md:mx-auto md:px-4 md:py-8";

  // For modal view, we might want to have more compact styling
  const compactMode = isModal;

  // Popular destination suggestions
  const popularDestinations = [
    "Paris, France",
    "Tokyo, Japan",
    "New York City, USA",
    "Rome, Italy",
    "Bangkok, Thailand",
    "London, UK"
  ];

  const handleDestinationSuggestionClick = (suggestion) => {
    setDestination(suggestion);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={containerClasses}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        {/* Mobile Progress Indicator */}
        <div className="md:hidden w-full mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-gray-600">Your Progress</h2>
            <span className="text-sm text-gray-500">{formProgress}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: "0%" }}
              animate={{ width: `${formProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Mobile Step Indicator */}
        <div className="md:hidden w-full mb-2">
          <button 
            onClick={toggleSidebar}
            className="flex justify-between items-center w-full py-3 px-4 bg-indigo-50 rounded-lg"
          >
            <div className="flex items-center">
              <div 
                className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center mr-2"
              >
                {activeStep}
              </div>
              <span className="font-medium text-indigo-900">
                {activeStep === 1 && "Destination"}
                {activeStep === 2 && "Trip Dates"}
                {activeStep === 3 && "Interests"}
                {activeStep === 4 && "Preferences"}
              </span>
            </div>
            {sidebarOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          {/* Collapsible sidebar for mobile */}
          {sidebarOpen && (
            <div className="bg-white rounded-lg shadow-md p-4 mt-2 mb-4">
              <div className="space-y-2">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    onClick={() => {
                      setActiveStep(step);
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg flex items-center text-sm transition-all ${
                      activeStep === step
                        ? "bg-indigo-100 text-indigo-900"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                        activeStep === step
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step}
                    </div>
                    <span>
                      {step === 1 && "Destination"}
                      {step === 2 && "Trip Dates"}
                      {step === 3 && "Interests"}
                      {step === 4 && "Preferences"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Left sidebar with steps - hidden on mobile */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h3 className="font-bold text-xl mb-6 text-indigo-900">
              Plan Your Journey
            </h3>

            <div className="space-y-4">
              <button
                onClick={() => setActiveStep(1)}
                className={`w-full text-left p-4 rounded-lg flex items-center transition-all ${
                  activeStep === 1
                    ? "bg-indigo-100 text-indigo-900"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    activeStep === 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </div>
                <span>Destination</span>
              </button>

              <button
                onClick={() => setActiveStep(2)}
                className={`w-full text-left p-4 rounded-lg flex items-center transition-all ${
                  activeStep === 2
                    ? "bg-indigo-100 text-indigo-900"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    activeStep === 2
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
                <span>Trip Dates</span>
              </button>

              <button
                onClick={() => setActiveStep(3)}
                className={`w-full text-left p-4 rounded-lg flex items-center transition-all ${
                  activeStep === 3
                    ? "bg-indigo-100 text-indigo-900"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    activeStep === 3
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span>Interests</span>
              </button>

              <button
                onClick={() => setActiveStep(4)}
                className={`w-full text-left p-4 rounded-lg flex items-center transition-all ${
                  activeStep === 4
                    ? "bg-indigo-100 text-indigo-900"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    activeStep === 4
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  4
                </div>
                <span>Preferences</span>
              </button>
            </div>

            <div className="mt-8">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-indigo-600"
                  initial={{ width: "0%" }}
                  animate={{ width: `${formProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="mt-2 text-right text-sm text-gray-500">
                {formProgress}% complete
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-8 lg:col-span-9">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
            <h1
              className={`${
                compactMode ? "text-2xl" : "text-2xl md:text-4xl"
              } font-bold text-indigo-900 mb-2`}
            >
              Design Your Dream Vacation
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              Fill in the details below and we'll create a personalized
              itinerary just for you.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Destination */}
              {activeStep === 1 && (
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 md:space-y-6 pb-6 md:pb-10"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-indigo-800">
                      Where would you like to go?
                    </h2>
                    <div className="relative">
                      <Map
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"
                        size={18}
                      />
                      <input
                        ref={inputRef}
                        type="text"
                        value={destination}
                        onChange={handleDestinationChange}
                        placeholder="Enter a city or country"
                        className="w-full pl-10 pr-3 py-3 text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow"
                      />
                    </div>
                    
                    {/* Popular destination suggestions - scrollable on mobile */}
                    <div className="mt-3 md:mt-4">
                      <p className="text-xs md:text-sm text-gray-600 mb-2">Popular destinations:</p>
                      <div className="flex flex-nowrap overflow-x-auto md:flex-wrap gap-2 pb-2">
                        {popularDestinations.map((place) => (
                          <button
                            key={place}
                            type="button"
                            onClick={() => handleDestinationSuggestionClick(place)}
                            className="flex-shrink-0 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs md:text-sm hover:bg-indigo-100 transition-colors duration-200"
                          >
                            {place}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4 md:pt-6">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!destination}
                      className={`w-full md:w-auto md:float-right px-4 py-3 rounded-lg text-white font-medium ${
                        destination
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-gray-400 cursor-not-allowed"
                      } transition-colors duration-200`}
                    >
                      Continue
                    </button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Dates */}
              {activeStep === 2 && (
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 md:space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-indigo-800">
                      When are you traveling?
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:gap-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                          Start Date
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"
                            size={18}
                          />
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]} // Prevent past dates
                            className="w-full pl-13 pr-3 py-3 text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                          End Date
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"
                            size={18}
                          />
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate || new Date().toISOString().split("T")[0]} // Prevent past dates
                            className="w-full pl-13 pr-3 py-3 text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="pt-4 md:pt-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:justify-between"
                  >
                    <button
                      type="button"
                      onClick={prevStep}
                      className="order-2 md:order-1 mt-3 w-full m md:w-auto px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!startDate || !endDate}
                      className={`order-1 md:order-2 w-full md:w-auto px-4 py-3 rounded-lg text-white font-medium ${
                        startDate && endDate
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-gray-400 cursor-not-allowed"
                      } transition-colors duration-200`}
                    >
                      Continue
                    </button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Interests */}
              {activeStep === 3 && (
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 md:space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-indigo-800">
                      What are you interested in?
                    </h2>
                    <div className="relative">
                      <Compass
                        className="absolute left-3 top-3 text-indigo-400"
                        size={18}
                      />
                      <textarea
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        placeholder="e.g., museums, hiking, food (separate with commas)"
                        className="w-full pl-10 pr-3 py-3 text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] transition-all duration-200 shadow-sm hover:shadow"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="pt-4 md:pt-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:justify-between"
                  >
                    <button
                      type="button"
                      onClick={prevStep}
                      className="order-2 md:order-1 mt-3 w-full md:w-auto px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!interests}
                      className={`order-1 md:order-2 w-full md:w-auto px-4 py-3 rounded-lg text-white font-medium ${
                        interests
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-gray-400 cursor-not-allowed"
                      } transition-colors duration-200`}
                    >
                      Continue
                    </button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 4: Preferences */}
              {activeStep === 4 && (
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-indigo-800">
                      Trip Preferences
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="flex items-center text-base md:text-lg font-medium text-gray-700 mb-3">
                          <Briefcase
                            className="mr-2 text-indigo-500"
                            size={20}
                          />
                          Budget
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {["budget", "medium", "luxury"].map((option) => (
                            <label
                              key={option}
                              className={`flex items-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                budget === option
                                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                  : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                              }`}
                            >
                              <input
                                type="radio"
                                name="budget"
                                value={option}
                                checked={budget === option}
                                onChange={() => setBudget(option)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 mr-3"
                              />
                              <div>
                                <span className="block text-sm md:text-base font-medium capitalize">
                                  {option}
                                </span>
                                <span className="text-xs md:text-sm text-gray-500">
                                  {option === "budget" &&
                                    "Cost-effective options"}
                                  {option === "medium" && "Balanced choices"}
                                  {option === "luxury" && "Premium experiences"}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center text-base md:text-lg font-medium text-gray-700 mb-3">
                          <Clock className="mr-2 text-indigo-500" size={20} />
                          Travel Pace
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {["relaxed", "moderate", "intense"].map((option) => (
                            <label
                              key={option}
                              className={`flex items-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                pace === option
                                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                  : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                              }`}
                            >
                              <input
                                type="radio"
                                name="pace"
                                value={option}
                                checked={pace === option}
                                onChange={() => setPace(option)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 mr-3"
                              />
                              <div>
                                <span className="block text-sm md:text-base font-medium capitalize">
                                  {option}
                                </span>
                                <span className="text-xs md:text-sm text-gray-500">
                                  {option === "relaxed" &&
                                    "Few activities, more downtime"}
                                  {option === "moderate" && "Balanced schedule"}
                                  {option === "intense" && "Packed itinerary"}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="pt-4 md:pt-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:justify-between"
                  >
                    <button
                      type="button"
                      onClick={prevStep}
                      className="order-2 md:order-1 mt-3 w-full md:w-auto px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <motion.button
                      type="submit"
                      className="order-1 md:order-2 flex justify-center items-center w-full md:w-auto py-3 px-6 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!budget || !pace}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Generate Itinerary
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TravelPlannerPage;
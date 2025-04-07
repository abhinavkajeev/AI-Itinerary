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
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
    
    // You can implement a simpler version of autocomplete suggestions if needed
    // or rely entirely on the Google Places Autocomplete
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
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
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
    duration: 0.5,
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Adjust container classes based on whether this is used in a modal or full page
  const containerClasses = isModal ? "w-full" : "max-w-6xl mx-auto px-4 py-12";

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

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={containerClasses}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left sidebar with steps */}
        <div className="md:col-span-4 lg:col-span-3">
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
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1
              className={`${
                compactMode ? "text-3xl" : "text-4xl"
              } font-bold text-indigo-900 mb-2`}
            >
              Design Your Dream Vacation
            </h1>
            <p className="text-gray-600 mb-8">
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
                  className="space-y-6 pb-10"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-2xl font-semibold mb-6 text-indigo-800">
                      Where would you like to go?
                    </h2>
                    <div className="relative">
                      <Map
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400"
                        size={20}
                      />
                      <input
                        ref={inputRef}
                        type="text"
                        value={destination}
                        onChange={handleDestinationChange}
                        placeholder="Enter a city, country, or region"
                        className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow"
                      />
                    </div>
                    
                    {/* Popular destination suggestions */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Popular destinations:</p>
                      <div className="flex flex-wrap gap-2">
                        {popularDestinations.map((place) => (
                          <button
                            key={place}
                            type="button"
                            onClick={() => handleDestinationSuggestionClick(place)}
                            className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm hover:bg-indigo-100 transition-colors duration-200"
                          >
                            {place}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-6">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!destination}
                      className={`float-right px-6 py-3 rounded-lg text-white ${
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
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-2xl font-semibold mb-6 text-indigo-800">
                      When are you traveling?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Start Date
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400"
                            size={20}
                          />
                          <input
                           type="date"
                              value={startDate}
                             onChange={(e) => setStartDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]} // Prevent past dates
                                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow"
                                required
                              />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          End Date
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400"
                            size={20}
                          />
                           <input
                           type="date"
                              value={endDate}
                             onChange={(e) => setEndDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]} // Prevent past dates
                                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow"
                                required
                              />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="pt-6 flex justify-between"
                  >
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!startDate || !endDate}
                      className={`px-6 py-3 rounded-lg text-white ${
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
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-2xl font-semibold mb-6 text-indigo-800">
                      What are you interested in?
                    </h2>
                    <div className="relative">
                      <Compass
                        className="absolute left-4 top-4 text-indigo-400"
                        size={20}
                      />
                      <textarea
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        placeholder="e.g., museums, hiking, food, shopping, architecture, history (separate with commas)"
                        className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[150px] transition-all duration-200 shadow-sm hover:shadow"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="pt-6 flex justify-between"
                  >
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!interests}
                      className={`px-6 py-3 rounded-lg text-white ${
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
                  className="space-y-8"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-2xl font-semibold mb-6 text-indigo-800">
                      Trip Preferences
                    </h2>

                    <div className="space-y-8">
                      <div>
                        <label className="flex items-center text-lg font-medium text-gray-700 mb-3">
                          <Briefcase
                            className="mr-2 text-indigo-500"
                            size={22}
                          />
                          Budget
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {["budget", "medium", "luxury"].map((option) => (
                            <label
                              key={option}
                              className={`flex items-center px-5 py-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
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
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 mr-3"
                              />
                              <div>
                                <span className="block font-medium capitalize">
                                  {option}
                                </span>
                                <span className="text-sm text-gray-500">
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
                        <label className="flex items-center text-lg font-medium text-gray-700 mb-3">
                          <Clock className="mr-2 text-indigo-500" size={22} />
                          Travel Pace
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {["relaxed", "moderate", "intense"].map((option) => (
                            <label
                              key={option}
                              className={`flex items-center px-5 py-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
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
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 mr-3"
                              />
                              <div>
                                <span className="block font-medium capitalize">
                                  {option}
                                </span>
                                <span className="text-sm text-gray-500">
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
                    className="pt-6 flex justify-between"
                  >
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <motion.button
                      type="submit"
                      className="flex justify-center items-center py-4 px-8 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!budget || !pace}
                    >
                      <PlusCircle className="mr-2 h-5 w-5" />
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
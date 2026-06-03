
import React, { createContext, useContext, useState } from 'react';

const ConversationalGuideContext = createContext();

export const useConversationalGuide = () => {
  const context = useContext(ConversationalGuideContext);
  if (!context) {
    throw new Error('useConversationalGuide must be used within a ConversationalGuideProvider');
  }
  return context;
};

export const ConversationalGuideProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [familyName, setFamilyName] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState('');
  const [destination, setDestination] = useState('');

  // Family Details State
  const [childrenList, setChildrenList] = useState([]);
  const [parentsList, setParentsList] = useState([]);
  const [year, setYear] = useState(2026);

  // Minerva API Integration State
  const [parsedData, setParsedData] = useState({ destinations: [], landmarks: [] });
  const [selectedLandmarks, setSelectedLandmarks] = useState([]); // Array of IDs
  const [recommendedItinerary, setRecommendedItinerary] = useState(null);
  const [itineraryPreferences, setItineraryPreferences] = useState({
    days: 3,
    interests: [],
    pace: 'balanced',
  });
  const [isLoadingLandmarks, setIsLoadingLandmarks] = useState(false);
  const [hasSearchedLandmarks, setHasSearchedLandmarks] = useState(false);

  const setStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    setStep(Math.min(currentStep + 1, 6));
  };

  const goBack = () => {
    setStep(Math.max(currentStep - 1, 1));
  };

  const updateFamilyName = (name) => setFamilyName(name);

  const updateCoverPhoto = (file) => {
    setCoverPhoto(file);
    if (file) {
      setCoverPhotoUrl(URL.createObjectURL(file));
    } else {
      setCoverPhotoUrl('');
    }
  };

  const updateDestination = (dest) => {
    setDestination(dest);
    setHasSearchedLandmarks(false);
    setParsedData({ destinations: [], landmarks: [] });
    setSelectedLandmarks([]);
    setRecommendedItinerary(null);
  };

  const setParsedDataState = (data) => {
    setParsedData(data);
  };

  const toggleLandmarkSelection = (landmarkId) => {
    setSelectedLandmarks(prev => {
      if (prev.includes(landmarkId)) {
        return prev.filter(id => id !== landmarkId);
      }
      return [...prev, landmarkId];
    });
  };

  return (
    <ConversationalGuideContext.Provider
      value={{
        currentStep,
        setStep,
        nextStep,
        goBack,
        familyName,
        updateFamilyName,
        coverPhoto,
        coverPhotoUrl,
        updateCoverPhoto,
        destination,
        updateDestination,

        // Family Details
        childrenList,
        setChildrenList,
        parentsList,
        setParentsList,
        year,
        setYear,

        // Landmark state
        parsedData,
        setParsedData: setParsedDataState,
        selectedLandmarks,
        setSelectedLandmarks,
        toggleLandmarkSelection,
        recommendedItinerary,
        setRecommendedItinerary,
        itineraryPreferences,
        setItineraryPreferences,
        isLoadingLandmarks,
        setIsLoadingLandmarks,
        hasSearchedLandmarks,
        setHasSearchedLandmarks
      }}
    >
      {children}
    </ConversationalGuideContext.Provider>
  );
};

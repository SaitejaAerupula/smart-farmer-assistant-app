"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appName: "Smart Farmer Assistant",
    tagline: "Make better decisions for your farm",
    marketPrices: "Market Prices",
    marketPricesDesc: "Check real-time vegetable and crop prices in your local markets",
    cropRecommendations: "Crop Recommendations",
    cropRecommendationsDesc: "Get personalized crop suggestions based on weather and soil",
    diseaseDetection: "Disease Detection",
    diseaseDetectionDesc: "Identify crop diseases and get treatment recommendations",
    getStarted: "Get Started",
    enterApp: "Enter Application",
    viewPrices: "View Prices",
    getCropAdvice: "Get Crop Advice",
    scanDisease: "Scan Disease",
    district: "District",
    market: "Market",
    selectDistrict: "Select District",
    selectMarket: "Select Market",
    vegetable: "Vegetable",
    minPrice: "Min Price",
    maxPrice: "Max Price",
    avgPrice: "Avg Price",
    unit: "Unit",
    search: "Search...",
    lastUpdated: "Last Updated",
    location: "Location",
    enterLocation: "Enter your location",
    useGPS: "Use GPS",
    getRecommendations: "Get Recommendations",
    recommendedCrops: "Recommended Crops",
    cropName: "Crop Name",
    yieldPerAcre: "Yield/Acre",
    temperature: "Temperature",
    rainfall: "Rainfall",
    cropCycle: "Crop Cycle",
    uploadImage: "Upload Image",
    uploadLandImage: "Upload Land Image",
    takePhoto: "Take Photo",
    detectDisease: "Detect Disease",
    detectedDisease: "Detected Disease",
    treatment: "Treatment",
    pesticideRecommendations: "Pesticide Recommendations",
    organicTreatment: "Organic Treatment",
    naturalSolutions: "Natural Solutions",
    loading: "Loading...",
    error: "Error",
    noData: "No data available",
    contactUs: "Contact Us",
    phone: "Phone",
    email: "Email",
    linkedin: "LinkedIn",
    welcomeMessage: "Empowering Farmers with Smart Technology",
    welcomeSubtext: "Get real-time market prices, crop recommendations, and disease detection all in one place",
  },
  hi: {
    appName: "स्मार्ट किसान सहायक",
    tagline: "अपने खेत के लिए बेहतर निर्णय लें",
    marketPrices: "बाजार मूल्य",
    marketPricesDesc: "अपने स्थानीय बाजारों में सब्जियों और फसलों की वास्तविक कीमतें देखें",
    cropRecommendations: "फसल सिफारिशें",
    cropRecommendationsDesc: "मौसम और मिट्टी के आधार पर व्यक्तिगत फसल सुझाव प्राप्त करें",
    diseaseDetection: "रोग पहचान",
    diseaseDetectionDesc: "फसल रोगों की पहचान करें और उपचार सिफारिशें प्राप्त करें",
    getStarted: "शुरू करें",
    enterApp: "एप्लिकेशन में प्रवेश करें",
    viewPrices: "कीमतें देखें",
    getCropAdvice: "फसल सलाह लें",
    scanDisease: "रोग स्कैन करें",
    district: "जिला",
    market: "बाजार",
    selectDistrict: "जिला चुनें",
    selectMarket: "बाजार चुनें",
    vegetable: "सब्जी",
    minPrice: "न्यूनतम मूल्य",
    maxPrice: "अधिकतम मूल्य",
    avgPrice: "औसत मूल्य",
    unit: "इकाई",
    search: "खोजें...",
    lastUpdated: "अंतिम अपडेट",
    location: "स्थान",
    enterLocation: "अपना स्थान दर्ज करें",
    useGPS: "GPS उपयोग करें",
    getRecommendations: "सिफारिशें प्राप्त करें",
    recommendedCrops: "अनुशंसित फसलें",
    cropName: "फसल का नाम",
    yieldPerAcre: "उपज/एकड़",
    temperature: "तापमान",
    rainfall: "वर्षा",
    cropCycle: "फसल चक्र",
    uploadImage: "छवि अपलोड करें",
    uploadLandImage: "भूमि की छवि अपलोड करें",
    takePhoto: "फोटो लें",
    detectDisease: "रोग का पता लगाएं",
    detectedDisease: "पता लगाया गया रोग",
    treatment: "उपचार",
    pesticideRecommendations: "कीटनाशक सिफारिशें",
    organicTreatment: "जैविक उपचार",
    naturalSolutions: "प्राकृतिक समाधान",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    noData: "कोई डेटा उपलब्ध नहीं",
    contactUs: "संपर्क करें",
    phone: "फोन",
    email: "ईमेल",
    linkedin: "लिंक्डइन",
    welcomeMessage: "स्मार्ट तकनीक से किसानों को सशक्त बनाना",
    welcomeSubtext: "एक ही स्थान पर रियल-टाइम बाजार मूल्य, फसल सिफारिशें और रोग का पता लगाएं",
  },
  te: {
    appName: "స్మార్ట్ రైతు సహాయకుడు",
    tagline: "మీ వ్యవసాయం కోసం మంచి నిర్ణయాలు తీసుకోండి",
    marketPrices: "మార్కెట్ ధరలు",
    marketPricesDesc: "మీ స్థానిక మార్కెట్లలో కూరగాయలు మరియు పంటల ధరలను చూడండి",
    cropRecommendations: "పంట సిఫార్సులు",
    cropRecommendationsDesc: "వాతావరణం మరియు నేల ఆధారంగా వ్యక్తిగత పంట సలహాలు పొందండి",
    diseaseDetection: "వ్యాధి గుర్తింపు",
    diseaseDetectionDesc: "పంట వ్యాధులను గుర్తించండి మరియు చికిత్స సిఫార్సులు పొందండి",
    getStarted: "ప్రారంభించండి",
    enterApp: "అప్లికేషన్‌లోకి ప్రవేశించండి",
    viewPrices: "ధరలను చూడండి",
    getCropAdvice: "పంట సలహా పొందండి",
    scanDisease: "వ్యాధిని స్కాన్ చేయండి",
    district: "జిల్లా",
    market: "మార్కెట్",
    selectDistrict: "జిల్లా ఎంచుకోండి",
    selectMarket: "మార్కెట్ ఎంచుకోండి",
    vegetable: "కూరగాయ",
    minPrice: "కనిష్ట ధర",
    maxPrice: "గరిష్ట ధర",
    avgPrice: "సగటు ధర",
    unit: "యూనిట్",
    search: "వెతకండి...",
    lastUpdated: "చివరిగా నవీకరించబడింది",
    location: "స్థానం",
    enterLocation: "మీ స్థానాన్ని నమోదు చేయండి",
    useGPS: "GPS ఉపయోగించండి",
    getRecommendations: "సిఫార్సులు పొందండి",
    recommendedCrops: "సిఫార్సు చేయబడిన పంటలు",
    cropName: "పంట పేరు",
    yieldPerAcre: "దిగుబడి/ఎకరం",
    temperature: "ఉష్ణోగ్రత",
    rainfall: "వర్షపాతం",
    cropCycle: "పంట చక్రం",
    uploadImage: "చిత్రాన్ని అప్‌లోడ్ చేయండి",
    uploadLandImage: "భూమి చిత్రాన్ని అప్‌లోడ్ చేయండి",
    takePhoto: "ఫోటో తీయండి",
    detectDisease: "వ్యాధిని గుర్తించండి",
    detectedDisease: "గుర్తించబడిన వ్యాధి",
    treatment: "చికిత్స",
    pesticideRecommendations: "పురుగుమందుల సిఫార్సులు",
    organicTreatment: "సేంద్రీయ చికిత్స",
    naturalSolutions: "సహజ పరిష్కారాలు",
    loading: "లోడ్ అవుతోంది...",
    error: "లోపం",
    noData: "డేటా అందుబాటులో లేదు",
    contactUs: "మమ్మల్ని సంప్రదించండి",
    phone: "ఫోన్",
    email: "ఇమెయిల్",
    linkedin: "లింక్డ్‌ఇన్",
    welcomeMessage: "స్మార్ట్ టెక్నాలజీతో రైతులకు శక్తినిస్తోంది",
    welcomeSubtext: "ఒకే చోట రియల్-టైమ్ మార్కెట్ ధరలు, పంట సిఫార్సులు మరియు వ్యాధి గుర్తింపు పొందండి",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
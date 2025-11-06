"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Sprout } from 'lucide-react';
import Image from 'next/image';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage = ({ onEnter }: LandingPageProps) => {
  const { t, language, setLanguage } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEnter = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-green-600 via-green-500 to-green-700 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      {/* Language Selector */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant={language === 'en' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage('en')}
          className="font-medium"
        >
          EN
        </Button>
        <Button
          variant={language === 'hi' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage('hi')}
          className="font-medium"
        >
          हिं
        </Button>
        <Button
          variant={language === 'te' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage('te')}
          className="font-medium"
        >
          తె
        </Button>
      </div>

      {/* Background Vegetables Image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/339373ee-12a7-471b-8e7f-57554eb66f8b/generated_images/vibrant-agricultural-landing-page-hero-i-5222e302-20251106064710.jpg"
          alt="Fresh Vegetables"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* Logo */}
        <div className="mb-8 animate-bounce">
          <div className="bg-white rounded-full p-6 shadow-2xl">
            <Sprout className="h-16 w-16 md:h-24 md:w-24 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          {t('appName')}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 max-w-3xl drop-shadow-md">
          {t('welcomeMessage')}
        </p>

        <p className="text-base md:text-lg text-white/80 mb-12 max-w-2xl drop-shadow-md">
          {t('welcomeSubtext')}
        </p>

        {/* Enter Button */}
        <Button
          size="lg"
          onClick={handleEnter}
          className="text-lg px-8 py-6 md:px-12 md:py-8 md:text-xl bg-white text-green-600 hover:bg-green-50 shadow-2xl hover:scale-105 transition-all duration-300 rounded-full"
        >
          {t('enterApp')} <ArrowRight className="ml-2 h-6 w-6" />
        </Button>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="text-white font-semibold text-lg mb-1">{t('marketPrices')}</h3>
            <p className="text-white/80 text-sm">{t('marketPricesDesc')}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-2">🌱</div>
            <h3 className="text-white font-semibold text-lg mb-1">{t('cropRecommendations')}</h3>
            <p className="text-white/80 text-sm">{t('cropRecommendationsDesc')}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-2">🔬</div>
            <h3 className="text-white font-semibold text-lg mb-1">{t('diseaseDetection')}</h3>
            <p className="text-white/80 text-sm">{t('diseaseDetectionDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

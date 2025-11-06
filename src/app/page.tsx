"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Leaf, Bug, ArrowRight } from 'lucide-react';
import { LandingPage } from '@/components/LandingPage';

export default function Home() {
  const { t } = useLanguage();
  const [showLanding, setShowLanding] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('hasVisitedFarmerApp');
    if (visited) {
      setShowLanding(false);
      setHasVisited(true);
    }
  }, []);

  const handleEnterApp = () => {
    localStorage.setItem('hasVisitedFarmerApp', 'true');
    setShowLanding(false);
    setHasVisited(true);
  };

  if (showLanding && !hasVisited) {
    return <LandingPage onEnter={handleEnterApp} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
            {t('appName')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {t('tagline')}
          </p>
          <div className="pt-4">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="#features">
                {t('getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Market Prices Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">{t('marketPrices')}</CardTitle>
              <CardDescription className="text-base">
                {t('marketPricesDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/market-prices">
                  {t('viewPrices')}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Crop Recommendations Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">{t('cropRecommendations')}</CardTitle>
              <CardDescription className="text-base">
                {t('cropRecommendationsDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/crop-recommendations">
                  {t('getCropAdvice')}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Disease Detection Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Bug className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl">{t('diseaseDetection')}</CardTitle>
              <CardDescription className="text-base">
                {t('diseaseDetectionDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/disease-detection">
                  {t('scanDisease')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Markets Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Crop Varieties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Disease Database</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
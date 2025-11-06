"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sprout, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const cycleLanguage = () => {
    if (language === 'en') setLanguage('hi');
    else if (language === 'hi') setLanguage('te');
    else setLanguage('en');
  };

  const getLanguageLabel = () => {
    if (language === 'en') return 'EN';
    if (language === 'hi') return 'हिं';
    return 'తె';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="hidden sm:inline">{t('appName')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/market-prices" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/market-prices') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {t('marketPrices')}
            </Link>
            <Link 
              href="/crop-recommendations" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/crop-recommendations') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {t('cropRecommendations')}
            </Link>
            <Link 
              href="/disease-detection" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/disease-detection') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {t('diseaseDetection')}
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/contact') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {t('contactUs')}
            </Link>
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={cycleLanguage}
              className="font-medium"
            >
              {getLanguageLabel()}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/market-prices" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isActive('/market-prices') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              {t('marketPrices')}
            </Link>
            <Link 
              href="/crop-recommendations" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isActive('/crop-recommendations') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              {t('cropRecommendations')}
            </Link>
            <Link 
              href="/disease-detection" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isActive('/disease-detection') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              {t('diseaseDetection')}
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              {t('contactUs')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
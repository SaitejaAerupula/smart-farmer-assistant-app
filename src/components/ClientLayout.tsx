"use client"

import { LanguageProvider } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Navigation />
      {children}
    </LanguageProvider>
  );
}

import React from 'react';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { StatsBar } from '@/components/landing/StatsBar';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { DeepDive } from '@/components/landing/DeepDive';
import { WhatIsSection } from '@/components/landing/WhatIsSection';
import { UseCases } from '@/components/landing/UseCases';
import { ComparisonTable } from '@/components/landing/ComparisonTable';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTASection } from '@/components/landing/CTASection';
import { LandingFooter } from '@/components/landing/Footer';

const Landing: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">
      <SEO
        title="Online Clipboard — Save, Share & Protect Text & Code (2026)"
        description="Free online clipboard — paste text, code & images from any device. Password protection, auto-expiry & instant link sharing. No app needed. Start free in seconds."
        canonical="https://onlineclipboard.pro"
      />
      <Header />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorks />
      <DeepDive />
      <WhatIsSection />
      <UseCases />
      <ComparisonTable />
      <FAQSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
};

export default Landing;

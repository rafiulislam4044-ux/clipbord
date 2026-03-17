import React from 'react';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { LandingFooter } from '@/components/landing/Footer';

const TermsOfService: React.FC = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Terms of Service"
      description="Read Online Clipboard's terms of service. Understand your rights and responsibilities when using our free clipboard tool."
      canonical="https://onlineclipboard.pro/terms-of-service"
    />
    <Header />
    <main className="max-w-3xl mx-auto p-4 md:p-8 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
      <p className="text-sm text-muted-foreground">Last updated: March 17, 2026</p>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>By accessing or using Online Clipboard, you agree to be bound by these terms. If you do not agree, please do not use the service.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">2. Service Description</h2>
          <p>Online Clipboard is a free web-based tool for saving, organizing, and sharing text, code snippets, images, and URLs. The service is provided "as is" without warranties of any kind.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">3. User Responsibilities</h2>
          <p>You are responsible for the content you store on Online Clipboard. You must not use the service to store or share illegal, harmful, or infringing content. You are responsible for maintaining the security of your account credentials.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">4. Content Ownership</h2>
          <p>You retain full ownership of all content you upload to Online Clipboard. We do not claim any rights over your clips. By making a clip public, you grant others permission to view that specific clip via its share link.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">5. Service Availability</h2>
          <p>We strive to keep Online Clipboard available at all times, but we do not guarantee uninterrupted service. We may modify or discontinue features with reasonable notice.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">6. Account Termination</h2>
          <p>You may delete your account at any time from the Settings page. We reserve the right to suspend accounts that violate these terms.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">7. Changes to Terms</h2>
          <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
        </section>
      </div>
    </main>
    <LandingFooter />
  </div>
);

export default TermsOfService;

import React from 'react';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { LandingFooter } from '@/components/landing/Footer';

const PrivacyPolicy: React.FC = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Privacy Policy"
      description="Read Online Clipboard's privacy policy. Learn how we protect your data, handle cookies, and ensure your privacy."
      canonical="https://onlineclipboard.pro/privacy-policy"
    />
    <Header />
    <main className="max-w-3xl mx-auto p-4 md:p-8 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: March 17, 2026</p>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
          <p>When you create an account, we collect your email address and a securely hashed password. When you create clips, we store the content you provide (text, code, images, or URLs) along with metadata such as titles, tags, and expiry dates.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>We use your information solely to provide the Online Clipboard service — storing, displaying, and sharing your clips. We do not sell, trade, or share your personal information with third parties for marketing purposes.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">3. Data Security</h2>
          <p>All password-protected clips use bcrypt encryption. Your original passwords are never stored — only secure cryptographic hashes. All data transmission is encrypted using HTTPS/TLS.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">4. Data Retention</h2>
          <p>Your clips are stored for as long as your account is active, unless you set an expiry date. Expired clips are permanently and automatically deleted from our servers, including any uploaded images.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">5. Cookies</h2>
          <p>We use essential cookies to maintain your login session. We do not use tracking cookies or third-party advertising cookies.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">6. Your Rights</h2>
          <p>You can delete all your clips or your entire account at any time from the Settings page. Upon account deletion, all associated data is permanently removed.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">7. Contact</h2>
          <p>If you have questions about this privacy policy, please reach out through our support channels.</p>
        </section>
      </div>
    </main>
    <LandingFooter />
  </div>
);

export default PrivacyPolicy;

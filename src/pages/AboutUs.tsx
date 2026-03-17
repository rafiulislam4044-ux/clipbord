import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { LandingFooter } from '@/components/landing/Footer';
import { ClipboardList, Shield, Zap, Users, Globe, Heart } from 'lucide-react';

const AboutUs: React.FC = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="About Online Clipboard — Secure Text Sharing Tool"
      description="Learn about Online Clipboard — the free, secure web tool for saving and sharing text, code, images, and links across devices. Built for developers, students & teams."
      canonical="https://onlineclipboard.pro/about"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onlineclipboard.pro" },
          { "@type": "ListItem", "position": 2, "name": "About", "item": "https://onlineclipboard.pro/about" }
        ]
      })}</script>
    </Helmet>
    <Header />
    <main className="max-w-3xl mx-auto p-4 md:p-8 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">About Online Clipboard</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We built Online Clipboard because we were tired of losing copied text, scrambling to share code snippets, and emailing files to ourselves. There had to be a better way — so we made one.
        </p>
      </div>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Our Mission</h2>
          <p>
            Online Clipboard is a free, secure web-based tool that lets you save, protect, and share text, code, images, and links across all your devices. No app downloads. No subscriptions. Just open your browser and your clipboard is there — everywhere.
          </p>
        </section>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Shield, title: 'Security First', desc: 'Bcrypt-encrypted passwords, private-by-default clips, and auto-expiry for sensitive content.' },
            { icon: Zap, title: 'Instant Sharing', desc: 'Every clip gets a unique shareable link. Recipients view without creating an account.' },
            { icon: Globe, title: 'Works Everywhere', desc: 'Fully responsive. Desktop, tablet, or phone — any browser, any device.' },
            { icon: Users, title: 'Built for Everyone', desc: 'Developers, writers, students, designers, and teams all use Online Clipboard daily.' },
            { icon: ClipboardList, title: 'All Content Types', desc: 'Text, code with syntax highlighting, images, and URLs with rich previews.' },
            { icon: Heart, title: 'Free Forever', desc: 'No hidden fees, no credit card, no limits. All features included for every user.' },
          ].map((item) => (
            <div key={item.title} className="bg-card rounded-xl border border-border p-5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Why We're Different</h2>
          <p>
            Unlike traditional clipboard tools that only work on one device, or old-school pastebins with outdated interfaces, Online Clipboard combines modern design with powerful features — password protection, auto-expiry timers, syntax highlighting for 20+ languages, and image uploads — all in one beautiful, free tool.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Get in Touch</h2>
          <p>
            Have questions, feedback, or partnership ideas? We'd love to hear from you. Reach out at{' '}
            <a href="mailto:rafiulislam4044@gmail.com" className="text-primary font-medium hover:underline">
              rafiulislam4044@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
    <LandingFooter />
  </div>
);

export default AboutUs;

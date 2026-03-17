import React from 'react';
import { Shield, Clock, Globe, ClipboardList } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Password Protection',
    description: 'Secure any clip with a password before sharing. Only people with the correct password can view the content.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Clock,
    title: 'Auto-Expiry',
    description: 'Set clips to automatically delete after 1 hour, 24 hours, 7 days, or a custom date. Perfect for sensitive information.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    icon: Globe,
    title: 'Multi-Device Sync',
    description: 'Sign in from any device and access all your clips instantly. Your clipboard follows you everywhere.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: ClipboardList,
    title: 'All Content Types',
    description: 'Save plain text, syntax-highlighted code, uploaded images, and URLs with rich link preview cards.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
];

export const FeaturesSection: React.FC = () => (
  <section className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything you need in a clipboard</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Powerful features wrapped in a simple, intuitive interface.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="group p-6 bg-card rounded-2xl border border-border clip-card space-y-4 hover:border-primary/30 transition-colors">
            <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center`}>
              <f.icon className={`h-6 w-6 ${f.color}`} />
            </div>
            <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

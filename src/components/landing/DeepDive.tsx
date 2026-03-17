import React from 'react';
import { Shield, Clock, Code, Check, Lock, Timer, Terminal } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    illustrationIcon: Lock,
    title: 'Military-grade password protection',
    description: 'Every password-protected clip is secured with bcrypt encryption. Your original password is never stored — only a cryptographic hash.',
    points: ['Bcrypt hashed passwords', 'Wrong password shake animation', 'Session-based unlock — no re-entry needed'],
    reversed: false,
  },
  {
    icon: Clock,
    illustrationIcon: Timer,
    title: 'Clips that self-destruct on schedule',
    description: 'Set an expiry time when creating any clip. Expired clips are permanently removed from our servers automatically.',
    points: ['Presets: 1hr, 24hrs, 7 days', 'Custom date and time picker', 'Live countdown timer on clip page'],
    reversed: true,
  },
  {
    icon: Code,
    illustrationIcon: Terminal,
    title: 'Beautiful code sharing with syntax highlighting',
    description: 'Share code snippets with full syntax highlighting across 20+ programming languages.',
    points: ['20+ languages supported', 'One-click copy button', 'Language detection badge'],
    reversed: false,
  },
];

export const DeepDive: React.FC = () => (
  <section className="py-24 px-4">
    <div className="max-w-6xl mx-auto space-y-24">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Powerful features, simple interface</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Dive deeper into what makes Online Clipboard special.</p>
      </div>

      {sections.map((s, i) => (
        <div key={i} className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center ${s.reversed ? 'md:[&>*:first-child]:order-2' : ''}`}>
          <div className="space-y-5">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">{s.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{s.description}</p>
            <ul className="space-y-3">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-foreground">
                  <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl border border-border p-10 flex items-center justify-center aspect-[4/3]">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-primary/5 flex items-center justify-center">
                <s.illustrationIcon className="h-16 w-16 text-primary/20" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary/40" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

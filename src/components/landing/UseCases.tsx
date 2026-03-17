import React from 'react';
import { Code, PenTool, Image, Users, BookOpen, Briefcase } from 'lucide-react';

const cases = [
  { icon: Code, title: 'Developers', desc: 'Save and share code snippets instantly' },
  { icon: PenTool, title: 'Writers', desc: 'Store notes and drafts, access anywhere' },
  { icon: Image, title: 'Designers', desc: 'Share screenshots and references via link' },
  { icon: Users, title: 'Teams', desc: 'Share credentials securely with expiry' },
  { icon: BookOpen, title: 'Students', desc: 'Save study notes on any device' },
  { icon: Briefcase, title: 'Everyone', desc: 'Free, fast, works on any browser' },
];

export const UseCases: React.FC = () => (
  <section className="pt-12 pb-24 px-4 bg-muted/30">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Built for everyone</h2>
        <p className="text-muted-foreground">No matter your role, Online Clipboard fits your workflow.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cases.map((c) => (
          <div key={c.title} className="p-6 bg-card rounded-xl border border-border clip-card text-center space-y-3 hover:border-primary/30 transition-colors">
            <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <c.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-foreground">{c.title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

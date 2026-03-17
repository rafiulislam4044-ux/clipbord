import React from 'react';
import { UserPlus, ClipboardPaste, ShieldCheck, Share2 } from 'lucide-react';

const steps = [
  { icon: UserPlus, num: '01', title: 'Create a free account', desc: 'Sign up in seconds with email. No credit card needed.' },
  { icon: ClipboardPaste, num: '02', title: 'Save your content', desc: 'Paste text, upload an image, save a code snippet, or add a URL.' },
  { icon: ShieldCheck, num: '03', title: 'Protect & set expiry', desc: 'Optionally add a password and choose when the clip expires.' },
  { icon: Share2, num: '04', title: 'Share your link', desc: 'Copy the short share link and send it to anyone, anywhere.' },
];

export const HowItWorks: React.FC = () => (
  <section className="py-24 px-4 bg-muted/30">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">How Online Clipboard works</h2>
        <p className="text-muted-foreground">Four simple steps to get started.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s) => (
          <div key={s.num} className="text-center space-y-4">
            <div className="relative mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <s.icon className="h-7 w-7 text-primary" />
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {s.num}
              </span>
            </div>
            <h3 className="font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

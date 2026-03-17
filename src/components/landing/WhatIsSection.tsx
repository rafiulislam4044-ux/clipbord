import React from 'react';
import { ClipboardList, Smartphone, Shield, Zap } from 'lucide-react';

export const WhatIsSection: React.FC = () => (
  <section className="pt-24 pb-12 px-4 bg-muted/30">
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">What is an Online Clipboard?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about modern clipboard tools.
        </p>
      </div>

      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          An <strong className="text-foreground">online clipboard</strong> is a web-based tool that allows you to copy, store, and share text, code, images, and links across multiple devices. Unlike your computer's built-in clipboard that only stores one item at a time, an online clipboard like ours provides permanent storage, password protection, and shareable links — accessible from any browser on any device.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 not-prose">
          <div className="bg-card rounded-xl border border-border p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-foreground">Cross-Device Access</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Copy text on your phone and paste it on your computer. No app downloads required — just open your browser and access your clips from anywhere.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-foreground">Secure by Default</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All clips default to private. Add bcrypt-encrypted password protection and auto-expiry for sensitive content that self-destructs on schedule.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-foreground">Unlimited Clipboard History</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Never lose copied content again. Save unlimited clips — text, code, images, and URLs — all organized with tags and searchable from your dashboard.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-foreground">Instant Sharing</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Share any clip with a unique link. Recipients can view the content without creating an account — perfect for quick collaboration.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground pt-4">Why Use an Online Clipboard?</h3>
        <p className="text-muted-foreground leading-relaxed">
          Whether you're a developer sharing code snippets, a student saving research notes, or a team collaborating on projects — an online clipboard eliminates the friction of transferring data between devices. Unlike traditional clipboard managers that only work on one device, Online Clipboard works across all your devices through the web.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">In summary:</strong> Online Clipboard is a free web-based tool that lets you save, protect, and share text, code, images, and links across devices. Features include password protection, auto-expiry, code syntax highlighting for 20+ languages, and instant shareable links. No app download required — works in any browser.
        </p>
      </div>
    </div>
  </section>
);

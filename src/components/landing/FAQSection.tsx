import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  { q: 'What is an online clipboard?', a: 'An online clipboard is a web-based tool that lets you save, store, and share text, code, images, and links across multiple devices from any browser. Unlike your built-in clipboard, it saves unlimited items with features like password protection and auto-expiry.' },
  { q: 'Is Online Clipboard free?', a: 'Yes, completely free. Create an account and start saving clips — no limits, no hidden fees. All features are included.' },
  { q: 'Is online clipboard safe to use?', a: 'Yes. All password-protected clips use bcrypt encryption. Private clips are only visible to the owner. Expired clips are permanently deleted from our servers. Your original password is never stored.' },
  { q: 'Can I use online clipboard on my phone?', a: 'Yes! Online Clipboard is fully responsive and works on any device — desktop, tablet, or mobile — through any modern web browser. No app download needed.' },
  { q: 'Do I need a credit card to sign up?', a: 'No credit card required. Just an email address and password to get started.' },
  { q: 'How does password protection work?', a: 'When you set a password on a clip, it is encrypted using bcrypt before being stored. Your original password is never saved on our servers — only the secure cryptographic hash.' },
  { q: 'What happens when a clip expires?', a: 'Expired clips are automatically and permanently deleted from our servers, including any uploaded images. You can set clips to expire after 1 hour, 24 hours, 7 days, or a custom date.' },
  { q: 'Can I share images using online clipboard?', a: 'Yes! Online Clipboard supports image uploads, code snippets with syntax highlighting in 20+ languages, plain text, and URLs with rich preview cards.' },
  { q: 'How is Online Clipboard different from Pastebin?', a: 'Online Clipboard offers password protection, image uploads, auto-expiry timers, a modern dashboard with tags and search, and a beautiful code viewer — features Pastebin lacks in its free tier.' },
  { q: 'Can I share code with syntax highlighting?', a: 'Yes. Online Clipboard supports 20+ programming languages with full syntax highlighting, line numbers, and one-click copy. Perfect for sharing code snippets with colleagues.' },
  { q: 'Does online clipboard work offline?', a: 'Online Clipboard requires an internet connection to save and access clips. However, once a clip is loaded, you can view it even if your connection drops temporarily.' },
  { q: 'How do I copy paste between phone and computer?', a: 'Simply save your content as a clip on one device, then open Online Clipboard in your browser on the other device. Your clips sync instantly across all devices through your account.' },
  { q: 'Can I keep clips private?', a: 'Yes. All clips default to private — only you can see them when logged in. Set a clip to public to share it via link.' },
  { q: 'Is there a limit on how many clips I can save?', a: 'No hard limit. Save as many clips as you need — text, code, images, and links.' },
  { q: 'Can I edit a clip after saving it?', a: 'Yes. You can edit any clip you own at any time from your dashboard or the clip view page.' },
];

export const FAQSection: React.FC = () => (
  <section id="faq" className="py-24 px-4 bg-muted/30">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently asked questions</h2>
        <p className="text-muted-foreground">Got questions? We've got answers.</p>
      </div>
      <Accordion type="multiple" className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5 bg-card">
            <AccordionTrigger className="text-left font-semibold text-sm hover:no-underline text-foreground">
              <h3>{faq.q}</h3>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

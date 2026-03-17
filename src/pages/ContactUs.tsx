import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { LandingFooter } from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }
    setSending(true);
    // Open mailto link with pre-filled content
    const subject = encodeURIComponent(`Contact from Online Clipboard: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:rafiulislam4044@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success('Email client opened! Send the email to complete your message.');
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Online Clipboard Support — We Reply Fast"
        description="Get in touch with the Online Clipboard team. Questions, feedback, or partnership inquiries — we typically respond within 24 hours."
        canonical="https://onlineclipboard.pro/contact"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onlineclipboard.pro" },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://onlineclipboard.pro/contact" }
          ]
        })}</script>
      </Helmet>
      <Header />
      <main className="max-w-5xl mx-auto p-4 md:p-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contact Us</h1>
              <p className="text-muted-foreground leading-relaxed">
                Have a question, feature request, or just want to say hello? We'd love to hear from you.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Email Us</h3>
                  <a href="mailto:rafiulislam4044@gmail.com" className="text-sm text-primary hover:underline">
                    rafiulislam4044@gmail.com
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">We typically respond within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Common Topics</h3>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    <li>• Bug reports & feature requests</li>
                    <li>• Account & privacy questions</li>
                    <li>• Partnership & collaboration</li>
                    <li>• General feedback</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="contact-name">Your Name</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="contact-email">Your Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  className="mt-1.5 min-h-[140px]"
                />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={sending}>
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                Send Message
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                This will open your email client with the message pre-filled.
              </p>
            </form>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default ContactUs;

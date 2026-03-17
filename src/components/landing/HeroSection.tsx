import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Code, FileText, Image, Link2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const HeroSection: React.FC = () => {
  const { user } = useAuth();
  return (
  <section className="relative pt-12 pb-24 px-4 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-6xl mx-auto relative z-10" id="main-content">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            Free forever — no credit card needed
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
            Your Online Clipboard,{' '}
            <span className="text-primary">everywhere.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            The best free online clipboard tool. Save, protect, and share text, code, images & links — with password protection, auto-expiry, and instant shareable links.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {user ? (
              <Button asChild size="lg" className="rounded-full px-8 h-12 text-base gap-2 group">
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="rounded-full px-8 h-12 text-base gap-2 group">
                  <Link to="/signup">
                    Get started free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base">
                  <Link to="/login">Sign in</Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" aria-hidden="true" /> Free account</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" aria-hidden="true" /> No credit card</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" aria-hidden="true" /> All features included</span>
          </div>
        </div>

        <div className="relative" aria-hidden="true">
          <div className="bg-card rounded-2xl border border-border p-6 clip-card">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/40" />
                <div className="w-3 h-3 rounded-full bg-warning/40" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
              </div>
              <div className="flex-1 mx-4 h-7 bg-muted rounded-md flex items-center px-3">
                <span className="text-xs text-muted-foreground">onlineclipboard.pro/dashboard</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-xl p-4 space-y-2 border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Code className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">API_Config.ts</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 bg-muted rounded w-full" />
                  <div className="h-2 bg-muted rounded w-3/4" />
                  <div className="h-2 bg-muted rounded w-5/6" />
                </div>
                <div className="text-[10px] text-muted-foreground">Expires in 24h</div>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 space-y-2 border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Image className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">Screenshot.png</span>
                </div>
                <div className="h-12 bg-muted rounded" />
                <div className="text-[10px] text-muted-foreground">Public · 42 views</div>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 space-y-2 border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">Meeting Notes</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 bg-muted rounded w-full" />
                  <div className="h-2 bg-muted rounded w-2/3" />
                </div>
                <div className="text-[10px] text-muted-foreground">Private · 🔒</div>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 space-y-2 border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Link2 className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">Design Ref</span>
                </div>
                <div className="h-8 bg-muted rounded" />
                <div className="text-[10px] text-primary truncate">dribbble.com/shots/...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

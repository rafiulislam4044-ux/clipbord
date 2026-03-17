import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';

export const LandingFooter: React.FC = () => (
  <footer className="border-t border-border py-14 px-4 bg-card">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <ClipboardList className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="font-bold text-foreground text-lg">Online Clipboard</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">The smartest clipboard on the web. Save, protect, and share — for free.</p>
        </div>
        <div className="flex flex-wrap gap-12 md:gap-16">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Product</h4>
            <nav aria-label="Product links" className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <Link to="/signup" className="hover:text-foreground transition-colors">Sign up</Link>
              <Link to="/login" className="hover:text-foreground transition-colors">Login</Link>
              <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            </nav>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Company</h4>
            <nav aria-label="Company links" className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
              <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            </nav>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Legal</h4>
            <nav aria-label="Legal links" className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground space-y-1">
        <p>© {new Date().getFullYear()} Online Clipboard. All rights reserved.</p>
        <p>Built for developers, writers, teams, and everyone.</p>
      </div>
    </div>
  </footer>
);

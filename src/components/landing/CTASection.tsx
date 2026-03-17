import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const CTASection: React.FC = () => {
  const { user } = useAuth();
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to simplify your clipboard?</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Join thousands of users who trust Online Clipboard to save, protect, and share their content.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 h-13 text-base gap-2 group">
          <Link to={user ? '/dashboard' : '/signup'}>
            {user ? 'Go to Dashboard' : 'Sign up free'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

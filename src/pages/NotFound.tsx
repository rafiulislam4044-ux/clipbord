import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowRight } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." noindex />
      <Header />
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="text-8xl font-extrabold text-primary/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">You might be looking for:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <Home className="h-4 w-4 mr-1" aria-hidden="true" /> Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/signup">
                <ArrowRight className="h-4 w-4 mr-1" aria-hidden="true" /> Sign up free
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/login">
                <Search className="h-4 w-4 mr-1" aria-hidden="true" /> Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import React from 'react';
import { cn } from '@/lib/utils';
import {
  ClipboardList,
  Pin,
  Type,
  Code,
  Image,
  Link as LinkIcon,
  Clock,
  Plus,
} from 'lucide-react';

interface MobileNavProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onNewClip: () => void;
}

const filters = [
  { id: 'all', label: 'All', icon: ClipboardList },
  { id: 'pinned', label: 'Pinned', icon: Pin },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'code', label: 'Code', icon: Code },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'links', label: 'Links', icon: LinkIcon },
  { id: 'expiring', label: 'Expiring', icon: Clock },
];

export const MobileNav: React.FC<MobileNavProps> = ({ activeFilter, onFilterChange, onNewClip }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex overflow-x-auto gap-1 p-2">
        <button
          onClick={onNewClip}
          className="flex flex-col items-center justify-center min-w-[56px] p-2 rounded-lg bg-primary text-primary-foreground"
        >
          <Plus className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">New</span>
        </button>
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => onFilterChange(f.id)}
            className={cn(
              'flex flex-col items-center justify-center min-w-[56px] p-2 rounded-lg transition-colors',
              activeFilter === f.id
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted'
            )}
          >
            <f.icon className="h-5 w-5" />
            <span className="text-[10px] mt-0.5">{f.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

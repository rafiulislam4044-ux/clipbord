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
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts?: Record<string, number>;
}

const filters = [
  { id: 'all', label: 'All Clips', icon: ClipboardList },
  { id: 'pinned', label: 'Pinned', icon: Pin },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'code', label: 'Code', icon: Code },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'links', label: 'Links', icon: LinkIcon },
  { id: 'expiring', label: 'Expiring Soon', icon: Clock },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeFilter, onFilterChange, counts }) => {
  return (
    <aside className="hidden md:flex w-56 flex-col border-r border-border bg-card p-4 gap-1 shrink-0">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
        Filters
      </h2>
      {filters.map((f) => (
        <Button
          key={f.id}
          variant="ghost"
          onClick={() => onFilterChange(f.id)}
          className={cn(
            'justify-start gap-3 h-9 px-3 text-sm font-normal',
            activeFilter === f.id && 'bg-primary/10 text-primary font-medium'
          )}
        >
          <f.icon className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">{f.label}</span>
          {counts && counts[f.id] !== undefined && (
            <span className="text-xs text-muted-foreground">{counts[f.id]}</span>
          )}
        </Button>
      ))}
    </aside>
  );
};

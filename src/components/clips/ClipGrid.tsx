import React from 'react';
import { Clip } from '@/types';
import { ClipCard } from './ClipCard';
import { ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ClipGridProps {
  clips: Clip[] | undefined;
  isLoading: boolean;
  viewMode?: 'grid' | 'list';
  onNewClip?: () => void;
}

export const ClipGrid: React.FC<ClipGridProps> = ({ clips, isLoading, viewMode = 'grid', onNewClip }) => {
  if (isLoading) {
    return (
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-3'}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!clips || clips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-1">No clips yet</h3>
        <p className="text-sm text-muted-foreground mb-4">Create your first clip to get started</p>
        {onNewClip && (
          <Button onClick={onNewClip}>Create your first clip</Button>
        )}
      </div>
    );
  }

  return (
    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-3'}>
      {clips.map((clip, i) => (
        <ClipCard key={clip.id} clip={clip} index={i} />
      ))}
    </div>
  );
};

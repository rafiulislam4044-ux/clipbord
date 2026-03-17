import React, { useState } from 'react';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { ClipGrid } from '@/components/clips/ClipGrid';
import { NewClipModal } from '@/components/modals/NewClipModal';
import { useClips } from '@/hooks/useClips';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LayoutGrid, List } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isNewClipOpen, setIsNewClipOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const debouncedSearch = useDebounce(searchQuery, 300);
  const { data: clips, isLoading } = useClips(filter, debouncedSearch, sortBy);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <SEO title="Dashboard" description="Manage your saved clips, code snippets, and images." noindex />

      <Sidebar activeFilter={filter} onFilterChange={setFilter} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          onSearch={setSearchQuery}
          onNewClip={() => setIsNewClipOpen(true)}
          showSearch
        />

        <div className="flex-1 p-4 md:p-6 overflow-y-auto pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Your Clipboard</h1>
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="views">Most Viewed</SelectItem>
                    <SelectItem value="az">A–Z</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 rounded-none rounded-l-md ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 rounded-none rounded-r-md ${viewMode === 'list' ? 'bg-muted' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            <ClipGrid
              clips={clips}
              isLoading={isLoading}
              viewMode={viewMode}
              onNewClip={() => setIsNewClipOpen(true)}
            />
          </div>
        </div>
      </main>

      <MobileNav activeFilter={filter} onFilterChange={setFilter} onNewClip={() => setIsNewClipOpen(true)} />
      <NewClipModal isOpen={isNewClipOpen} onClose={() => setIsNewClipOpen(false)} />
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Pin, MoreVertical, Copy, ExternalLink, Pencil, Trash2, Eye, Clock, Lock } from 'lucide-react';
import { Clip } from '@/types';
import { cn, getClipShareUrl, copyToClipboard } from '@/lib/utils';
import { ClipTypeIcon } from './ClipTypeIcon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteClip, useTogglePin } from '@/hooks/useClips';
import { toast } from 'sonner';

interface ClipCardProps {
  clip: Clip;
  index: number;
  onDelete?: () => void;
}

export const ClipCard: React.FC<ClipCardProps> = ({ clip, index }) => {
  const navigate = useNavigate();
  const deleteClip = useDeleteClip();
  const togglePin = useTogglePin();
  const [copied, setCopied] = useState(false);

  const isExpiringSoon =
    clip.expires_at && new Date(clip.expires_at).getTime() - Date.now() < 24 * 60 * 60 * 1000 && new Date(clip.expires_at).getTime() > Date.now();

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await copyToClipboard(getClipShareUrl(clip.id));
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyContent = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (clip.content) {
      await copyToClipboard(clip.content);
      toast.success('Content copied!');
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteClip.mutate(clip.id);
  };

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePin.mutate({ id: clip.id, is_pinned: !clip.is_pinned });
  };

  const contentPreview = clip.is_password_protected
    ? '••••••••••••••••'
    : clip.type === 'link'
    ? clip.link_url || ''
    : clip.content?.slice(0, 120) || '';

  return (
    <div
      onClick={() => navigate(`/clip/${clip.id}`)}
      className="clip-card group cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
      style={{ animationDelay: `${index * 50}ms`, animationDuration: '300ms' }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <ClipTypeIcon type={clip.type} />
          {isExpiringSoon && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-2 py-0.5 text-xs font-medium">
              <Clock className="h-3 w-3" />
              Expiring
            </span>
          )}
          {clip.is_password_protected && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={handlePin} className={cn('p-1 rounded hover:bg-muted transition-colors', clip.is_pinned && 'text-amber-500')}>
            <Pin className="h-3.5 w-3.5" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button onClick={(e) => e.stopPropagation()} className="p-1 rounded hover:bg-muted transition-colors">
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={handleCopyLink}>
                <Copy className="mr-2 h-3.5 w-3.5" /> Copy link
              </DropdownMenuItem>
              {clip.content && (
                <DropdownMenuItem onClick={handleCopyContent}>
                  <Copy className="mr-2 h-3.5 w-3.5" /> Copy content
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/clip/${clip.id}/edit`); }}>
                <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePin}>
                <Pin className="mr-2 h-3.5 w-3.5" /> {clip.is_pinned ? 'Unpin' : 'Pin'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <h3 className="font-semibold text-sm truncate mb-1">{clip.title}</h3>
      <p className={cn('text-xs text-muted-foreground line-clamp-2 mb-3', clip.is_password_protected && 'blur-sm select-none')}>
        {contentPreview}
      </p>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{formatDistanceToNow(new Date(clip.created_at), { addSuffix: true })}</span>
        <div className="flex items-center gap-3">
          {clip.expires_at && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(clip.expires_at), { addSuffix: true })}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" /> {clip.view_count}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-[11px]"
            onClick={handleCopyLink}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </Button>
        </div>
      </div>
    </div>
  );
};

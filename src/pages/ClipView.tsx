import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { PasswordUnlockScreen } from '@/components/modals/PasswordUnlockScreen';
import { ClipTypeIcon } from '@/components/clips/ClipTypeIcon';
import { useClip } from '@/hooks/useClips';
import { useAuth } from '@/hooks/useAuth';
import { getClipShareUrl, copyToClipboard } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { Copy, ExternalLink, Download, Pencil, Eye, Clock, Check, Globe } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'sonner';

const ClipView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: clip, isLoading, error } = useClip(id || '');
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (clip?.is_password_protected) {
      const stored = JSON.parse(sessionStorage.getItem('unlocked_clips') || '[]') as string[];
      if (stored.includes(clip.id)) setUnlocked(true);
    } else if (clip) {
      setUnlocked(true);
    }
  }, [clip]);

  useEffect(() => {
    if (!clip?.expires_at) return;
    const update = () => {
      const diff = new Date(clip.expires_at!).getTime() - Date.now();
      if (diff <= 0) { setCountdown('Expired'); return; }
      setCountdown(formatDistanceToNow(new Date(clip.expires_at!), { addSuffix: true }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [clip?.expires_at]);

  const handleCopyContent = async () => {
    if (clip?.content) {
      await copyToClipboard(clip.content);
      toast.success('Content copied!');
    }
  };

  const handleCopyLink = async () => {
    if (!clip) return;
    await copyToClipboard(getClipShareUrl(clip.id));
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error || !clip) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h1 className="text-2xl font-bold mb-2">Clip not found</h1>
          <p className="text-muted-foreground mb-4">This clip has expired or does not exist.</p>
          <Button asChild><Link to="/">Go to homepage</Link></Button>
        </div>
      </div>
    );
  }

  if (clip.visibility === 'private' && (!user || user.id !== clip.user_id)) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h1 className="text-2xl font-bold mb-2">This clip is private</h1>
          <p className="text-muted-foreground mb-4">Only the owner can view this clip.</p>
          <Button asChild><Link to="/login">Login to access</Link></Button>
        </div>
      </div>
    );
  }

  if (clip.is_password_protected && !unlocked) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <SEO title={clip.title} description="This clip is password protected." />
        <div className="max-w-3xl mx-auto py-20">
          <PasswordUnlockScreen clipId={clip.id} onUnlock={() => setUnlocked(true)} />
        </div>
      </div>
    );
  }

  const isOwner = user && user.id === clip.user_id;
  const shareUrl = getClipShareUrl(clip.id);

  return (
    <div className="min-h-screen bg-background">
      <SEO title={clip.title} description={`View clip: ${clip.title}`} />
      <Header />

      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{clip.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <ClipTypeIcon type={clip.type} />
            <span>{formatDistanceToNow(new Date(clip.created_at), { addSuffix: true })}</span>
            {clip.expires_at && (
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Clock className="h-3.5 w-3.5" /> {countdown}
              </span>
            )}
            <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {clip.view_count} views</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {clip.type === 'text' && (
            <div className="p-6 whitespace-pre-wrap text-sm">{clip.content}</div>
          )}

          {clip.type === 'code' && (
            <div className="relative">
              <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                <span className="text-xs font-medium text-muted-foreground">{clip.language}</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={handleCopyContent}>
                  <Copy className="h-3 w-3" /> Copy
                </Button>
              </div>
              <SyntaxHighlighter
                language={clip.language || 'plaintext'}
                style={oneDark}
                showLineNumbers
                customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.8125rem' }}
              >
                {clip.content || ''}
              </SyntaxHighlighter>
            </div>
          )}

          {clip.type === 'image' && clip.image_url && (
            <div className="p-4">
              <img
                src={clip.image_url}
                alt={clip.title}
                className="w-full rounded-lg"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="mt-3 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <a href={clip.image_url} download target="_blank" rel="noopener noreferrer">
                    <Download className="h-3.5 w-3.5 mr-1" /> Download
                  </a>
                </Button>
              </div>
            </div>
          )}

          {clip.type === 'link' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{clip.link_title || clip.link_url}</p>
                  <p className="text-xs text-muted-foreground truncate">{clip.link_url}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={clip.link_url || '#'} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-1" /> Open link
                </a>
              </Button>
            </div>
          )}
        </div>

        {/* Tags */}
        {clip.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {clip.tags.map((tag) => (
              <span key={tag} className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs">{tag}</span>
            ))}
          </div>
        )}

        {/* Share URL */}
        <div className="flex gap-2">
          <Input readOnly value={shareUrl} className="text-sm" />
          <Button variant="outline" onClick={handleCopyLink}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {clip.content && (
            <Button variant="outline" onClick={handleCopyContent} className="gap-1">
              <Copy className="h-4 w-4" /> Copy content
            </Button>
          )}
          {isOwner && (
            <Button variant="outline" onClick={() => navigate(`/clip/${clip.id}/edit`)} className="gap-1">
              <Pencil className="h-4 w-4" /> Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClipView;

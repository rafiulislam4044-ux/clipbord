import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { useClip, useUpdateClip } from '@/hooks/useClips';
import { Visibility } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

const LANGUAGES = [
  'plaintext', 'javascript', 'typescript', 'python', 'html', 'css', 'json',
  'sql', 'bash', 'go', 'rust', 'java', 'c', 'cpp', 'php', 'ruby', 'swift',
  'kotlin', 'yaml', 'markdown',
];

const EditClip: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: clip, isLoading } = useClip(id || '');
  const updateClip = useUpdateClip();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('plaintext');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('private');
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (clip) {
      setTitle(clip.title);
      setContent(clip.content || '');
      setLanguage(clip.language || 'plaintext');
      setLinkUrl(clip.link_url || '');
      setLinkTitle(clip.link_title || '');
      setTags(clip.tags);
      setVisibility(clip.visibility);
      setIsPasswordProtected(clip.is_password_protected);
    }
  }, [clip]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSave = async () => {
    if (!id) return;
    if (title.length > 100) { toast.error('Title must be under 100 chars'); return; }
    if (isPasswordProtected && password && password.length < 4) { toast.error('Password must be at least 4 chars'); return; }

    try {
      await updateClip.mutateAsync({
        id,
        title,
        content: clip?.type === 'text' || clip?.type === 'code' ? content : undefined,
        language: clip?.type === 'code' ? language : undefined,
        link_url: clip?.type === 'link' ? linkUrl : undefined,
        link_title: clip?.type === 'link' ? linkTitle : undefined,
        tags,
        visibility,
        is_password_protected: isPasswordProtected,
        password: isPasswordProtected && password ? password : undefined,
      });
      navigate(`/clip/${id}`);
    } catch {
      // handled by hook
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto p-6 space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!clip) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Clip not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`Edit: ${clip.title}`} description="Edit your clip." noindex />
      <Header />

      <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6">
        <h1 className="text-2xl font-bold">Edit Clip</h1>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} className="mt-1" />
          </div>

          {(clip.type === 'text' || clip.type === 'code') && (
            <div>
              {clip.type === 'code' && (
                <div className="mb-3">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((l) => (
                        <SelectItem key={l} value={l}>{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Label>Content</Label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`min-h-[200px] mt-1 ${clip.type === 'code' ? 'font-mono text-sm' : ''}`}
              />
            </div>
          )}

          {clip.type === 'link' && (
            <div className="space-y-3">
              <div>
                <Label>URL</Label>
                <Input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Link Title</Label>
                <Input value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} className="mt-1" />
              </div>
            </div>
          )}

          <div>
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-1 mt-1 mb-1">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                  {tag}
                  <button onClick={() => setTags(tags.filter(t => t !== tag))}><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
            <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleAddTag} placeholder="Type tag and press Enter" />
          </div>

          <div className="flex items-center justify-between">
            <Label>Visibility</Label>
            <Select value={visibility} onValueChange={(v) => setVisibility(v as Visibility)}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>Password protect</Label>
            <Switch checked={isPasswordProtected} onCheckedChange={setIsPasswordProtected} />
          </div>
          {isPasswordProtected && (
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep existing password" className="mt-1" />
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button className="flex-1" onClick={handleSave} disabled={updateClip.isPending}>
              {updateClip.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClip;

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Type, Code, Image, Link as LinkIcon, X, Upload, Loader2 } from 'lucide-react';
import { ClipType, Visibility } from '@/types';
import { useCreateClip } from '@/hooks/useClips';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const LANGUAGES = [
  'plaintext', 'javascript', 'typescript', 'python', 'html', 'css', 'json',
  'sql', 'bash', 'go', 'rust', 'java', 'c', 'cpp', 'php', 'ruby', 'swift',
  'kotlin', 'yaml', 'markdown',
];

interface NewClipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewClipModal: React.FC<NewClipModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const createClip = useCreateClip();
  const [step, setStep] = useState(1);
  const [clipType, setClipType] = useState<ClipType>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('plaintext');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('private');
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [expiryOption, setExpiryOption] = useState('never');
  const [customExpiry, setCustomExpiry] = useState('');

  const reset = () => {
    setStep(1);
    setClipType('text');
    setTitle('');
    setContent('');
    setLanguage('plaintext');
    setLinkUrl('');
    setLinkTitle('');
    setImageUrl('');
    setTags([]);
    setTagInput('');
    setVisibility('private');
    setIsPasswordProtected(false);
    setPassword('');
    setExpiryOption('never');
    setCustomExpiry('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }
    setUploading(true);
    const path = `${user.id}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('clip-images').upload(path, file);
    if (error) {
      toast.error('Upload failed. Try again.');
      setUploading(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from('clip-images').getPublicUrl(path);
    setImageUrl(publicUrl);
    setUploading(false);
  };

  const getExpiresAt = (): string | undefined => {
    if (expiryOption === 'never') return undefined;
    const now = new Date();
    if (expiryOption === '1h') return new Date(now.getTime() + 60 * 60 * 1000).toISOString();
    if (expiryOption === '24h') return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    if (expiryOption === '7d') return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    if (expiryOption === 'custom' && customExpiry) return new Date(customExpiry).toISOString();
    return undefined;
  };

  const handleSave = async () => {
    if (title.length > 100) { toast.error('Title must be under 100 characters'); return; }
    if (content.length > 50000) { toast.error('Content must be under 50,000 characters'); return; }
    if (isPasswordProtected && password.length < 4) { toast.error('Password must be at least 4 characters'); return; }
    if (clipType === 'link' && !linkUrl) { toast.error('URL is required for link clips'); return; }

    try {
      await createClip.mutateAsync({
        type: clipType,
        title: title || 'Untitled Clip',
        content: clipType === 'text' || clipType === 'code' ? content : undefined,
        language: clipType === 'code' ? language : undefined,
        image_url: clipType === 'image' ? imageUrl : undefined,
        link_url: clipType === 'link' ? linkUrl : undefined,
        link_title: clipType === 'link' ? linkTitle : undefined,
        tags,
        visibility,
        is_password_protected: isPasswordProtected,
        password: isPasswordProtected ? password : undefined,
        expires_at: getExpiresAt(),
      });
      handleClose();
    } catch {
      // error handled by hook
    }
  };

  const typeButtons: { type: ClipType; icon: React.ElementType; label: string }[] = [
    { type: 'text', icon: Type, label: 'Text' },
    { type: 'code', icon: Code, label: 'Code' },
    { type: 'image', icon: Image, label: 'Image' },
    { type: 'link', icon: LinkIcon, label: 'Link' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? 'Choose clip type' : step === 2 ? 'Add content' : 'Settings'}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="grid grid-cols-2 gap-3">
            {typeButtons.map((t) => (
              <button
                key={t.type}
                onClick={() => { setClipType(t.type); setStep(2); }}
                className={cn(
                  'flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-border transition-all hover:border-primary/50',
                  clipType === t.type && 'border-primary bg-primary/5'
                )}
              >
                <t.icon className="h-8 w-8 text-primary" />
                <span className="font-medium text-sm">{t.label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {clipType === 'text' && (
              <div>
                <Label>Content</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your text here..."
                  className="min-h-[160px] mt-1"
                />
                <p className="text-xs text-muted-foreground text-right mt-1">{content.length}/50,000</p>
              </div>
            )}

            {clipType === 'code' && (
              <div className="space-y-3">
                <div>
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
                <div>
                  <Label>Code</Label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste your code here..."
                    className="min-h-[160px] mt-1 font-mono text-sm"
                  />
                </div>
              </div>
            )}

            {clipType === 'image' && (
              <div>
                <Label>Upload Image</Label>
                {!imageUrl ? (
                  <label className="mt-1 flex flex-col items-center justify-center h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                    {uploading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Click or drag to upload (max 5MB)</span>
                      </>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                ) : (
                  <div className="relative mt-1">
                    <img src={imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-xl" loading="lazy" width={400} height={160} />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => setImageUrl('')}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {clipType === 'link' && (
              <div className="space-y-3">
                <div>
                  <Label>URL</Label>
                  <Input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Link Title (optional)</Label>
                  <Input
                    value={linkTitle}
                    onChange={(e) => setLinkTitle(e.target.value)}
                    placeholder="Page title"
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" onClick={() => setStep(3)}>Next</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Untitled Clip"
                maxLength={100}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-1 mt-1 mb-1">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                    {tag}
                    <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type tag and press Enter"
              />
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
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 4 characters"
                className="mt-1"
              />
            )}

            <div className="flex items-center justify-between">
              <Label>Expires</Label>
              <Select value={expiryOption} onValueChange={setExpiryOption}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="24h">24 hours</SelectItem>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {expiryOption === 'custom' && (
              <Input
                type="datetime-local"
                value={customExpiry}
                onChange={(e) => setCustomExpiry(e.target.value)}
                className="mt-1"
              />
            )}

            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button className="flex-1" onClick={handleSave} disabled={createClip.isPending}>
                {createClip.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {createClip.isPending ? 'Saving...' : 'Save Clip'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

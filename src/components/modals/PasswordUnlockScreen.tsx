import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Loader2 } from 'lucide-react';

interface PasswordUnlockScreenProps {
  clipId: string;
  onUnlock: () => void;
}

export const PasswordUnlockScreen: React.FC<PasswordUnlockScreenProps> = ({ clipId, onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    setLoading(true);
    setError(false);
    setErrorMsg('');

    try {
      const { data: rawData, error: rpcError } = await supabase.rpc('verify_clip_password', {
        p_clip_id: clipId,
      });

      const data = rawData as Record<string, unknown> | null;

      if (rpcError || !data || !data.success) {
        setErrorMsg('Could not verify password.');
        setError(true);
        setLoading(false);
        return;
      }

      if (!data.is_protected) {
        onUnlock();
        return;
      }

      const isMatch = bcrypt.compareSync(password, data.hash as string);

      if (isMatch) {
        const unlocked = JSON.parse(sessionStorage.getItem('unlocked_clips') || '[]');
        unlocked.push(clipId);
        sessionStorage.setItem('unlocked_clips', JSON.stringify(unlocked));
        onUnlock();
      } else {
        setError(true);
        setErrorMsg('Incorrect password. Please try again.');
        setLoading(false);
        setTimeout(() => setError(false), 400);
      }
    } catch {
      setErrorMsg('An error occurred.');
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-sm mx-auto">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <Lock className="w-8 h-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">This clip is protected</h2>
        <p className="text-sm text-muted-foreground">Enter the password to view the content.</p>
      </div>
      <div className={`w-full space-y-3 ${error ? 'shake' : ''}`}>
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
          className={error ? 'border-destructive' : ''}
        />
        <Button onClick={handleUnlock} className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {loading ? 'Verifying...' : 'Unlock Clip'}
        </Button>
      </div>
      {errorMsg && <p className="text-xs text-destructive font-medium">{errorMsg}</p>}
    </div>
  );
};

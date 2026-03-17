import React, { useState } from 'react';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { DeleteConfirmDialog } from '@/components/modals/DeleteConfirmDialog';

const Settings: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [showDeleteClips, setShowDeleteClips] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast.error(error.message);
    else { toast.success('Password updated!'); setNewPassword(''); }
    setChangingPassword(false);
  };

  const handleDeleteAllClips = async () => {
    if (!user) return;
    setDeleting(true);
    const { error } = await supabase.from('clips').delete().eq('user_id', user.id);
    if (error) toast.error(error.message);
    else toast.success('All clips deleted');
    setDeleting(false);
    setShowDeleteClips(false);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') { toast.error('Type DELETE to confirm'); return; }
    setDeleting(true);
    // Delete all clips first
    if (user) await supabase.from('clips').delete().eq('user_id', user.id);
    await signOut();
    toast.success('Account data cleared. Contact support for full deletion.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Settings" description="Manage your Online Clipboard settings." noindex />
      <Header />

      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input value={user?.email || ''} readOnly className="mt-1 bg-muted" />
            </div>
            <div>
              <Label>Display Name</Label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" className="mt-1" />
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div>
              <Label>New Password</Label>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1" />
            </div>
            <Button onClick={handleChangePassword} disabled={changingPassword}>
              {changingPassword && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Update Password
            </Button>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Dark Mode</Label>
                <p className="text-xs text-muted-foreground">Toggle dark mode on or off</p>
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Danger Zone */}
        <div className="mt-12 border border-destructive/20 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-destructive">Danger Zone</h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Delete all my clips</p>
              <p className="text-xs text-muted-foreground">Permanently delete all your clips</p>
            </div>
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30" onClick={() => setShowDeleteClips(true)}>
              <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete All
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Delete my account</p>
              <p className="text-xs text-muted-foreground">Type &quot;DELETE&quot; to confirm</p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="w-28 h-8 text-xs"
              />
              <Button
                variant="destructive"
                size="sm"
                disabled={deleteConfirmText !== 'DELETE' || deleting}
                onClick={() => setShowDeleteAccount(true)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={showDeleteClips}
        onClose={() => setShowDeleteClips(false)}
        onConfirm={handleDeleteAllClips}
        title="Delete all clips?"
        description="This will permanently delete all your clips. This action cannot be undone."
      />
      <DeleteConfirmDialog
        isOpen={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
        onConfirm={handleDeleteAccount}
        title="Delete account?"
        description="This will delete all your data. This action cannot be undone."
      />
    </div>
  );
};

export default Settings;

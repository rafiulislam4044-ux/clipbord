import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Clip, ClipType, Visibility } from '@/types';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import { toast } from 'sonner';

const CLIP_SELECT = `id, user_id, title, type, content, language, image_url, link_url, link_title, tags, is_password_protected, visibility, is_pinned, expires_at, view_count, created_at, updated_at`;

function mapRow(row: Record<string, unknown>): Clip {
  return {
    id: row.id as string,
    user_id: row.user_id as string,
    title: row.title as string,
    type: row.type as ClipType,
    content: row.content as string | null,
    language: (row.language as string) || 'plaintext',
    image_url: row.image_url as string | null,
    link_url: row.link_url as string | null,
    link_title: row.link_title as string | null,
    tags: (row.tags as string[]) || [],
    is_password_protected: (row.is_password_protected as boolean) || false,
    visibility: (row.visibility as Visibility) || 'private',
    is_pinned: (row.is_pinned as boolean) || false,
    expires_at: row.expires_at as string | null,
    view_count: (row.view_count as number) || 0,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

export function useClips(filter?: string, searchQuery?: string, sortBy?: string) {
  return useQuery({
    queryKey: ['clips', filter, searchQuery, sortBy],
    queryFn: async () => {
      let query = supabase.from('clips').select(CLIP_SELECT);

      if (filter === 'pinned') query = query.eq('is_pinned', true);
      else if (filter === 'text') query = query.eq('type', 'text');
      else if (filter === 'code') query = query.eq('type', 'code');
      else if (filter === 'images') query = query.eq('type', 'image');
      else if (filter === 'links') query = query.eq('type', 'link');
      else if (filter === 'expiring') query = query.not('expires_at', 'is', null);

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      if (sortBy === 'oldest') query = query.order('created_at', { ascending: true });
      else if (sortBy === 'views') query = query.order('view_count', { ascending: false });
      else if (sortBy === 'az') query = query.order('title', { ascending: true });
      else query = query.order('is_pinned', { ascending: false }).order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return (data || []).map(mapRow);
    },
  });
}

export function useClip(id: string) {
  return useQuery({
    queryKey: ['clip', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clips')
        .select(CLIP_SELECT)
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return mapRow(data);
    },
    enabled: !!id,
  });
}

interface CreateClipData {
  type: ClipType;
  title: string;
  content?: string;
  language?: string;
  image_url?: string;
  link_url?: string;
  link_title?: string;
  tags?: string[];
  visibility?: Visibility;
  is_password_protected?: boolean;
  password?: string;
  expires_at?: string;
}

export function useCreateClip() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateClipData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const id = nanoid(10);
      let password_hash: string | null = null;

      if (data.is_password_protected && data.password) {
        const salt = bcrypt.genSaltSync(10);
        password_hash = bcrypt.hashSync(data.password, salt);
      }

      const row = {
        id,
        user_id: user.id,
        title: data.title || 'Untitled Clip',
        type: data.type,
        content: data.content || null,
        language: data.language || 'plaintext',
        image_url: data.image_url || null,
        link_url: data.link_url || null,
        link_title: data.link_title || null,
        tags: data.tags || [],
        visibility: data.visibility || 'private',
        is_password_protected: data.is_password_protected || false,
        password_hash,
        expires_at: data.expires_at || null,
      };
      const { error } = await supabase.from('clips').insert([row]);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clips'] });
      toast.success('Clip saved!');
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

interface UpdateClipData {
  id: string;
  title?: string;
  content?: string;
  language?: string;
  image_url?: string;
  link_url?: string;
  link_title?: string;
  tags?: string[];
  visibility?: Visibility;
  is_password_protected?: boolean;
  password?: string;
  expires_at?: string | null;
  is_pinned?: boolean;
}

export function useUpdateClip() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateClipData) => {
      const updates: Record<string, unknown> = {};
      if (data.title !== undefined) updates.title = data.title;
      if (data.content !== undefined) updates.content = data.content;
      if (data.language !== undefined) updates.language = data.language;
      if (data.image_url !== undefined) updates.image_url = data.image_url;
      if (data.link_url !== undefined) updates.link_url = data.link_url;
      if (data.link_title !== undefined) updates.link_title = data.link_title;
      if (data.tags !== undefined) updates.tags = data.tags;
      if (data.visibility !== undefined) updates.visibility = data.visibility;
      if (data.is_pinned !== undefined) updates.is_pinned = data.is_pinned;
      if (data.expires_at !== undefined) updates.expires_at = data.expires_at;
      if (data.is_password_protected !== undefined) {
        updates.is_password_protected = data.is_password_protected;
        if (data.is_password_protected && data.password) {
          const salt = bcrypt.genSaltSync(10);
          updates.password_hash = bcrypt.hashSync(data.password, salt);
        } else if (!data.is_password_protected) {
          updates.password_hash = null;
        }
      }

      const { error } = await supabase.from('clips').update(updates).eq('id', data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clips'] });
      qc.invalidateQueries({ queryKey: ['clip'] });
      toast.success('Clip updated!');
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

export function useDeleteClip() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('clips').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clips'] });
      toast.success('Clip deleted');
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

export function useTogglePin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_pinned }: { id: string; is_pinned: boolean }) => {
      const { error } = await supabase.from('clips').update({ is_pinned }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clips'] });
      toast.success('Pin toggled');
    },
  });
}

export type ClipType = 'text' | 'code' | 'image' | 'link';
export type Visibility = 'private' | 'public';

export interface Clip {
  id: string;
  user_id: string;
  title: string;
  type: ClipType;
  content: string | null;
  language: string;
  image_url: string | null;
  link_url: string | null;
  link_title: string | null;
  tags: string[];
  is_password_protected: boolean;
  password_hash?: string | null;
  visibility: Visibility;
  is_pinned: boolean;
  expires_at: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
}

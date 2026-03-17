
-- Create the clips table
create table if not exists public.clips (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade NOT NULL,
  title text not null default 'Untitled Clip',
  type text not null check (type in ('text','code','image','link')),
  content text,
  language text default 'plaintext',
  image_url text,
  link_url text,
  link_title text,
  tags text[] default '{}',
  is_password_protected boolean default false,
  password_hash text,
  visibility text default 'private' check (visibility in ('private','public')),
  is_pinned boolean default false,
  expires_at timestamptz,
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.clips enable row level security;

-- Users manage own clips
create policy "Users manage own clips"
  on public.clips for all using (auth.uid() = user_id);

-- Anyone reads public clips
create policy "Anyone reads public clips"
  on public.clips for select using (visibility = 'public');

-- Auto-update updated_at
create or replace function public.update_clips_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = public;

create trigger update_clips_updated_at
  before update on public.clips
  for each row execute function public.update_clips_updated_at();

-- Password verification RPC
create or replace function public.verify_clip_password(p_clip_id text)
returns json
language plpgsql security definer set search_path = public as $$
declare
  v_clip record;
begin
  select id, password_hash, is_password_protected, view_count
  into v_clip
  from public.clips
  where id = p_clip_id;

  if not found then
    return json_build_object('success', false, 'error', 'Clip not found');
  end if;

  update public.clips set view_count = view_count + 1 where id = p_clip_id;

  return json_build_object(
    'success', true,
    'hash', v_clip.password_hash,
    'is_protected', v_clip.is_password_protected
  );
end;
$$;

-- Storage buckets
insert into storage.buckets (id, name, public) values ('clip-images', 'clip-images', true);
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

-- Storage policies
create policy "Public read clip images" on storage.objects for select using (bucket_id = 'clip-images');
create policy "Auth users upload clip images" on storage.objects for insert with check (bucket_id = 'clip-images' and auth.role() = 'authenticated');
create policy "Users delete own clip images" on storage.objects for delete using (bucket_id = 'clip-images' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Public read avatars" on storage.objects for select using (bucket_id = 'avatars');
create policy "Auth users upload avatars" on storage.objects for insert with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users update own avatars" on storage.objects for update using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

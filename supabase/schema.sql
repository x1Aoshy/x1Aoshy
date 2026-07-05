-- Esquema para el panel admin del portafolio.
-- Ejecutar en el SQL Editor de Supabase (una sola vez).

create table if not exists public.profile (
  id int primary key default 1 check (id = 1),
  name text not null default 'Hian Chang',
  roles text[] not null default '{}',
  bio text not null default '',
  email text not null default '',
  github text not null default '',
  available boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  tags text[] not null default '{}',
  url text not null default '',
  repo text not null default '',
  sort_order int not null default 0
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  period text not null default '',
  title text not null,
  place text not null default '',
  description text not null default '',
  tags text[] not null default '{}',
  sort_order int not null default 0
);

-- Fila única de perfil
insert into public.profile (id) values (1) on conflict (id) do nothing;

-- RLS: lectura pública, escritura solo para usuarios autenticados
alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.experience enable row level security;

create policy "public read profile" on public.profile
  for select using (true);
create policy "auth write profile" on public.profile
  for all to authenticated using (true) with check (true);

create policy "public read projects" on public.projects
  for select using (true);
create policy "auth write projects" on public.projects
  for all to authenticated using (true) with check (true);

create policy "public read experience" on public.experience
  for select using (true);
create policy "auth write experience" on public.experience
  for all to authenticated using (true) with check (true);

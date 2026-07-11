create table if not exists public.pedidos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  code text unique not null,
  cliente text,
  telefone text,
  itens jsonb not null default '[]'::jsonb,
  total text,
  pagamento text,
  endereco text,
  step integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.pedidos
add column if not exists user_id uuid references auth.users(id);

create index if not exists pedidos_user_id_idx on public.pedidos(user_id);

alter table public.pedidos enable row level security;

drop policy if exists "Pedidos podem ser criados pelo site" on public.pedidos;
create policy "Pedidos podem ser criados pelo site"
on public.pedidos for insert
to anon, authenticated
with check (true);

drop policy if exists "Pedidos podem ser lidos pelo site" on public.pedidos;
create policy "Pedidos podem ser lidos pelo site"
on public.pedidos for select
to anon, authenticated
using (true);

drop policy if exists "Administracao pode atualizar status" on public.pedidos;
create policy "Administracao pode atualizar status"
on public.pedidos for update
to anon, authenticated
using (true)
with check (step between 0 and 3);

drop policy if exists "Administracao pode limpar pedidos" on public.pedidos;
create policy "Administracao pode limpar pedidos"
on public.pedidos for delete
to anon, authenticated
using (true);

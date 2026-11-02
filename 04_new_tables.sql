-- HOPE, INC. ERP DATABASE (Supabase / PostgreSQL)
-- Run in Supabase Dashboard > SQL Editor.
-- IMPORTANT: this script creates tables and RLS. Never put service_role keys in browser code.

create extension if not exists pgcrypto;

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'User' check (role in ('Superadmin','Admin','User')),
  allowed_modules text[] not null default '{}',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.user_profiles(id,email,display_name,role)
  values(new.id,new.email,coalesce(new.raw_user_meta_data->>'display_name','New user'),'User')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.current_role()
returns text language sql stable security definer set search_path=public
as $$ select role from public.user_profiles where id=auth.uid() $$;

create or replace function public.has_module(module_name text)
returns boolean language sql stable security definer set search_path=public
as $$
  select public.current_role() in ('Superadmin','Admin')
  or exists(select 1 from public.user_profiles where id=auth.uid() and module_name=any(allowed_modules))
$$;

create table if not exists public.customers (
 id uuid primary key default gen_random_uuid(), customer_name text not null,
 company_name text, email text, phone text, street_address text, city text,
 province text, postal_code text, notes text, status text default 'Active',
 is_deleted boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(), product_name text not null,
 sku text unique, category text, unit text, description text,
 unit_price numeric(12,2) not null default 0, current_price numeric(12,2) not null default 0,
 status text default 'Active', created_at timestamptz not null default now()
);
create table if not exists public.price_history (
 id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id) on delete cascade,
 previous_price numeric(12,2), new_price numeric(12,2) not null,
 effective_date date not null default current_date, changed_by uuid references auth.users(id),
 created_at timestamptz not null default now()
);
create table if not exists public.departments (
 id uuid primary key default gen_random_uuid(), department_name text not null,
 description text, status text default 'Active', created_at timestamptz not null default now()
);
create table if not exists public.jobs (
 id uuid primary key default gen_random_uuid(), job_title text not null,
 department_id uuid references public.departments(id) on delete set null,
 description text, status text default 'Active', created_at timestamptz not null default now()
);
create table if not exists public.job_history (
 id uuid primary key default gen_random_uuid(), job_id uuid not null references public.jobs(id) on delete cascade,
 change_description text not null, start_date date not null default current_date,
 changed_by uuid references auth.users(id), created_at timestamptz not null default now()
);
create table if not exists public.employees (
 id uuid primary key default gen_random_uuid(), first_name text not null, last_name text not null,
 email text, phone text, department_id uuid references public.departments(id),
 job_id uuid references public.jobs(id), hire_date date, status text default 'Active',
 created_at timestamptz not null default now()
);
create table if not exists public.sales (
 id uuid primary key default gen_random_uuid(), customer_id uuid references public.customers(id),
 sale_date date not null default current_date, total_amount numeric(12,2) not null default 0,
 payment_status text not null default 'Unpaid', balance numeric(12,2) not null default 0,
 notes text, created_at timestamptz not null default now()
);
create table if not exists public.sale_items (
 id uuid primary key default gen_random_uuid(), sale_id uuid not null references public.sales(id) on delete cascade,
 product_id uuid references public.products(id), quantity numeric(12,2) not null default 1,
 unit_price numeric(12,2) not null default 0, line_total numeric(12,2) not null default 0
);
create table if not exists public.payments (
 id uuid primary key default gen_random_uuid(), sale_id uuid not null references public.sales(id) on delete cascade,
 payment_date date not null default current_date, method text, reference text,
 amount numeric(12,2) not null check(amount > 0), created_at timestamptz not null default now()
);

-- Enable Row Level Security on every application table.
do $$
declare t text;
begin
 foreach t in array array['user_profiles','customers','products','price_history','departments','jobs','job_history','employees','sales','sale_items','payments']
 loop execute format('alter table public.%I enable row level security',t); end loop;
end $$;

-- Profiles: users can read their own profile. Superadmin can read all profiles.
drop policy if exists "profile read" on public.user_profiles;
create policy "profile read" on public.user_profiles for select to authenticated
using (id=auth.uid() or public.current_role()='Superadmin');
-- No client-side insert/update/delete policy for profiles. Role changes must be performed
-- through a trusted server/Edge Function after checking the caller is Superadmin.

-- Standard module policies. Admin and Superadmin can manage modules.
do $$
declare t text; module_name text;
begin
 for t,module_name in select * from (values
 ('customers','Customers'),('products','Products'),('price_history','Products'),
 ('departments','Human Resources'),('jobs','Human Resources'),('job_history','Human Resources'),
 ('employees','Human Resources'),('sales','Sales'),('sale_items','Sales'),('payments','Sales')
 ) as x(table_name,module_name)
 loop
   execute format('drop policy if exists %I on public.%I',t||'_module_access',t);
   execute format('create policy %I on public.%I for all to authenticated using (public.has_module(%L)) with check (public.has_module(%L))',
     t||'_module_access',t,module_name,module_name);
 end loop;
end $$;

-- Create your first Superadmin:
-- 1) Sign up once through the website.
-- 2) In Supabase > Authentication > Users, copy that user's UUID.
-- 3) Replace THE_AUTH_USER_UUID below and run this statement separately:
-- update public.user_profiles set role='Superadmin' where id='THE_AUTH_USER_UUID';
-- Never let public registration choose its own role.

-- Northbridge Frontier Services — records/receipts/tracking schema
-- Lives in the Colbis House Supabase project, fully isolated via the nb_ prefix.
-- Run via the Supabase SQL Editor or `supabase db execute` — never against
-- any project other than the one colbishouse.com uses.

create type nb_service_type_enum as enum (
  'home_residential_security','corporate_commercial_security','cctv_installation',
  'storage_of_valuables','security_escorts','security_dogs'
);

create type nb_id_type_enum as enum ('passport','national_id','other');

create type nb_record_status_enum as enum (
  'pending_assessment','proposal_sent','agreed','active','completed','cancelled'
);

create type nb_doc_type_enum as enum ('custody_receipt','service_confirmation');

create type nb_staff_role_enum as enum ('staff','admin','super_admin');

create table public.nb_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role nb_staff_role_enum not null default 'staff',
  email text not null,
  created_at timestamptz not null default now()
);

create table public.nb_clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  id_type nb_id_type_enum not null,
  id_number text not null,
  phone text not null,
  email text,
  address text,
  created_at timestamptz not null default now()
);

create table public.nb_tracking_counters (
  yymm text primary key,
  seq int not null default 0
);

create table public.nb_service_records (
  id uuid primary key default gen_random_uuid(),
  tracking_number text unique,
  client_id uuid not null references public.nb_clients(id),
  service_type nb_service_type_enum not null,
  status nb_record_status_enum not null default 'pending_assessment',
  assigned_staff_id uuid references public.nb_profiles(id),
  created_by uuid references public.nb_profiles(id),
  details jsonb not null default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_nb_service_records_status on public.nb_service_records(status);
create index idx_nb_service_records_details on public.nb_service_records using gin(details);

create table public.nb_status_history (
  id uuid primary key default gen_random_uuid(),
  service_record_id uuid not null references public.nb_service_records(id) on delete cascade,
  status nb_record_status_enum not null,
  changed_by uuid references public.nb_profiles(id),
  note text,
  changed_at timestamptz not null default now()
);

create table public.nb_documents (
  id uuid primary key default gen_random_uuid(),
  service_record_id uuid not null references public.nb_service_records(id) on delete cascade,
  doc_type nb_doc_type_enum not null,
  file_path text not null,
  generated_by uuid references public.nb_profiles(id),
  generated_at timestamptz not null default now(),
  emailed_at timestamptz,
  whatsapp_shared_at timestamptz
);

create table public.nb_track_attempts (
  id uuid primary key default gen_random_uuid(),
  tracking_number text not null,
  attempted_at timestamptz not null default now()
);

create or replace function public.nb_current_profile_role() returns text
language sql security definer stable set search_path = public as $$
  select role::text from public.nb_profiles where id = auth.uid();
$$;

create or replace function public.nb_generate_tracking_number()
returns text
language plpgsql security definer set search_path = public as $$
declare
  v_yymm text := to_char(now(), 'YYMM');
  v_seq int;
begin
  insert into public.nb_tracking_counters(yymm, seq)
  values (v_yymm, 1)
  on conflict (yymm) do update set seq = nb_tracking_counters.seq + 1
  returning seq into v_seq;
  return 'NBF-' || v_yymm || '-' || lpad(v_seq::text, 4, '0');
end;
$$;

create or replace function public.nb_set_tracking_number()
returns trigger language plpgsql as $$
begin
  if new.tracking_number is null then
    new.tracking_number := public.nb_generate_tracking_number();
  end if;
  if new.created_by is null then
    new.created_by := auth.uid();
  end if;
  return new;
end;
$$;

create trigger trg_nb_set_tracking_number
before insert on public.nb_service_records
for each row execute function public.nb_set_tracking_number();

create or replace function public.nb_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_nb_service_records_updated_at
before update on public.nb_service_records
for each row execute function public.nb_set_updated_at();

create or replace function public.nb_log_status_change()
returns trigger language plpgsql as $$
begin
  if (tg_op = 'INSERT') or (new.status is distinct from old.status) then
    insert into public.nb_status_history(service_record_id, status, changed_by)
    values (new.id, new.status, auth.uid());
  end if;
  return new;
end;
$$;

create trigger trg_nb_log_status_insert
after insert on public.nb_service_records
for each row execute function public.nb_log_status_change();

create trigger trg_nb_log_status_update
after update on public.nb_service_records
for each row execute function public.nb_log_status_change();

create or replace function public.nb_track_record(p_tracking_number text, p_verify_value text)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_record public.nb_service_records%rowtype;
  v_client public.nb_clients%rowtype;
  v_ok boolean := false;
  v_attempts int;
  v_document_id uuid;
  v_result jsonb;
begin
  select count(*) into v_attempts from public.nb_track_attempts
  where tracking_number = p_tracking_number and attempted_at > now() - interval '15 minutes';

  if v_attempts >= 8 then
    return null;
  end if;

  insert into public.nb_track_attempts(tracking_number) values (p_tracking_number);

  select * into v_record from public.nb_service_records where tracking_number = p_tracking_number;
  if not found then return null; end if;

  select * into v_client from public.nb_clients where id = v_record.client_id;

  if v_client.phone is not null
     and right(regexp_replace(v_client.phone, '\D','','g'), 4) = right(regexp_replace(coalesce(p_verify_value,''), '\D','','g'), 4)
     and length(regexp_replace(coalesce(p_verify_value,''), '\D','','g')) >= 4 then
    v_ok := true;
  end if;

  if not v_ok and v_client.id_number is not null and v_client.id_number = p_verify_value then
    v_ok := true;
  end if;

  if not v_ok then return null; end if;

  select id into v_document_id from public.nb_documents
  where service_record_id = v_record.id order by generated_at desc limit 1;

  select jsonb_build_object(
    'tracking_number', v_record.tracking_number,
    'service_type', v_record.service_type,
    'status', v_record.status,
    'created_at', v_record.created_at,
    'document_id', v_document_id,
    'summary', case v_record.service_type
      when 'storage_of_valuables' then jsonb_build_object('commodity', v_record.details->>'commodity', 'quantity', v_record.details->>'quantity')
      when 'home_residential_security' then jsonb_build_object('duty_schedule', v_record.details->>'duty_schedule')
      when 'corporate_commercial_security' then jsonb_build_object('duty_schedule', v_record.details->>'duty_schedule')
      when 'cctv_installation' then jsonb_build_object('camera_count', v_record.details->>'camera_count')
      when 'security_escorts' then jsonb_build_object('escort_date', v_record.details->>'escort_date')
      when 'security_dogs' then jsonb_build_object('deployment_schedule', v_record.details->>'deployment_schedule')
      else '{}'::jsonb
    end,
    'timeline', (
      select coalesce(jsonb_agg(jsonb_build_object('status', sh.status, 'changed_at', sh.changed_at) order by sh.changed_at), '[]'::jsonb)
      from public.nb_status_history sh where sh.service_record_id = v_record.id
    )
  ) into v_result;

  return v_result;
end;
$$;

grant execute on function public.nb_track_record(text, text) to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('nb-documents', 'nb-documents', false)
on conflict (id) do nothing;

create policy "nb_documents_bucket_select_authenticated" on storage.objects for select
using (bucket_id = 'nb-documents' and auth.uid() is not null);

create policy "nb_documents_bucket_insert_authenticated" on storage.objects for insert
with check (bucket_id = 'nb-documents' and auth.uid() is not null);

create policy "nb_documents_bucket_update_authenticated" on storage.objects for update
using (bucket_id = 'nb-documents' and auth.uid() is not null);

alter table public.nb_profiles enable row level security;
alter table public.nb_clients enable row level security;
alter table public.nb_service_records enable row level security;
alter table public.nb_status_history enable row level security;
alter table public.nb_documents enable row level security;
alter table public.nb_track_attempts enable row level security;

create policy "nb_profiles_select_self_or_admin" on public.nb_profiles
for select using (id = auth.uid() or public.nb_current_profile_role() in ('admin','super_admin'));

create policy "nb_profiles_update_self_or_admin" on public.nb_profiles
for update using (id = auth.uid() or public.nb_current_profile_role() in ('admin','super_admin'));

create policy "nb_profiles_insert_super_admin" on public.nb_profiles
for insert with check (public.nb_current_profile_role() = 'super_admin');

create policy "nb_profiles_delete_super_admin" on public.nb_profiles
for delete using (public.nb_current_profile_role() = 'super_admin');

create policy "nb_clients_select_authenticated" on public.nb_clients for select using (auth.uid() is not null);
create policy "nb_clients_insert_authenticated" on public.nb_clients for insert with check (auth.uid() is not null);
create policy "nb_clients_update_authenticated" on public.nb_clients for update using (auth.uid() is not null);

create policy "nb_service_records_select_authenticated" on public.nb_service_records for select using (auth.uid() is not null);
create policy "nb_service_records_insert_authenticated" on public.nb_service_records for insert with check (auth.uid() is not null);
create policy "nb_service_records_update_authenticated" on public.nb_service_records for update using (auth.uid() is not null);

create policy "nb_status_history_select" on public.nb_status_history for select
using (exists (select 1 from public.nb_service_records sr where sr.id = service_record_id));

create policy "nb_status_history_insert" on public.nb_status_history for insert
with check (exists (select 1 from public.nb_service_records sr where sr.id = service_record_id));

create policy "nb_documents_select" on public.nb_documents for select
using (exists (select 1 from public.nb_service_records sr where sr.id = service_record_id));

create policy "nb_documents_insert" on public.nb_documents for insert
with check (exists (select 1 from public.nb_service_records sr where sr.id = service_record_id));

create policy "nb_documents_update" on public.nb_documents for update
using (exists (select 1 from public.nb_service_records sr where sr.id = service_record_id));

-- nb_track_attempts: RLS enabled, no policies at all — only the SECURITY DEFINER
-- function above can read or write it. This is deliberate, not an oversight.

-- New portfolio tables only. Existing nutrition data and policies are untouched.
create table public.portfolio_ai_records (
 id uuid primary key default gen_random_uuid(),
 owner_key text not null check(owner_key ~ '^[a-f0-9]{64}$'),
 kind text not null check(kind in ('support-desk','meeting-notes')),
 source text not null check(char_length(source) between 30 and 6000),
 result jsonb not null check(jsonb_typeof(result)='object'),
 state text not null default 'Open' check(state in ('Open','Reviewed','Done')),
 created_at timestamptz not null default now()
);
create index portfolio_ai_owner_created on public.portfolio_ai_records(owner_key,created_at desc);
alter table public.portfolio_ai_records enable row level security;
revoke all on public.portfolio_ai_records from anon,authenticated;
grant select,insert,update,delete on public.portfolio_ai_records to anon;
-- Anonymous capability authorization: a 256-bit browser token is HttpOnly;
-- the server sends its SHA-256 digest as this header. It is never returned to JS.
create policy portfolio_workspace on public.portfolio_ai_records to anon
using(owner_key=(current_setting('request.headers',true)::jsonb->>'x-workspace-key') and created_at > now()-interval '30 days')
with check(owner_key=(current_setting('request.headers',true)::jsonb->>'x-workspace-key'));
create table public.portfolio_ai_usage (
 owner_key text not null,ip_key text not null,created_at timestamptz not null default now()
);
create index portfolio_usage_time on public.portfolio_ai_usage(created_at);
alter table public.portfolio_ai_usage enable row level security;
revoke all on public.portfolio_ai_usage from public,anon,authenticated;
-- This bounded function needs elevated access only to its private quota ledger.
-- Callers cannot select, change, or clear usage. The global cap cannot be bypassed
-- by changing a cookie, IP header, or directly calling the public RPC.
create function public.portfolio_ai_budget(p_ip text) returns boolean
language plpgsql security definer set search_path='' as $$
declare owner text; total_count integer; ip_count integer; owner_count integer;
begin
 owner:=current_setting('request.headers',true)::jsonb->>'x-workspace-key';
 if owner is null or owner !~ '^[a-f0-9]{64}$' or p_ip is null or p_ip !~ '^[a-f0-9]{64}$' then return false; end if;
 perform pg_advisory_xact_lock(867452091);
 delete from public.portfolio_ai_usage where created_at < now()-interval '1 day';
 -- Retention cleanup is lazy: it runs on the next generation request.
 delete from public.portfolio_ai_records where created_at < now()-interval '30 days';
 select count(*),count(*) filter(where ip_key=p_ip),count(*) filter(where owner_key=owner)
 into total_count,ip_count,owner_count from public.portfolio_ai_usage;
 if total_count>=100 or ip_count>=10 or owner_count>=8 then return false; end if;
 insert into public.portfolio_ai_usage(owner_key,ip_key) values(owner,p_ip);
 return true;
end;
$$;
revoke all on function public.portfolio_ai_budget(text) from public,anon,authenticated;
grant execute on function public.portfolio_ai_budget(text) to anon;

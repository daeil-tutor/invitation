-- 초대장 · 참석 응답 테이블 (src/lib/mock.ts의 Invitation, RSVPResponse 타입과 같은 컬럼)
-- Supabase 대시보드 > SQL Editor에 붙여넣고 Run 한다.

-- 1. 초대장
create table invitations (
  id uuid primary key default gen_random_uuid(), -- 추측하기 어려운 고유 ID
  title text not null check (char_length(trim(title)) > 0),
  date timestamptz not null, -- 일시 (시간대 포함)
  location text not null check (char_length(trim(location)) > 0), -- 주소 글자
  body text not null
);

-- 2. 참석 응답
create table rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references invitations (id), -- 어느 초대장에 대한 응답인지
  name text not null check (char_length(trim(name)) between 1 and 50),
  status text not null check (status in ('yes', 'no')), -- yes = 참석, no = 불참
  companions integer not null default 0 check (companions >= 0), -- 동반 인원 (본인 제외)
  check (status = 'yes' or companions = 0) -- 불참이면 동반 인원은 0
);

-- 응답 현황 화면에서 초대장 ID로 응답을 빨리 찾기 위한 색인
create index rsvp_responses_invitation_id_idx on rsvp_responses (invitation_id);

-- 3. RLS 켜기 (규칙에 허용한 것만 할 수 있게 된다)
alter table invitations enable row level security;
alter table rsvp_responses enable row level security;

-- 4. 누구나 읽기·쓰기(추가) 허용
--    수정(update)·삭제(delete) 규칙은 만들지 않았으므로 자동으로 막힌다.
create policy "누구나 초대장 읽기" on invitations
  for select to anon, authenticated using (true);

create policy "누구나 초대장 만들기" on invitations
  for insert to anon, authenticated with check (true);

create policy "누구나 응답 읽기" on rsvp_responses
  for select to anon, authenticated using (true);

create policy "누구나 응답 제출" on rsvp_responses
  for insert to anon, authenticated with check (true);

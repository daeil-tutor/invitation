import {
  mockInvitation,
  mockInvitations,
  mockResponses,
  type Invitation,
  type RSVPResponse,
} from "@/lib/mock";

// 참석 응답 입력 제한 (임시값 — 사용자와 정한 뒤 바꿀 수 있다)
export const NAME_MAX = 20; // 이름 최대 글자 수
export const COMPANIONS_MAX = 10; // 동반 인원 최대값

// 개발용 별칭 — Supabase 연결 후 지울 것
// /i/demo, /i/demo/responses 주소로 가짜 초대장을 볼 수 있게 한다.
export const DEMO_ID = "demo";

// 초대장 하나 가져오기. 없으면 null.
// TODO: Supabase — 지금은 가짜 데이터(mock)에서 찾는다. 나중에 이 함수 안만 바꾸면 된다.
export async function getInvitation(id: string): Promise<Invitation | null> {
  if (id === DEMO_ID) return mockInvitation;
  return mockInvitations.find((invitation) => invitation.id === id) ?? null;
}

// 초대장 하나에 달린 참석 응답 목록. invitationId는 초대장의 실제 id(invitation.id)를 넘긴다.
// TODO: Supabase — 지금은 가짜 데이터(mock)에서 고른다.
export async function getResponses(invitationId: string): Promise<RSVPResponse[]> {
  return mockResponses.filter((response) => response.invitationId === invitationId);
}

// 응답 현황 숫자 3개
// 참석 인원 합계 = 참석 응답마다 (본인 1명 + 동반 인원)을 더한 값. 불참은 세지 않는다.
export function summarizeResponses(responses: RSVPResponse[]) {
  const attending = responses.filter((response) => response.status === "yes");
  return {
    yesCount: attending.length,
    noCount: responses.filter((response) => response.status === "no").length,
    totalGuests: attending.reduce((sum, response) => sum + 1 + response.companions, 0),
  };
}

// ISO 날짜(2026-12-20T19:00:00+09:00)를 "2026년 12월 20일 (일) 19:00"처럼 보여준다.
// 임시 결정: 일시 입력 방식이 정해지면 바뀔 수 있다.
export function formatDate(iso: string) {
  const parts = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}년 ${get("month")} ${get("day")}일 (${get("weekday")}) ${get("hour")}:${get("minute")}`;
}

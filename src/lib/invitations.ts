// 초대장·참석 응답의 모양(타입)과 화면에서 같이 쓰는 작은 함수들.
// 브라우저 화면에서도 불러 쓰므로 여기에는 Supabase 코드를 넣지 않는다. (DB 코드는 lib/data.ts)

// 초대장: 제목 · 일시 · 장소 · 본문
export type Invitation = {
  id: string; // 추측하기 어려운 고유 ID (crypto.randomUUID() 형식)
  title: string;
  date: string; // 일시 (ISO 형식)
  location: string; // 주소를 글자로만 표시
  body: string;
};

// 참석 응답: 이름 · 참석 여부 · 동반 인원
export type RSVPResponse = {
  id: string;
  invitationId: string; // 어느 초대장에 대한 응답인지
  name: string;
  status: "yes" | "no"; // yes = 참석, no = 불참
  companions: number; // 동반 인원 (본인 제외, 불참이면 0)
};

// 참석 응답 입력 제한 (임시값 — 사용자와 정한 뒤 바꿀 수 있다)
export const NAME_MAX = 20; // 이름 최대 글자 수
export const COMPANIONS_MAX = 10; // 동반 인원 최대값

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

// 날짜·시간 선택칸 값(2026-12-20T19:00)을 한국 시간 ISO(2026-12-20T19:00:00+09:00)로 바꾼다.
export function toKoreanIso(localValue: string) {
  return `${localValue}:00+09:00`;
}

// ISO 날짜(2026-12-20T19:00:00+09:00)를 "2026년 12월 20일 (일) 19:00"처럼 보여준다.
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

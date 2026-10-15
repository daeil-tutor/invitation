// 가짜 데이터 (docs/PRD.md 기준)
// Supabase를 연결하기 전에 화면을 만들어 보고 확인하는 용도다.

// 초대장: 제목 · 일시 · 장소 · 본문
export type Invitation = {
  id: string; // 추측하기 어려운 고유 ID (crypto.randomUUID() 형식)
  title: string;
  date: string; // 일시 (ISO 형식, 한국 시간)
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

export const mockInvitation: Invitation = {
  id: "3f9c2a7e-8b41-4d6a-9e15-c0a7b2d4e861",
  title: "연말 모임에 초대합니다",
  date: "2026-12-20T19:00:00+09:00",
  location: "서울특별시 성동구 성수이로 113, 2층",
  body: "한 해 동안 고마웠던 분들과 따뜻한 저녁을 함께하고 싶어요.\n편하게 오셔서 즐거운 시간 보내요!",
};

// 응답이 아직 없는 초대장 (응답 0건 화면 확인용, Figma 프레임 2168:952의 값)
// 이 초대장의 응답은 mockResponses에 넣지 않는다.
export const mockEmptyInvitation: Invitation = {
  id: "empty",
  title: "허들링 클럽 2번째 오프라인 밋업",
  date: "2026-11-14T09:00:00+09:00",
  location: "세종 남극 기지",
  body: "두 번째 오프라인 밋업에 초대합니다.\n함께 이야기 나눠요!",
};

// 가짜 초대장 목록 (id로 찾을 때 쓴다)
export const mockInvitations: Invitation[] = [mockInvitation, mockEmptyInvitation];

// 참석 2명(그중 1명은 동반 2명) + 불참 1명
// 참석 인원 합계 = 참석자 본인 + 동반 인원 → 이 데이터에서는 (1 + 2) + (1 + 0) = 4명
export const mockResponses: RSVPResponse[] = [
  {
    id: "a1d4e6f2-3b5c-4e7a-8f90-12ab34cd56ef",
    invitationId: mockInvitation.id,
    name: "김하나",
    status: "yes",
    companions: 2,
  },
  {
    id: "b7c8d9e0-1f2a-4b3c-9d4e-5f6a7b8c9d0e",
    invitationId: mockInvitation.id,
    name: "이두리",
    status: "no",
    companions: 0,
  },
  {
    id: "c2e3f4a5-6b7c-4d8e-a9f0-1a2b3c4d5e6f",
    invitationId: mockInvitation.id,
    name: "박세나",
    status: "yes",
    companions: 0,
  },
];

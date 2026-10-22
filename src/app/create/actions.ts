"use server";

import { insertInvitation } from "@/lib/data";
import { toKoreanIso, type Invitation } from "@/lib/invitations";

// 호스트가 보낸 초대장을 서버에서 다시 검사하고 저장한다 (브라우저 검사는 우회될 수 있기 때문)

type Draft = Pick<Invitation, "title" | "date" | "location" | "body">;

export type PublishResult = { ok: true; id: string } | { ok: false; error: string };

// 날짜·시간 선택칸 값 모양: 2026-12-20T19:00
const LOCAL_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

export async function publishInvitation(draft: Draft): Promise<PublishResult> {
  const title = String(draft.title ?? "").trim();
  const location = String(draft.location ?? "").trim();
  const body = String(draft.body ?? "").trim();
  const date = String(draft.date ?? "");

  if (!title || !location || !body) {
    return { ok: false, error: "제목·장소·본문을 모두 입력해주세요." };
  }
  if (!LOCAL_DATETIME.test(date) || Number.isNaN(Date.parse(toKoreanIso(date)))) {
    return { ok: false, error: "일시를 다시 선택해주세요." };
  }

  try {
    const id = await insertInvitation({ title, location, body, date: toKoreanIso(date) });
    return { ok: true, id };
  } catch {
    return { ok: false, error: "저장하지 못했어요. 잠시 후 다시 시도해주세요." };
  }
}

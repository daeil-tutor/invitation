"use server";

import { COMPANIONS_MAX, NAME_MAX, getInvitation } from "@/lib/invitations";
import type { RSVPResponse } from "@/lib/mock";

// 게스트가 보낸 참석 응답을 서버에서 다시 검사한다 (브라우저 검사는 우회될 수 있기 때문)

type RSVPResult = Pick<RSVPResponse, "name" | "status" | "companions">;

export type RSVPState =
  | { ok: true; result: RSVPResult }
  | { ok: false; error: string }
  | null; // 아직 제출 전

export async function submitRSVP(
  invitationId: string,
  _prevState: RSVPState,
  formData: FormData,
): Promise<RSVPState> {
  const invitation = await getInvitation(invitationId);
  if (!invitation) {
    return { ok: false, error: "초대장을 찾을 수 없어요." };
  }

  // 이름: 앞뒤 공백을 빼고 검사
  const name = String(formData.get("name") ?? "").trim();
  if (name === "") {
    return { ok: false, error: "이름을 입력해주세요." };
  }
  if (name.length > NAME_MAX) {
    return { ok: false, error: `이름은 ${NAME_MAX}자 이하로 입력해주세요.` };
  }

  // 참석 여부: yes / no 만 허용
  const status = formData.get("status");
  if (status !== "yes" && status !== "no") {
    return { ok: false, error: "참석 여부를 선택해주세요." };
  }

  // 동반 인원: 0 이상 COMPANIONS_MAX 이하의 정수
  const companions = Number(formData.get("companions"));
  if (!Number.isInteger(companions) || companions < 0 || companions > COMPANIONS_MAX) {
    return { ok: false, error: `동반 인원은 0~${COMPANIONS_MAX}명 사이로 입력해주세요.` };
  }

  // 불참이면 동반 인원은 0으로 저장 (임시 결정)
  const result: RSVPResult = {
    name,
    status,
    companions: status === "no" ? 0 : companions,
  };

  // TODO: Supabase에 저장
  return { ok: true, result };
}

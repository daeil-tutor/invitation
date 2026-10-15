"use client";

import { useActionState } from "react";
import RSVPCard from "@/components/RSVPCard";
import { COMPANIONS_MAX } from "@/lib/invitations";
import { submitRSVP, type RSVPState } from "./actions";

// 참석 신청 카드. 제출하면 서버 액션(submitRSVP)이 검사하고,
// 성공하면 같은 자리에서 완료 상태(state="done")로 바뀐다. 페이지 이동은 없다.
export default function RSVPSection({ invitationId }: { invitationId: string }) {
  const [state, formAction, pending] = useActionState<RSVPState, FormData>(
    submitRSVP.bind(null, invitationId),
    null,
  );

  if (state?.ok) {
    return <RSVPCard state="done" result={state.result} />;
  }

  return (
    <RSVPCard
      state="form"
      formAction={formAction}
      pending={pending}
      companionsMax={COMPANIONS_MAX}
      error={state?.error}
    />
  );
}

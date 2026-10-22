import { cacheLife } from "next/cache";
import { connection } from "next/server";
import type { Invitation, RSVPResponse } from "@/lib/invitations";
import { supabase } from "@/lib/supabase";

// Supabase에서 초대장·응답을 읽고 쓰는 함수들 (서버에서만 쓴다)
// 테이블은 supabase/schema.sql 참고. DB 컬럼 invitation_id ↔ 코드 invitationId

// uuid 모양이 아니면 DB에 묻지 않고 "없는 초대장"으로 본다
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// 빌드할 때 미리 만들어 볼 자리표시용 id. DB에 없으므로 404가 된다.
// (cacheComponents 사용 시 generateStaticParams가 최소 1개를 돌려줘야 해서 쓴다)
export const PLACEHOLDER_ID = "placeholder";

// 초대장 하나 가져오기. 없으면 null.
// 초대장은 발행 후 바뀌지 않으므로 오래 캐시해 둔다.
export async function getInvitation(id: string): Promise<Invitation | null> {
  "use cache";
  cacheLife("max");

  if (!UUID_PATTERN.test(id)) return null;

  const { data, error } = await supabase
    .from("invitations")
    .select("id, title, date, location, body")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`초대장을 불러오지 못했어요: ${error.message}`);
  return data;
}

// 초대장 하나에 달린 참석 응답 목록.
// 새 응답이 바로 보여야 하므로 캐시하지 않고 요청마다 새로 읽는다.
export async function getResponses(invitationId: string): Promise<RSVPResponse[]> {
  await connection();

  const { data, error } = await supabase
    .from("rsvp_responses")
    .select("id, invitation_id, name, status, companions")
    .eq("invitation_id", invitationId);

  if (error) throw new Error(`응답을 불러오지 못했어요: ${error.message}`);
  return data.map((row) => ({
    id: row.id,
    invitationId: row.invitation_id,
    name: row.name,
    status: row.status,
    companions: row.companions,
  }));
}

// 새 초대장 저장. 저장한 초대장의 id를 돌려준다.
export async function insertInvitation(draft: Omit<Invitation, "id">): Promise<string> {
  const id = crypto.randomUUID();
  const { error } = await supabase.from("invitations").insert({ id, ...draft });
  if (error) throw new Error(`초대장을 저장하지 못했어요: ${error.message}`);
  return id;
}

// 참석 응답 저장
export async function insertResponse(response: Omit<RSVPResponse, "id">) {
  const { error } = await supabase.from("rsvp_responses").insert({
    invitation_id: response.invitationId,
    name: response.name,
    status: response.status,
    companions: response.companions,
  });
  if (error) throw new Error(`응답을 저장하지 못했어요: ${error.message}`);
}

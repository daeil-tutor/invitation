import { notFound } from "next/navigation";
import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import InvitationCover from "@/components/InvitationCover";
import { formatDate, getInvitation } from "@/lib/invitations";
import { mockInvitation } from "@/lib/mock";
import RSVPSection from "./RSVPSection";

// /i/[id] — 게스트가 초대장을 보고 참석 여부를 보내는 화면 (Figma 프레임 2168:923)

// 빌드할 때 미리 만들어 둘 초대장 id (cacheComponents 사용 시 최소 1개 필요)
// TODO: Supabase — 연결 후에는 대표 초대장 id 하나만 돌려줘도 된다.
export function generateStaticParams() {
  return [{ id: mockInvitation.id }];
}

export default async function InvitationPage({ params }: PageProps<"/i/[id]">) {
  const { id } = await params;
  const invitation = await getInvitation(id);
  // 없는 초대장이면 404 화면 (Suspense 밖에서 호출해야 진짜 404 상태 코드가 나간다)
  if (!invitation) notFound();

  const date = formatDate(invitation.date);

  return (
    <div className="mx-auto flex w-full max-w-375 flex-col bg-surface-default">
      <InvitationCover
        title={invitation.title}
        date={date}
        location={invitation.location}
        imageAlt="초대장 대표 그림"
      />

      {/* 본문 */}
      <div className="flex w-full flex-col items-center gap-16 px-20 py-80">
        <Image type="flag" alt="" />
        <p className="w-full whitespace-pre-line text-center text-body-compact text-guide-text-preserved-1">
          {invitation.body}
        </p>
      </div>

      {/* 일시·장소 카드 */}
      <div className="w-full px-20 pt-24 pb-40">
        <div className="flex w-full flex-col items-start gap-10 overflow-hidden rounded-card bg-surface-subtle p-20">
          <InfoRow label="일시" value={date} />
          <InfoRow label="장소" value={invitation.location} />
        </div>
      </div>

      {/* 참석 신청 */}
      <div className="w-full bg-background-subtle px-20 pt-40 pb-60">
        <RSVPSection invitationId={invitation.id} />
      </div>
    </div>
  );
}

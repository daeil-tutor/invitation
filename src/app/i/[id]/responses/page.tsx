import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import NavBar from "@/components/NavBar";
import ResponseRow from "@/components/ResponseRow";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import { formatDate, getInvitation, getResponses, summarizeResponses } from "@/lib/invitations";
import { mockInvitation } from "@/lib/mock";

// /i/[id]/responses — 호스트가 참석 응답을 확인하는 화면 (Figma 프레임 2168:871, 응답 0건 2168:952)

// 빌드할 때 미리 만들어 둘 초대장 id (cacheComponents 사용 시 최소 1개 필요)
// TODO: Supabase — 연결 후에는 대표 초대장 id 하나만 돌려줘도 된다.
export function generateStaticParams() {
  return [{ id: mockInvitation.id }];
}

export default async function ResponsesPage({ params }: PageProps<"/i/[id]/responses">) {
  const { id } = await params;
  const invitation = await getInvitation(id);
  // 없는 초대장이면 404 화면 (Suspense 밖에서 호출해야 진짜 404 상태 코드가 나간다)
  if (!invitation) notFound();

  // "demo"로 열어도 응답은 초대장의 실제 id로 찾는다
  const responses = await getResponses(invitation.id);
  const { yesCount, noCount, totalGuests } = summarizeResponses(responses);

  return (
    <div className="mx-auto flex w-full max-w-375 flex-col gap-20 bg-surface-default">
      <NavBar title="응답 현황" />

      <div className="flex w-full flex-col gap-40 px-20 pb-80">
        <SectionHeader
          subtitle="Responses"
          title={invitation.title}
          description={`${formatDate(invitation.date)} · ${invitation.location}`}
        />

        {/* 숫자 카드 3개 */}
        <div className="flex w-full gap-8">
          <StatCard label="참석" value={`${yesCount}명`} className="min-w-0 flex-1" />
          <StatCard label="불참" value={`${noCount}명`} className="min-w-0 flex-1" />
          <StatCard
            label="참석 인원 합계"
            value={`${totalGuests}명`}
            highlight
            className="min-w-0 flex-1"
          />
        </div>

        <p className="text-caption-md text-text-tertiary">
          참석 인원 합계 = 참석한 사람 + 동반 인원
        </p>

        {/* 응답 목록 */}
        <section className="flex w-full flex-col gap-8">
          <h2 className="text-heading-md text-text-strong">응답 목록</h2>
          {responses.length === 0 ? (
            <EmptyState
              title="아직 응답이 없어요"
              description="초대장 링크를 공유하면 응답이 여기에 쌓여요."
            />
          ) : (
            responses.map((response) => (
              <ResponseRow
                key={response.id}
                name={response.name}
                // 불참이면 동반 인원을 쓰지 않는다 (Figma 규칙)
                meta={response.status === "yes" ? `동반 ${response.companions}명` : undefined}
                status={response.status}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}

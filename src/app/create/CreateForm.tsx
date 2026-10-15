"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO_ID } from "@/lib/invitations";
import type { Invitation } from "@/lib/mock";
import Button from "@/components/Button";
import CopyLinkField from "@/components/CopyLinkField";
import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import Input from "@/components/Input";
import InvitationCover from "@/components/InvitationCover";
import Label from "@/components/Label";
import NavBar from "@/components/NavBar";
import SuccessIcon from "@/components/SuccessIcon";
import Textarea from "@/components/Textarea";

// /create 화면 (Figma 프레임 2168:886 만들기, 2168:910 발행 완료)
// 입력값을 기억해야 해서 클라이언트 컴포넌트("use client")로 만들었다.

// 입력하는 4가지 값 (필드 이름은 lib/mock.ts의 Invitation과 같다)
type Draft = Pick<Invitation, "title" | "date" | "location" | "body">;

const emptyDraft: Draft = { title: "", date: "", location: "", body: "" };

export default function CreateForm() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  // 발행하면 초대장 id가 생긴다. id가 있으면 발행 완료 화면을 보여준다.
  const [publishedId, setPublishedId] = useState<string | null>(null);

  // 입력칸 하나가 바뀌면 그 값만 바꾼다
  function update(field: keyof Draft, value: string) {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  // 네 칸 모두 필수. 하나라도 비어 있으면 발행 버튼을 누를 수 없다
  const canPublish = Object.values(draft).every((value) => value.trim() !== "");

  function handlePublish() {
    if (!canPublish) return;
    // 지금은 저장하지 않고 화면 흐름만 잇기 위해 가짜 초대장(demo)으로 연결한다.
    // TODO: Supabase에 저장하고, 저장한 초대장의 id(crypto.randomUUID())를 쓴다
    setPublishedId(DEMO_ID);
  }

  if (publishedId) {
    return <Published id={publishedId} />;
  }

  return (
    <div className="mx-auto flex w-full max-w-375 flex-col gap-10 bg-surface-default pb-92">
      <NavBar title="초대장 만들기" />

      <div className="flex w-full flex-col gap-40 px-20 pb-80">
        {/* 입력 폼 */}
        <form
          className="flex w-full flex-col gap-24"
          onSubmit={(event) => {
            event.preventDefault();
            handlePublish();
          }}
        >
          <Textarea
            label="제목"
            required
            rows={2}
            placeholder={"예) 허들링 클럽 2번째\n오프라인 밋업"}
            helper="엔터로 줄을 나눌 수 있어요 · 최대 2줄"
            value={draft.title}
            onChange={(event) => update("title", event.target.value)}
          />
          <Input
            label="일시"
            required
            placeholder="예) 2026년 11월 14일 (토) 09:00"
            value={draft.date}
            onChange={(event) => update("date", event.target.value)}
          />
          <Input
            label="장소"
            required
            placeholder="예) 세종 남극 기지"
            value={draft.location}
            onChange={(event) => update("location", event.target.value)}
          />
          <Textarea
            label="본문"
            required
            rows={4}
            placeholder="게스트에게 전할 초대 글을 적어주세요"
            value={draft.body}
            onChange={(event) => update("body", event.target.value)}
          />
        </form>

        {/* 미리보기 — 입력한 값을 그대로 보여준다. 이 칸 안에서만 스크롤된다 */}
        <section className="flex w-full flex-col items-start gap-8" aria-labelledby="preview-label">
          <Label id="preview-label">
            미리보기
          </Label>
          <div className="h-489 w-full overflow-y-auto rounded-control border border-border-subtle bg-surface-default">
            <InvitationCover
              title={draft.title}
              date={draft.date}
              location={draft.location}
              imageAlt="초대장 대표 그림"
            />

            {/* 본문 */}
            <div className="flex w-full flex-col items-center gap-16 px-20 py-80">
              <Image type="flag" alt="" />
              <p className="w-full whitespace-pre-line text-center text-body-compact text-guide-text-preserved-1">
                {draft.body}
              </p>
            </div>

            {/* 일시·장소 카드 */}
            <div className="w-full px-20 pt-24 pb-40">
              <div className="flex w-full flex-col items-start gap-10 overflow-hidden rounded-card bg-surface-subtle p-20">
                <InfoRow label="일시" value={draft.date} />
                <InfoRow label="장소" value={draft.location} />
              </div>
            </div>
          </div>
          <p className="text-caption-md text-text-tertiary">
            입력하는 내용이 바로 미리보기에 반영돼요.
          </p>
        </section>
      </div>

      {/* 화면 아래에 고정된 발행 버튼 */}
      <div className="fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-375 justify-center bg-surface-default p-20">
        <Button size="lg" className="w-full" disabled={!canPublish} onClick={handlePublish}>
          발행하기
        </Button>
      </div>
    </div>
  );
}

// 발행 완료 화면: 초대장 링크와 응답 현황 링크를 복사할 수 있다
function Published({ id }: { id: string }) {
  const router = useRouter();
  // 링크 앞부분(예: http://localhost:3000). 이 화면은 버튼을 누른 뒤에만 보여서 브라우저에서만 실행된다
  const origin = window.location.origin;
  const invitationPath = `/i/${id}`;
  const responsesPath = `/i/${id}/responses`;

  return (
    <div className="mx-auto flex w-full max-w-375 flex-col gap-20 bg-surface-default">
      <NavBar title="발행 완료" />

      <div className="flex w-full flex-col gap-40 px-20 pb-80">
        <div className="flex w-full flex-col items-center gap-12 py-24">
          <SuccessIcon />
          <p className="text-title-lg text-text-strong">초대장이 발행됐어요!</p>
          <p className="text-body-md text-text-secondary">아래 두 링크를 복사해 두세요.</p>
        </div>

        <CopyLinkField
          title="초대장 링크"
          url={`${origin}${invitationPath}`}
          copyLabel="복사"
          description="게스트에게 공유하는 링크예요."
        />
        <CopyLinkField
          title="응답 현황 링크"
          url={`${origin}${responsesPath}`}
          copyLabel="복사"
          description="호스트용이에요. 이 링크를 아는 사람은 응답 목록을 볼 수 있어요."
        />

        <Button size="lg" className="w-full" onClick={() => router.push(invitationPath)}>
          내 초대장 보기
        </Button>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import AttendanceBadge from "@/components/AttendanceBadge";
import Button from "@/components/Button";
import CopyLinkField from "@/components/CopyLinkField";
import EmptyState from "@/components/EmptyState";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import Input from "@/components/Input";
import InputField from "@/components/InputField";
import InvitationCover from "@/components/InvitationCover";
import Label from "@/components/Label";
import NavBar from "@/components/NavBar";
import Radio from "@/components/Radio";
import RadioOption from "@/components/RadioOption";
import ResponseRow from "@/components/ResponseRow";
import RSVPCard from "@/components/RSVPCard";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import StepButton from "@/components/StepButton";
import Stepper from "@/components/Stepper";
import SuccessIcon from "@/components/SuccessIcon";
import Textarea from "@/components/Textarea";
import TextareaField from "@/components/TextareaField";

// 실습용 페이지: src/components의 모든 컴포넌트를 한눈에 확인한다.
// 실제 서비스 화면이 아니므로 나중에 지워도 된다.
const sizes = ["sm", "md", "lg"] as const;

// 컴포넌트 하나를 보여주는 구역 (회색 배경 위에 띄운다)
function Demo({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-12">
      <h2 className="text-heading-md text-text-primary">{name}</h2>
      <div className="flex flex-col gap-12 rounded-card bg-surface-subtle p-16">{children}</div>
    </section>
  );
}

export default function TestPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-40 px-16 py-32">
      <div className="flex flex-col gap-8">
        <h1 className="text-heading-lg text-text-primary">컴포넌트 테스트</h1>
        <p className="text-body-md text-text-secondary">
          hover는 마우스를 올려서, 포커스 테두리는 Tab 키로 확인하세요.
        </p>
      </div>

      {/* ── 1. 작은 부품 ── */}
      <Demo name="Button">
        {sizes.map((size) => (
          <div key={size} className="flex flex-wrap items-center gap-12">
            <Button size={size}>{size} 기본</Button>
            <Button size={size} disabled>
              {size} 비활성
            </Button>
          </div>
        ))}
        <Button size="lg" className="w-full">
          가로 꽉 채우기 (w-full)
        </Button>
      </Demo>

      <Demo name="Label">
        <Label>일반 라벨</Label>
        <Label required>필수 라벨</Label>
      </Demo>

      <Demo name="AttendanceBadge">
        <div className="flex gap-8">
          <AttendanceBadge status="yes" />
          <AttendanceBadge status="no" />
        </div>
      </Demo>

      <Demo name="Icon">
        <div className="flex items-center gap-16 text-text-primary">
          <Icon name="check" />
          <Icon name="plus" />
          <Icon name="minus" />
        </div>
      </Demo>

      <Demo name="SuccessIcon">
        <SuccessIcon />
      </Demo>

      <Demo name="Radio">
        <div className="flex gap-12">
          <Radio name="radio-demo" value="a" aria-label="선택 안 됨" />
          <Radio name="radio-demo" value="b" aria-label="선택됨" defaultChecked />
          <Radio name="radio-disabled" value="c" aria-label="비활성" disabled />
        </div>
      </Demo>

      <Demo name="StepButton">
        <div className="flex gap-12">
          <StepButton aria-label="늘리기">
            <Icon name="plus" size={20} />
          </StepButton>
          <StepButton aria-label="줄이기" disabled>
            <Icon name="minus" size={20} />
          </StepButton>
        </div>
      </Demo>

      <Demo name="InputField">
        <InputField placeholder="빈 칸일 때 회색 글자" />
        <InputField defaultValue="입력된 글자" />
      </Demo>

      <Demo name="TextareaField">
        <TextareaField rows={3} placeholder="여러 줄 입력" />
      </Demo>

      <Demo name="StatCard">
        <div className="grid grid-cols-3 gap-8">
          <StatCard label="참석" value="3명" />
          <StatCard label="불참" value="1명" />
          <StatCard label="합계" value="5명" highlight />
        </div>
      </Demo>

      <Demo name="InfoRow">
        <InfoRow label="일시" value="2026년 11월 1일 오후 6시" />
        <InfoRow type="spread" label="장소" value="서울시 성동구" />
      </Demo>

      <Demo name="SectionHeader">
        <SectionHeader subtitle="작은 제목" title="응답 현황" description="설명 문구가 들어가요." />
        <SectionHeader title="제목만 있을 때" />
      </Demo>

      <Demo name="NavBar">
        <NavBar title="초대장 만들기" />
      </Demo>

      <Demo name="EmptyState">
        <EmptyState title="아직 응답이 없어요" description="링크를 공유하고 기다려 보세요." />
      </Demo>

      <Demo name="Image">
        <div className="flex flex-wrap items-end gap-16">
          <Image type="character" alt="캐릭터" />
          <Image type="flag" alt="깃발" />
        </div>
      </Demo>

      {/* ── 2. 부품을 조합한 것 ── */}
      <Demo name="RadioOption">
        <RadioOption name="option-demo" value="yes" defaultChecked>
          참석
        </RadioOption>
        <RadioOption name="option-demo" value="no">
          불참
        </RadioOption>
      </Demo>

      <Demo name="Stepper">
        <Stepper decreaseLabel="줄이기" increaseLabel="늘리기" decreaseDisabled>
          0명
        </Stepper>
      </Demo>

      <Demo name="Input">
        <Input label="제목" placeholder="초대장 제목" required />
        <Input label="장소" placeholder="주소를 입력하세요" helper="지도 없이 글자로만 보여요." />
      </Demo>

      <Demo name="Textarea">
        <Textarea label="본문" rows={2} placeholder="2줄" />
        <Textarea label="본문" rows={4} placeholder="4줄" />
      </Demo>

      <Demo name="ResponseRow">
        <ResponseRow name="김하나" meta="동반 1명" status="yes" />
        <ResponseRow name="이두리" status="no" />
      </Demo>

      <Demo name="CopyLinkField">
        <CopyLinkField
          title="초대장 링크"
          url="https://example.com/i/1234-abcd"
          copyLabel="복사"
          description="복사 버튼을 누르면 클립보드에 복사돼요."
        />
      </Demo>

      <Demo name="InvitationCover">
        <InvitationCover
          subtitle="함께해요"
          title="연말 모임에 초대합니다"
          date="2026년 12월 20일 오후 7시"
          location="서울시 성동구 성수동"
          imageAlt="캐릭터"
        />
      </Demo>

      {/* ── 3. 가장 큰 조합 ── */}
      <Demo name='RSVPCard (state="form")'>
        <RSVPCard />
      </Demo>

      <Demo name='RSVPCard (state="done")'>
        <RSVPCard state="done" result={{ name: "김하나", status: "yes", companions: 1 }} />
      </Demo>
    </main>
  );
}

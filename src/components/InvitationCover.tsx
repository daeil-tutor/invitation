import type { ComponentProps, ReactNode } from "react";
import Image from "@/components/Image";

// Figma "InvitationCover" 컴포넌트 (node 2168:982)
// 초대장 위쪽 커버: 부제 · 제목 · 대표 그림 · 일시 · 장소 (어두운 그라데이션 배경).
// /create 미리보기와 /i/[id]에서 같이 쓴다.
// 제목에 넣은 줄바꿈(엔터)은 화면에도 그대로 보인다.
type InvitationCoverProps = ComponentProps<"section"> & {
  subtitle?: ReactNode;
  title: ReactNode;
  date: ReactNode;
  location: ReactNode;
  imageAlt: string;
};

// "일시" "장소" 작은 꼬리표
function DetailChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-control bg-info-subtle px-6 py-2 text-caption-md font-semibold text-info-strong">
      {children}
    </span>
  );
}

export default function InvitationCover({
  subtitle,
  title,
  date,
  location,
  imageAlt,
  className = "",
  ...rest
}: InvitationCoverProps) {
  const classes = [
    "flex w-full flex-col items-center justify-center gap-20 overflow-hidden px-20 py-80",
    "bg-linear-to-b from-cover-gradient-preserved-3 to-cover-gradient-preserved-4",
    "text-center text-text-inverse",
    className,
  ].join(" ");

  return (
    <section className={classes} {...rest}>
      {/* 제목 묶음 (Figma SectionHeader를 흰 글자로 바꿔 쓴 부분) */}
      <div className="flex w-full flex-col items-center gap-16">
        {subtitle && <p className="w-full text-label-md opacity-60">{subtitle}</p>}
        <h1 className="w-full whitespace-pre-line text-title-lg">{title}</h1>
      </div>

      <Image type="character" alt={imageAlt} priority />

      <div className="flex w-full flex-col items-center gap-8">
        <DetailChip>일시</DetailChip>
        <p className="w-full text-label-md">{date}</p>
      </div>

      <div className="flex w-full flex-col items-center gap-8">
        <DetailChip>장소</DetailChip>
        <p className="w-full text-label-md">{location}</p>
      </div>
    </section>
  );
}

import type { ComponentProps, ReactNode } from "react";
import AttendanceBadge from "@/components/AttendanceBadge";

// Figma "ResponseRow/true" 컴포넌트 (node 2168:977)
// 응답 현황 목록 한 줄: 이름 + 보조 정보(meta) + 참석 배지.
// 불참이면 meta에 동반 인원을 넣지 않는다.
type ResponseRowProps = ComponentProps<"div"> & {
  name: ReactNode;
  meta?: ReactNode;
  status: "yes" | "no";
};

export default function ResponseRow({
  name,
  meta,
  status,
  className = "",
  ...rest
}: ResponseRowProps) {
  const classes = [
    "flex h-78 w-full items-center gap-12 p-16 rounded-card border border-border-subtle bg-surface-default",
    className,
  ].join(" ");

  return (
    <div className={classes} {...rest}>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-4 overflow-hidden">
        <p className="truncate text-label-lg text-guide-text-preserved-1">{name}</p>
        {meta && <p className="truncate text-caption-md text-text-tertiary">{meta}</p>}
      </div>
      <AttendanceBadge status={status} className="shrink-0" />
    </div>
  );
}

import type { ComponentProps, ReactNode } from "react";

// Figma "StatCard" 컴포넌트 (node 2168:993)
// 응답 현황 숫자 카드(label + value).
// highlight: true는 강조할 합계(참석 인원 합계)에만 쓴다 → 파란 배경·파란 숫자.
type StatCardProps = ComponentProps<"div"> & {
  label: ReactNode;
  value: ReactNode;
  highlight?: boolean;
};

export default function StatCard({
  label,
  value,
  highlight = false,
  className = "",
  ...rest
}: StatCardProps) {
  const classes = [
    "flex flex-col items-center gap-4 overflow-hidden px-12 py-16 rounded-card",
    highlight ? "bg-info-subtle" : "bg-surface-subtle",
    className,
  ].join(" ");

  return (
    <div className={classes} {...rest}>
      <p className="text-caption-md text-text-secondary">{label}</p>
      <p className={`text-title-lg ${highlight ? "text-info-strong" : "text-text-strong"}`}>
        {value}
      </p>
    </div>
  );
}

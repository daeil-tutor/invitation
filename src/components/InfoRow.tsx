import type { ComponentProps, ReactNode } from "react";

// Figma "InfoRow" 컴포넌트 (node 2168:1008)
// 라벨-값 한 줄. 초대장의 일시·장소 정보, 응답 요약에 쓴다.
// type: inline(라벨 | 값 붙여서) / spread(라벨은 왼쪽, 값은 오른쪽 끝)
type InfoRowProps = ComponentProps<"div"> & {
  label: ReactNode;
  value: ReactNode;
  type?: "inline" | "spread";
};

export default function InfoRow({
  label,
  value,
  type = "inline",
  className = "",
  ...rest
}: InfoRowProps) {
  const classes = [
    "flex items-center gap-10",
    type === "spread" ? "w-full" : "",
    className,
  ].join(" ");

  if (type === "spread") {
    return (
      <div className={classes} {...rest}>
        <span className="whitespace-nowrap text-body-md text-text-secondary">{label}</span>
        <span className="min-w-0 flex-1 text-right text-label-md text-text-strong">{value}</span>
      </div>
    );
  }

  return (
    <div className={classes} {...rest}>
      <span className="whitespace-nowrap text-label-lg text-text-secondary">{label}</span>
      {/* 라벨과 값 사이 세로 구분선 */}
      <span className="h-14 w-1 shrink-0 bg-border-default" aria-hidden="true" />
      <span className="text-label-lg text-text-strong">{value}</span>
    </div>
  );
}

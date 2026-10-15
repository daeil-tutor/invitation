import type { ComponentProps, ReactNode } from "react";

// Figma "EmptyState" 컴포넌트 (node 2168:1055)
// 목록이 비었을 때 보여주는 안내 상자 (예: 응답 현황 0건).
type EmptyStateProps = ComponentProps<"div"> & {
  title: ReactNode;
  description?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  className = "",
  ...rest
}: EmptyStateProps) {
  const classes = [
    "flex w-full flex-col items-center justify-center gap-8 px-20 py-40 rounded-card bg-surface-subtle text-center",
    className,
  ].join(" ");

  return (
    <div className={classes} {...rest}>
      <p className="text-heading-md text-text-strong">{title}</p>
      {description && <p className="text-body-md text-text-tertiary">{description}</p>}
    </div>
  );
}

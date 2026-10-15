import type { ComponentProps, ReactNode } from "react";

// Figma "SectionHeader" 컴포넌트 (node 2168:1122)
// 섹션 제목 묶음(subtitle · title · description), 가운데 정렬.
// Figma의 showSubtitle/showTitle/showDescription → 해당 글자를 넘기지 않으면 그 줄을 그리지 않는다.
type SectionHeaderProps = ComponentProps<"div"> & {
  subtitle?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
};

export default function SectionHeader({
  subtitle,
  title,
  description,
  className = "",
  ...rest
}: SectionHeaderProps) {
  const classes = ["flex w-full flex-col items-center gap-16 text-center", className].join(" ");

  return (
    <div className={classes} {...rest}>
      {subtitle && <p className="w-full text-label-md text-action-secondary">{subtitle}</p>}
      {title && <h2 className="w-full text-title-lg text-guide-text-preserved-1">{title}</h2>}
      {description && (
        <p className="w-full text-body-md text-guide-text-preserved-1">{description}</p>
      )}
    </div>
  );
}

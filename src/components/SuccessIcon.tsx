import type { ComponentProps } from "react";
import Icon from "@/components/Icon";

// Figma "SuccessIcon" 컴포넌트 (node 2168:1006)
// 완료 표시용 동그라미(64px). 안에는 체크 아이콘(32px)이 기본으로 들어간다.
// 다른 아이콘을 넣고 싶으면 children으로 넘긴다. 아이콘 색은 info-strong(진한 파랑).
export default function SuccessIcon({
  className = "",
  children,
  ...rest
}: ComponentProps<"div">) {
  const classes = [
    "flex size-64 shrink-0 items-center justify-center overflow-hidden rounded-pill bg-info-subtle text-info-strong",
    className,
  ].join(" ");

  return (
    <div className={classes} {...rest}>
      {children ?? <Icon name="check" size={32} />}
    </div>
  );
}

import type { ComponentProps } from "react";

// Figma "Button" 컴포넌트 (node 2168:1089)
// size: sm / md / lg, 상태(hover, disabled)는 CSS로 처리한다.
type ButtonProps = ComponentProps<"button"> & {
  size?: "sm" | "md" | "lg";
};

// 크기별 모양 (높이·여백·배경색·글자 스타일)
const sizeClasses = {
  // 높이는 글자 + 위아래 여백으로 28px
  sm: "gap-10 py-4 text-label-md bg-action-primary enabled:hover:bg-action-hover-overlay",
  // md는 Figma에서 회색 배경. hover 때 파란 반투명 막을 회색 위에 한 겹 덮는다
  md: "h-48 gap-6 py-12 text-label-md bg-text-secondary enabled:hover:bg-linear-to-r enabled:hover:from-action-hover-overlay enabled:hover:to-action-hover-overlay",
  lg: "h-52 gap-10 py-4 text-label-lg bg-action-primary enabled:hover:bg-action-hover-overlay",
};

export default function Button({
  size = "sm",
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [
    // 모든 크기 공통
    "inline-flex items-center justify-center whitespace-nowrap px-8 rounded-control text-text-inverse",
    // 키보드로 이동했을 때 보이는 테두리
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-accent",
    // 누를 수 없는 상태
    "disabled:bg-border-subtle",
    sizeClasses[size],
    className,
  ].join(" ");

  return <button type={type} className={classes} {...rest} />;
}

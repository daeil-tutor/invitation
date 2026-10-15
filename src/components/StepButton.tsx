import type { ComponentProps } from "react";

// Figma "StepButton" 컴포넌트 (node 2168:1020)
// Stepper의 −/+ 버튼(44px). 아이콘(20px)은 children으로 받는다. (예: <Icon name="plus" size={20} />)
// state=disabled는 disabled 속성으로 처리한다. 아이콘이 currentColor를 쓰면 글자색을 따라 회색이 된다.
// 글자 없는 버튼이므로 aria-label로 이름을 꼭 붙인다.
export default function StepButton({
  type = "button",
  className = "",
  ...rest
}: ComponentProps<"button">) {
  const classes = [
    "flex size-44 shrink-0 items-center justify-center overflow-hidden",
    "rounded-control border border-border-default bg-surface-default text-guide-text-preserved-1",
    "disabled:text-text-disabled",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-accent",
    className,
  ].join(" ");

  return <button type={type} className={classes} {...rest} />;
}

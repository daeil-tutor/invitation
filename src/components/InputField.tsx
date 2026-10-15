import type { ComponentProps } from "react";

// Figma "InputField" 컴포넌트 (node 2168:1108)
// 한 줄 입력 박스(<input>). 보통 Input 안에서 쓴다.
// state: default(빈 칸) / focus(입력 중) / active(값이 채워짐)
// → 빈 칸은 placeholder 색, 입력 중은 파란 테두리(focus:), 값이 있으면 진한 글자색으로 CSS가 처리한다.
export default function InputField({
  className = "",
  ...rest
}: ComponentProps<"input">) {
  const classes = [
    "h-45 w-full px-16 py-12 rounded-control border border-border-subtle bg-surface-default",
    "text-body-lg text-guide-text-preserved-1 placeholder:text-text-disabled",
    "outline-none focus:border-action-primary",
    className,
  ].join(" ");

  return <input className={classes} {...rest} />;
}

import type { ComponentProps } from "react";

// Figma "TextareaField" 컴포넌트 (node 2168:1067)
// 여러 줄 입력 박스(<textarea>). 보통 Textarea 안에서 쓴다.
// state: default(빈 칸) / focus(입력 중) / active(값이 채워짐) → InputField와 같은 방식으로 CSS가 처리한다.
// 높이는 Textarea가 정한다(rows).
export default function TextareaField({
  className = "",
  ...rest
}: ComponentProps<"textarea">) {
  const classes = [
    "w-full resize-none px-16 py-12 rounded-control border border-border-subtle bg-surface-default",
    "text-body-lg text-guide-text-preserved-1 placeholder:text-text-disabled",
    "outline-none focus:border-action-primary",
    className,
  ].join(" ");

  return <textarea className={classes} {...rest} />;
}

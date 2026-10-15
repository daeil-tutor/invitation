import type { ComponentProps } from "react";
import Radio from "@/components/Radio";

// Figma "RadioOption" 컴포넌트 (node 2168:1119)
// 라디오 + 글자 한 줄. 참석/불참 선택에 쓴다. 글자를 눌러도 선택된다.
// 글자는 children, className은 바깥 <label>에,
// 나머지 props(name, value, checked, onChange 등)는 라디오 <input>에 전달한다.
export default function RadioOption({
  children,
  className = "",
  ...rest
}: Omit<ComponentProps<"input">, "type">) {
  const classes = ["flex items-center", className].join(" ");

  return (
    <label className={classes}>
      <Radio {...rest} />
      <span className="whitespace-nowrap text-label-lg text-text-strong">{children}</span>
    </label>
  );
}

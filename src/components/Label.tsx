import type { ComponentProps } from "react";

// Figma "Label" 컴포넌트 (node 2168:1076)
// 입력 필드 위 라벨. required를 켜면 옆에 "필수" 표시가 붙는다.
type LabelProps = ComponentProps<"label"> & {
  required?: boolean;
};

export default function Label({
  required = false,
  className = "",
  children,
  ...rest
}: LabelProps) {
  const classes = [
    "flex items-center gap-4 whitespace-nowrap text-label-lg text-text-strong",
    className,
  ].join(" ");

  return (
    <label className={classes} {...rest}>
      {children}
      {required && (
        <span className="text-caption-md text-guide-text-preserved-6">필수</span>
      )}
    </label>
  );
}

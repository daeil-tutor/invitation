"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import Label from "@/components/Label";
import TextareaField from "@/components/TextareaField";

// Figma "Textarea" 컴포넌트 (node 2168:1058)
// 라벨 + 여러 줄 입력 박스 + 안내 문구 묶음.
// rows: 2(제목, 높이 72px) / 4(본문, 높이 120px)
// Figma의 showHelper → helper 글자를 넘기면 보이고, 안 넘기면 숨는다.
// className은 바깥 묶음에, 나머지 props(name, value, placeholder, onChange 등)는 <textarea>에 전달한다.
type TextareaProps = Omit<ComponentProps<"textarea">, "rows"> & {
  label: ReactNode;
  helper?: ReactNode;
  rows?: 2 | 4;
};

// 줄 수별 입력 박스 높이
const rowsClasses = {
  2: "h-72",
  4: "h-120",
};

export default function Textarea({
  label,
  helper,
  rows = 4,
  required = false,
  id,
  className = "",
  ...rest
}: TextareaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const helperId = `${textareaId}-helper`;

  const classes = ["flex w-full flex-col items-start gap-6", className].join(" ");

  return (
    <div className={classes}>
      <Label htmlFor={textareaId} required={required}>
        {label}
      </Label>
      <TextareaField
        id={textareaId}
        rows={rows}
        required={required}
        aria-describedby={helper ? helperId : undefined}
        className={rowsClasses[rows]}
        {...rest}
      />
      {helper && (
        <p id={helperId} className="text-caption-md text-text-tertiary">
          {helper}
        </p>
      )}
    </div>
  );
}

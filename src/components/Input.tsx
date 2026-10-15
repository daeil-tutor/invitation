"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import InputField from "@/components/InputField";
import Label from "@/components/Label";

// Figma "Input" 컴포넌트 (node 2168:1115)
// 라벨 + 한 줄 입력 박스 + 안내 문구 묶음. 일시·장소·이름처럼 한 줄 값에 쓴다.
// Figma의 showHelper → helper 글자를 넘기면 보이고, 안 넘기면 숨는다.
// className은 바깥 묶음에, 나머지 props(name, value, placeholder, onChange 등)는 <input>에 전달한다.
type InputProps = ComponentProps<"input"> & {
  label: ReactNode;
  helper?: ReactNode;
};

export default function Input({
  label,
  helper,
  required = false,
  id,
  className = "",
  ...rest
}: InputProps) {
  // 라벨과 입력창을 연결할 고유 id (직접 넘기면 그 값을 쓴다)
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = `${inputId}-helper`;

  const classes = ["flex w-full flex-col items-start gap-6", className].join(" ");

  return (
    <div className={classes}>
      <Label htmlFor={inputId} required={required}>
        {label}
      </Label>
      <InputField
        id={inputId}
        required={required}
        aria-describedby={helper ? helperId : undefined}
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

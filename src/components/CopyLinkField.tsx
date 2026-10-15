"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

// Figma "CopyLinkField" 컴포넌트 (node 2168:1000)
// 발행 후 공유할 링크 한 줄: 제목 · 링크 칸 · 복사 버튼 · 설명.
// 초대장 링크와 응답 현황 링크에 한 번씩 쓴다.
// 복사 버튼을 누르면 url을 클립보드에 복사한다.
type CopyLinkFieldProps = ComponentProps<"div"> & {
  title: ReactNode;
  url: string;
  copyLabel: ReactNode;
  description?: ReactNode;
};

export default function CopyLinkField({
  title,
  url,
  copyLabel,
  description,
  className = "",
  ...rest
}: CopyLinkFieldProps) {
  const titleId = useId();

  const classes = [
    "flex w-full flex-col items-start gap-8 overflow-hidden p-16 rounded-card bg-surface-subtle",
    className,
  ].join(" ");

  return (
    <div className={classes} {...rest}>
      <p id={titleId} className="text-label-lg text-text-strong">
        {title}
      </p>
      <div className="flex w-full items-center gap-8">
        <InputField
          readOnly
          value={url}
          aria-labelledby={titleId}
          className="min-w-0 flex-1"
        />
        <Button size="sm" onClick={() => navigator.clipboard.writeText(url)}>
          {copyLabel}
        </Button>
      </div>
      {description && <p className="text-caption-md text-text-tertiary">{description}</p>}
    </div>
  );
}

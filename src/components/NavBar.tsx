import type { ComponentProps, ReactNode } from "react";

// Figma "NavBar" 컴포넌트 (node 2168:968)
// 화면 상단 바. 가운데 title, 양옆 left/right는 아이콘 자리(24px).
// left/right를 안 넘기면 Figma의 icon/none처럼 빈 자리만 차지해서 제목이 가운데에 온다.
type NavBarProps = ComponentProps<"header"> & {
  title: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
};

export default function NavBar({
  title,
  left,
  right,
  className = "",
  ...rest
}: NavBarProps) {
  const classes = ["flex h-65 w-full items-center gap-32 p-20", className].join(" ");

  return (
    <header className={classes} {...rest}>
      <span className="flex size-24 shrink-0 items-center justify-center">{left}</span>
      <h1 className="min-w-0 flex-1 text-center text-heading-md text-guide-text-preserved-1">
        {title}
      </h1>
      <span className="flex size-24 shrink-0 items-center justify-center">{right}</span>
    </header>
  );
}

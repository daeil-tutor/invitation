import type { ComponentProps } from "react";

// Figma "icon/check" (node 2168:1074), "icon/plus" (node 2168:1016), "icon/minus" (node 2168:1018) 컴포넌트
// 선(stroke)으로 그린 24×24 아이콘. 선 색은 currentColor라서 부모의 글자색(text-*)을 따른다.
// 크기는 size prop으로 고른다: 20 / 24(기본) / 32. 그 밖의 클래스(색 등)는 className으로 더한다.
// (className에 size-*를 같이 넣으면 기본 size-24와 부딪혀서 크기가 안 바뀔 수 있어 prop으로 분리했다)
// Figma "icon/none"은 그림 없는 빈 자리라서 만들지 않았다.

// 아이콘별 선 정보 (Figma에서 받은 값 그대로)
// - d: 선 경로
// - strokeWidth: 선 두께
// - round: 꺾이는 곳도 둥글게 할지
// - fixedStroke: true면 아이콘 크기가 바뀌어도 선 두께가 그대로 유지된다
//   (Figma에서 체크는 32px로 키워도 선 두께가 3 그대로였다)
const icons = {
  check: { d: "M4.5 12L9.5 16L18.5 7", strokeWidth: 3, round: true, fixedStroke: true },
  plus: { d: "M12 20V12M12 12V4M12 12H20M12 12H4", strokeWidth: 2, round: false, fixedStroke: false },
  minus: { d: "M20 12H4", strokeWidth: 2, round: false, fixedStroke: false },
};

// 크기별 Tailwind 클래스 (Figma에서 쓰인 크기: 기본 24, StepButton 안 20, SuccessIcon 안 32)
const sizeClasses = {
  20: "size-20",
  24: "size-24",
  32: "size-32",
};

type IconProps = ComponentProps<"svg"> & {
  name: keyof typeof icons;
  size?: keyof typeof sizeClasses;
};

export default function Icon({ name, size = 24, className = "", ...rest }: IconProps) {
  const icon = icons[name];
  const classes = [sizeClasses[size], "shrink-0", className].join(" ");

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={classes}
      {...rest}
    >
      <path
        d={icon.d}
        stroke="currentColor"
        strokeWidth={icon.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin={icon.round ? "round" : undefined}
        vectorEffect={icon.fixedStroke ? "non-scaling-stroke" : undefined}
      />
    </svg>
  );
}

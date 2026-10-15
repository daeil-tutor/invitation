import type { ComponentProps } from "react";

// Figma "Radio" 컴포넌트 (node 2168:1079)
// state: default / selected / disabled
// → 진짜 라디오(<input type="radio">)의 checked, disabled 상태를 CSS로 그린다.
//   - default: 회색 테두리 동그라미 (안쪽 흰 점 16px)
//   - selected(checked): 파란 동그라미 + 흰 점 8px
//   - disabled: 연한 회색 동그라미
// 바깥 상자는 48px(손가락으로 누르기 쉬운 크기).
// className은 바깥 상자에, 나머지 props(name, value, checked, onChange 등)는 <input>에 전달한다.
export default function Radio({
  className = "",
  ...rest
}: Omit<ComponentProps<"input">, "type">) {
  const boxClasses = [
    "inline-flex size-48 shrink-0 items-center justify-center",
    className,
  ].join(" ");

  const inputClasses = [
    // 동그라미 20px. 테두리 두께로 안쪽 흰 점 크기를 만든다 (20 - 2×2 = 16, 20 - 6×2 = 8)
    "size-20 appearance-none rounded-pill border-2 border-text-tertiary bg-surface-default",
    // 선택됨
    "checked:border-6 checked:border-action-primary",
    // 누를 수 없음
    "disabled:border-text-disabled",
    // 키보드로 이동했을 때 보이는 테두리
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-accent",
  ].join(" ");

  return (
    <span className={boxClasses}>
      <input type="radio" className={inputClasses} {...rest} />
    </span>
  );
}

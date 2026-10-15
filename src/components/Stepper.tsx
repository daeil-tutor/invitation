import type { ComponentProps, ReactNode } from "react";
import Icon from "@/components/Icon";
import StepButton from "@/components/StepButton";

// Figma "Stepper" 컴포넌트 (node 2168:1025)
// 동반 인원 입력: [− 버튼] 값 [+ 버튼]
// 숫자를 바꾸는 일은 부모가 한다(onDecrease / onIncrease).
// 최솟값이면 decreaseDisabled를 켠다(Figma: decrease를 state=disabled로).
// 아이콘은 기본으로 −(minus), +(plus)가 들어간다. 바꾸고 싶으면 decreaseIcon / increaseIcon으로 넘긴다.
// 버튼 이름은 decreaseLabel / increaseLabel로 받는다.
type StepperProps = ComponentProps<"div"> & {
  onDecrease?: () => void;
  onIncrease?: () => void;
  decreaseDisabled?: boolean;
  increaseDisabled?: boolean;
  decreaseIcon?: ReactNode;
  increaseIcon?: ReactNode;
  decreaseLabel: string;
  increaseLabel: string;
};

export default function Stepper({
  onDecrease,
  onIncrease,
  decreaseDisabled = false,
  increaseDisabled = false,
  decreaseIcon,
  increaseIcon,
  decreaseLabel,
  increaseLabel,
  className = "",
  children,
  ...rest
}: StepperProps) {
  const classes = ["flex items-center gap-12", className].join(" ");

  return (
    <div role="group" className={classes} {...rest}>
      <StepButton aria-label={decreaseLabel} onClick={onDecrease} disabled={decreaseDisabled}>
        {decreaseIcon ?? <Icon name="minus" size={20} />}
      </StepButton>
      {/* 현재 값 (예: 1명). 바뀌면 화면 읽기 프로그램이 읽어준다 */}
      <span aria-live="polite" className="whitespace-nowrap text-heading-md text-text-strong">
        {children}
      </span>
      <StepButton aria-label={increaseLabel} onClick={onIncrease} disabled={increaseDisabled}>
        {increaseIcon ?? <Icon name="plus" size={20} />}
      </StepButton>
    </div>
  );
}

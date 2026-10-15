"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import Button from "@/components/Button";
import InfoRow from "@/components/InfoRow";
import Input from "@/components/Input";
import Label from "@/components/Label";
import RadioOption from "@/components/RadioOption";
import Stepper from "@/components/Stepper";
import SuccessIcon from "@/components/SuccessIcon";

// Figma "RSVPCard" 컴포넌트 (node 2168:1029)
// 초대장 보기 화면(/i/[id])의 참석 신청 카드.
// state: form(제출 전 입력 폼) / done(제출 후 완료 화면, 같은 자리에서 바뀐다)
//
// form: 입력값은 이 이름으로 폼에 담긴다 → name(이름), status(yes/no), companions(동반 인원 숫자)
//       실제 저장은 부모가 formAction으로 넘긴다(아직 없음).
// done: 제출한 내용(result)을 받아 요약해서 보여준다.
// 아이콘(−, +, 체크)은 기본 아이콘이 들어간다. 바꾸고 싶을 때만 decreaseIcon / increaseIcon / successIcon으로 넘긴다.
// 선택 props (form에서만 쓴다, 안 넘기면 예전과 똑같이 동작):
//   error — 제출 실패 문구(버튼 위에 빨간 글자) / pending — 전송 중이면 버튼 비활성
//   companionsMax — 동반 인원 최대값(도달하면 + 버튼 비활성)
type RSVPResult = {
  name: string;
  status: "yes" | "no";
  companions: number;
};

type RSVPCardProps = ComponentProps<"section"> & {
  state?: "form" | "done";
  formAction?: ComponentProps<"form">["action"];
  result?: RSVPResult;
  decreaseIcon?: ReactNode;
  increaseIcon?: ReactNode;
  successIcon?: ReactNode;
  error?: ReactNode;
  pending?: boolean;
  companionsMax?: number;
};

export default function RSVPCard({
  state = "form",
  formAction,
  result,
  decreaseIcon,
  increaseIcon,
  successIcon,
  error,
  pending,
  companionsMax,
  className = "",
  ...rest
}: RSVPCardProps) {
  const classes = [
    "flex w-full flex-col items-start gap-24 overflow-hidden px-20 py-24 rounded-card bg-surface-default",
    className,
  ].join(" ");

  return (
    <section className={classes} {...rest}>
      {state === "form" ? (
        <RSVPForm
          formAction={formAction}
          decreaseIcon={decreaseIcon}
          increaseIcon={increaseIcon}
          error={error}
          pending={pending}
          companionsMax={companionsMax}
        />
      ) : (
        <RSVPDone result={result} successIcon={successIcon} />
      )}
    </section>
  );
}

// 제출 전: 이름 · 참석 여부 · 동반 인원 입력
function RSVPForm({
  formAction,
  decreaseIcon,
  increaseIcon,
  error,
  pending = false,
  companionsMax,
}: Pick<
  RSVPCardProps,
  "formAction" | "decreaseIcon" | "increaseIcon" | "error" | "pending" | "companionsMax"
>) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"yes" | "no">("yes");
  const [companions, setCompanions] = useState(0);

  const statusLabelId = useId();
  const companionLabelId = useId();
  const companionHelpId = useId();

  return (
    <form action={formAction} className="flex w-full flex-col gap-24">
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <h2 className="text-heading-lg text-text-strong">참석 여부 알려주기</h2>
        <p className="text-body-md text-text-secondary">이름과 참석 여부를 남겨주세요.</p>
      </div>

      <div className="flex w-full flex-col gap-24">
        <Input
          label="이름"
          name="name"
          required
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex w-full flex-col items-start gap-8">
          <Label id={statusLabelId} required>
            참석 여부
          </Label>
          <div role="radiogroup" aria-labelledby={statusLabelId} className="flex w-full items-center">
            <RadioOption
              name="status"
              value="yes"
              checked={status === "yes"}
              onChange={() => setStatus("yes")}
              className="min-w-0 flex-1"
            >
              참석
            </RadioOption>
            <RadioOption
              name="status"
              value="no"
              checked={status === "no"}
              onChange={() => setStatus("no")}
              className="min-w-0 flex-1"
            >
              불참
            </RadioOption>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-8">
          <Label id={companionLabelId} required>
            동반 인원
          </Label>
          <Stepper
            aria-labelledby={companionLabelId}
            aria-describedby={companionHelpId}
            decreaseLabel="동반 인원 줄이기"
            increaseLabel="동반 인원 늘리기"
            decreaseIcon={decreaseIcon}
            increaseIcon={increaseIcon}
            decreaseDisabled={companions <= 0}
            onDecrease={() => setCompanions((n) => Math.max(0, n - 1))}
            increaseDisabled={companionsMax !== undefined && companions >= companionsMax}
            onIncrease={() =>
              setCompanions((n) => (companionsMax === undefined ? n + 1 : Math.min(companionsMax, n + 1)))
            }
          >
            {companions}명
          </Stepper>
          {/* 폼으로 보낼 동반 인원 숫자 */}
          <input type="hidden" name="companions" value={companions} />
          <p id={companionHelpId} className="text-caption-md text-text-tertiary">
            본인을 제외하고 함께 오는 인원이에요.
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className="w-full text-center text-caption-md text-feedback-error">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={name.trim() === "" || pending}
      >
        참석 여부 보내기
      </Button>
    </form>
  );
}

// 제출 후: 완료 안내 + 내가 보낸 내용 요약
function RSVPDone({
  result,
  successIcon,
}: Pick<RSVPCardProps, "result" | "successIcon">) {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-12 py-40 text-center">
        <SuccessIcon>{successIcon}</SuccessIcon>
        <h2 className="text-title-lg text-text-strong">참석 여부를 보냈어요</h2>
        <p className="text-body-md text-text-secondary">호스트에게 응답이 전달됐어요.</p>
      </div>

      {result && (
        <div className="flex w-full flex-col gap-8 overflow-hidden p-16 rounded-card bg-surface-subtle">
          <InfoRow type="spread" label="이름" value={result.name} />
          <InfoRow
            type="spread"
            label="참석 여부"
            value={result.status === "yes" ? "참석" : "불참"}
          />
          <InfoRow type="spread" label="동반 인원" value={`${result.companions}명`} />
        </div>
      )}
    </>
  );
}

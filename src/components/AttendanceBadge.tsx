import type { ComponentProps } from "react";

// Figma "AttendanceBadge" 컴포넌트 (node 2168:972)
// status: yes(참석) / no(불참). DB rsvps.status 값과 맞춘다.
type AttendanceBadgeProps = ComponentProps<"span"> & {
  status: "yes" | "no";
};

// 상태별 배경색·글자색·글자
const statusStyles = {
  yes: { classes: "bg-info-subtle text-info-strong", text: "참석" },
  no: { classes: "bg-background-subtle text-text-secondary", text: "불참" },
};

export default function AttendanceBadge({
  status,
  className = "",
  ...rest
}: AttendanceBadgeProps) {
  const classes = [
    "inline-flex px-10 py-4 rounded-pill whitespace-nowrap text-label-md",
    statusStyles[status].classes,
    className,
  ].join(" ");

  return (
    <span className={classes} {...rest}>
      {statusStyles[status].text}
    </span>
  );
}

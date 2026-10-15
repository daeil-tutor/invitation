import NextImage from "next/image";
import type { ComponentProps } from "react";

// Figma "Image" 컴포넌트 (node 2168:1126)
// type: character(펭귄 캐릭터, 201px) / flag(깃발, 48px 둥근 모서리)
// 그림 파일은 public/images/ 에 있다. Next.js의 <Image>(next/image)로 보여준다.
type ImageProps = Omit<ComponentProps<typeof NextImage>, "src" | "width" | "height"> & {
  type?: "character" | "flag";
  alt: string;
};

// 종류별 그림 파일·크기·모양
const typeStyles = {
  character: { src: "/images/character.png", size: 201, classes: "size-201 object-cover" },
  flag: {
    src: "/images/flag.png",
    size: 48,
    classes: "size-48 object-cover rounded-scaled-media-16-799999237060547",
  },
};

export default function Image({
  type = "character",
  alt,
  className = "",
  ...rest
}: ImageProps) {
  const style = typeStyles[type];
  const classes = ["shrink-0", style.classes, className].join(" ");

  return (
    <NextImage
      src={style.src}
      width={style.size}
      height={style.size}
      alt={alt}
      className={classes}
      {...rest}
    />
  );
}

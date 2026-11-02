import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src">;

export default function AadilPhoto(props: Props) {
  return <img {...props} src="https://drive.google.com/uc?export=download&id=1PIBcDjzW10InB3fpFnMoF1a99aVp8Bjk" />;
}

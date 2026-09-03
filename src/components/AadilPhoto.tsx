import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src">;

export default function AadilPhoto(props: Props) {
  return <img {...props} src="images/aadil.jpg" />;
}

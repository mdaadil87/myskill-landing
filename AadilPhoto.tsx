import { useState, type ImgHTMLAttributes } from "react";

/**
 * Profile photo is hosted on Google Drive.
 * `uc?export=download` is the canonical direct link, but Google sometimes
 * refuses to render it when the file is hot-linked from another origin, so we
 * fall back to the `thumbnail` endpoint (same file, reliably embeddable).
 */
const DRIVE_FILE_ID = "12_qobYm8h5TnWndd6d7ygCbUhm3zk1Cy";

const PRIMARY_SRC = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;
const FALLBACK_SRC = `https://drive.google.com/thumbnail?id=${DRIVE_FILE_ID}&sz=w1600`;

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src">;

export default function AadilPhoto({ onError, ...props }: Props) {
  const [src, setSrc] = useState(PRIMARY_SRC);

  return (
    <img
      {...props}
      src={src}
      referrerPolicy="no-referrer"
      onError={(e) => {
        onError?.(e);
        if (src !== FALLBACK_SRC) setSrc(FALLBACK_SRC);
      }}
    />
  );
}

'use client';

import { useRef } from 'react';

// These WebP files contain sideways pixels. Correct their presentation without
// re-encoding the photographs or changing their quality.
export function UprightImage({
  src,
  alt,
  width,
  height,
  clockwise = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  clockwise?: boolean;
}) {
  return (
    <svg
      className="knitted-v2-upright-image"
      viewBox={`0 0 ${height} ${width}`}
      width={height}
      height={width}
      preserveAspectRatio="xMidYMid slice"
      aria-label={alt}
    >
      <title>{alt}</title>
      <image
        href={src}
        width={width}
        height={height}
        transform={clockwise
          ? `translate(${height} 0) rotate(90)`
          : `translate(0 ${width}) rotate(-90)`}
      />
    </svg>
  );
}

export function UprightPhoto({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photo = <UprightImage src={src} alt={alt} width={width} height={height} clockwise />;

  return (
    <figure className="knitted-v2-photo">
      <button
        type="button"
        className="knitted-v2-photo-button"
        aria-label={`${alt}を拡大`}
        onClick={() => dialogRef.current?.showModal()}
      >
        {photo}
      </button>
      <figcaption>{caption}</figcaption>
      <dialog
        ref={dialogRef}
        className="knitted-v2-photo-dialog"
        aria-label={alt}
      >
        <form method="dialog">
          <button type="submit" autoFocus aria-label="拡大写真を閉じる">閉じる ×</button>
        </form>
        {photo}
      </dialog>
    </figure>
  );
}

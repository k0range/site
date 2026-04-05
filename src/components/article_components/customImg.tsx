import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { getImageSize } from 'next/dist/server/image-optimizer';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export default async function CustomImg({
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  src: string;
  alt: string;
}) {
  if (props.src.startsWith("/content-assets/")) {
    let dimensions: { width?: number; height?: number } = {};

    try {
      const relativePath = props.src.replace(/^\/+content-assets\//, '');
      const filePath = path.join(process.cwd(), 'contents', ...relativePath.split('/'));
      const buffer = await fs.readFile(filePath);
      const size = await getImageSize(buffer);
      dimensions = { width: size.width, height: size.height };
    } catch {
      dimensions = {};
    }

    return (
      <Image
        {...props}
        className='rounded-2xl border-3 border-[#1388b9] mx-auto max-h-90 w-auto h-auto'
        width={dimensions.width ?? 0}
        height={dimensions.height ?? 0}
      />
    )
  }

  return (
    <>
      <img {...props} className='rounded-2xl border-3 border-[#1388b9] mx-auto max-h-90' />
    </>
  );
}
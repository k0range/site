import { headers } from 'next/headers';
import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export default async function CustomImg({
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  src: string;
  alt: string;
}) {
  if (props.src.startsWith("/content-assets/")) {
    const headersData = await headers();
    const protocol = headersData.get('x-forwarded-proto') || 'http';
    const host = headersData.get('host');
    const apiBase = `${protocol}://${host ?? "localhost:3000"}`;

    const dimensions: { width?: number; height?: number } = await (await fetch(`${apiBase}/content-assets/sizes/${props.src.replace("/content-assets/", "")}`)).json();

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
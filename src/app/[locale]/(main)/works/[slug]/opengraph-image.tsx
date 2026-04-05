import { allWorks } from 'content-collections'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
 
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
// Image 
export default async function Image(
  { params }: PageProps<'/[locale]/works/[slug]'>
) {
  const slug = (await params).slug
  const work = allWorks.find(work => work.slug === slug)

  if (!work) {
    notFound()
  }
 
  const polkaDotsSvg = await readFile(
    join(process.cwd(), 'public/static-assets/polka-dots.svg')
  )
  const polkaDotsImageSrc = `data:image/svg+xml;base64,${polkaDotsSvg.toString('base64')}`

  console.log(work)
  
    return new ImageResponse(
      (
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: work.coverBgCss ? '' : "#5cadcf",
          width: "100%",
          height: "100%",
          background: work.coverBgCss ?? (work.coverBgImage ? `url(${new URL(work.coverBgImage, process.env.NEXT_PUBLIC_BASE_URL).href})` : `url(${polkaDotsImageSrc})`),
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: (100 - (work.coverPyPercent ? Math.round(work.coverPyPercent * 2) : 0)) + "%",
          }}>
            <img
              src={new URL(work.coverIcon, process.env.NEXT_PUBLIC_BASE_URL).href || ""}
              style={{
                width: "auto",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      },
    )
  }

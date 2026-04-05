import { getLocale } from 'next-intl/server'
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getPost } from './getPost'
import { FaClock, FaTag } from 'react-icons/fa6'
 
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
// Image 
export default async function Image(
  { params }: PageProps<'/[locale]/posts/[slug]'>
) {
  const locale = await getLocale()
  const { slug } = await params

  const post = await getPost({
    locale, slug
  })
 
  const interReg = await readFile(
    join(process.cwd(), 'src/assets/fonts/Inter_28pt-Regular.ttf')
  )
  const interSB = await readFile(
    join(process.cwd(), 'src/assets/fonts/Inter_28pt-Semibold.ttf')
  )
  const notoSansJpReg = await readFile(
    join(process.cwd(), 'src/assets/fonts/NotoSansJP-Regular.ttf')
  )
  const notoSansJpSB = await readFile(
    join(process.cwd(), 'src/assets/fonts/NotoSansJP-Semibold.ttf')
  )

  const iconSvg = await readFile(
    join(process.cwd(), 'src/assets/icon.svg')
  )
  const iconImageSrc = `data:image/svg+xml;base64,${iconSvg.toString('base64')}`

  const polkaDotsSvg = await readFile(
    join(process.cwd(), 'public/static-assets/polka-dots.svg')
  )
  const polkaDotsImageSrc = `data:image/svg+xml;base64,${polkaDotsSvg.toString('base64')}`

  return new ImageResponse(
    (
      <div style={{
        display: "flex",
        fontFamily: "\"Inter Regular\", \"Noto Sans JP Regular\"",
        flexDirection: "column",
        backgroundColor: "#1388b9",
        width: "100%",
        height: "100%",
        padding: "38px 106px"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#5cadcf",
          height: "75px",
          borderRadius: "64px 64px 0 0",
          paddingBottom: "1px",
          backgroundImage: `url(${polkaDotsImageSrc})`,
        }}>
          <img
            src={iconImageSrc}
            style={{
              textAlign: "center",
              margin: "0 auto",
              height: "44px"
            }}
          />
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: "1",
          backgroundColor: "#fdf6ee",
          borderRadius: "0 0 64px 64px",
          paddingLeft: "42px",
          paddingRight: "42px",
          paddingBottom: "34px"
        }}>
          <div style={{
            fontSize: "120px"
          }}>{post.emoji ?? '📄'}</div>
          <div style={{
            color: "#333",
            maxWidth: "915px",
            fontSize: "46px",
            textAlign: "center",
          }}>{post.title}</div>
          <div style={{
            display: "flex",
            gap: "24px",
            marginTop: "24px"
          }}>
            { post.tags?.map(t => (
              <div style={{
                display: "flex",
                gap: "6px",
                flexDirection: "row",
                alignItems: "center",
                border: "4px solid #1388b9",
                borderRadius: "12px",
                padding: "4px 14px",
                color: "#1388b9",
                height: "56px"
              }}>
                <FaTag size={34} style={{
                  padding: "0 2px",
                  marginLeft: "-2px"
                }}></FaTag>
                <div style={{
                  fontWeight: "600",
                  fontSize: "28px",
                  fontFamily: "\"Inter SemiBold\", \"Noto Sans JP SemiBold\"",
                  transform: "translateY(-2px)",
                }}>{locale === "ja" ? (t.nameJa ?? t.nameEn) : t.nameEn}</div>
              </div>
            )) }
            { post.createdAt && <div style={{
              display: "flex",
              gap: "10px",
              flexDirection: "row",
              alignItems: "center",
              border: "4px solid #1388b9",
              borderRadius: "12px",
              padding: "4px 14px",
              color: "#1388b9",
              height: "56px"
            }}>
              <FaClock size={33} />
              <div style={{
                fontWeight: "600",
                fontSize: "28px",
                fontFamily: "\"Inter SemiBold\", \"Noto Sans JP SemiBold\"",
              }}>{new Date(post.createdAt).toLocaleDateString(locale)}</div>
            </div> }
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "twemoji",
      fonts: [
        {
          name: 'Inter Regular',
          data: interReg,
          style: "normal",
          weight: 400
        },
        {
          name: 'Inter Semibold',
          data: interSB,
          style: "normal",
          weight: 600
        },
        {
          name: 'Noto Sans JP Regular',
          data: notoSansJpReg,
          style: "normal",
          weight: 400
        },
        {
          name: 'Noto Sans JP Semibold',
          data: notoSansJpSB,
          style: "normal",
          weight: 600
        }
      ]
    },
  )
}

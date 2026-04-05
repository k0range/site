import fs from "fs/promises"
import path from "path"
import { allPosts } from "content-collections"
import { getImageSize } from "next/dist/server/image-optimizer"

export const dynamic = 'force-static'
export const dynamicParams = false // generateStaticParamsで指定したパス達以外を404とする。

export async function generateStaticParams() {
  const postParamRoutes = await Promise.all(allPosts.map(async p => {
    let files = await fs.readdir(path.join(process.cwd(), 'contents', 'posts', p.locale, p.slug))
    files = files.filter(v => v !== 'index.mdx')

    return files.map(f => ({
      path: ['posts', p.locale, p.slug, f]
    }))
  }))
 
  return [
    ...postParamRoutes.flat()
  ]
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const filePath = path.join(process.cwd(), 'contents', ...(await params).path)

  const buffer = await fs.readFile(filePath);
  const dimensions = await getImageSize(buffer);

  return new Response(JSON.stringify({
    width: dimensions.width,
    height: dimensions.height,
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

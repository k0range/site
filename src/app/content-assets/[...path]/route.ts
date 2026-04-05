import fs from "fs/promises"
import path from "path"
import { allPosts } from "content-collections"
import mime from "mime"

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
  console.log(params)

  const filePath = path.join(process.cwd(), 'contents', ...(await params).path)

  const fileBuffer = await fs.readFile(filePath)
  const contentType = mime.getType(filePath) || 'application/octet-stream'

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': contentType,
    },
  })
}

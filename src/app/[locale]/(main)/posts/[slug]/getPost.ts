import { cache } from "react"
import { notFound } from "next/navigation"
import { allPosts } from "content-collections"

export const getPost = cache(async ({locale, slug}: {locale: string, slug: string}) => {
  const post = allPosts.find(
    post => post.locale === locale && post.slug === slug
  )

  if (!post) notFound()

  return post
})

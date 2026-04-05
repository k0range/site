import { allPosts, allTags, allWorks } from 'content-collections'
import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = allPosts.map(post => {
    const otherLangPosts = allPosts.filter(p => {
      return p.slug === post.slug && p.locale !== post.locale
    })

    return {
      url: `https://korange.work/${post.locale}/posts/${post.slug}`,
      lastModified: post.updatedAt ?? post.createdAt,
      alternates: {
        languages: Object.fromEntries(
          otherLangPosts.map(p => [p.locale, `https://korange.work/${p.locale}/posts/${p.slug}`])
        )
      },
      priority: 0.9,
    }
  })

  const works: MetadataRoute.Sitemap = allWorks.map(work => {
    return {
      url: `https://korange.work/works/${work.slug}`,
      alternates: {
        languages: {
          ja: `https://korange.work/ja/works/${work.slug}`,
          en: `https://korange.work/en/works/${work.slug}`,
        }
      },
      priority: 0.9,
    }
  })

  const tags: MetadataRoute.Sitemap = allTags.map(tag => {
    return {
      url: `https://korange.work/tags/${tag.id}`,
      alternates: {
        languages: {
          ja: `https://korange.work/ja/tags/${tag.id}`,
          en: `https://korange.work/en/tags/${tag.id}`,
        }
      },
      priority: 0.3,
    }
  })

  return [
    {
      url: 'https://korange.work/',
      priority: 1,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/',
          en: 'https://korange.work/en/',
        }
      }
    },
    {
      url: 'https://korange.work/banners/',
      priority: 0.6,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/banners/',
          en: 'https://korange.work/en/banners/',
        }
      },
    },
    {
      url: 'https://korange.work/contact/',
      priority: 0.9,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/contact/',
          en: 'https://korange.work/en/contact/',
        }
      },
    },
    {
      url: 'https://korange.work/donate/',
      priority: 0.9,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/donate/',
          en: 'https://korange.work/en/donate/',
        }
      },
    },
    {
      url: 'https://korange.work/license/',
      priority: 0.5,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/license/',
          en: 'https://korange.work/en/license/',
        }
      },
    },
    {
      url: 'https://korange.work/listening/',
      priority: 0.6,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/listening/',
          en: 'https://korange.work/en/listening/',
        }
      },
    },
    {
      url: 'https://korange.work/misc/',
      priority: 0.8,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/misc/',
          en: 'https://korange.work/en/misc/',
        }
      },
    },
    {
      url: 'https://korange.work/pgp/',
      priority: 0.8,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/pgp/',
          en: 'https://korange.work/en/pgp/',
        }
      },
    },
    ...posts,
    {
      url: 'https://korange.work/privacy/',
      priority: 0.5,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/privacy/',
          en: 'https://korange.work/en/privacy/',
        }
      },
    },
    ...tags,
    {
      url: 'https://korange.work/terms/',
      priority: 0.5,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/terms/',
          en: 'https://korange.work/en/terms/',
        }
      },
    },
    {
      url: 'https://korange.work/works/',
      priority: 0.9,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/works/',
          en: 'https://korange.work/en/works/',
        }
      },
    },
    ...works,
    {
      url: 'https://korange.work/writings/',
      priority: 0.9,
      alternates: {
        languages: {
          ja: 'https://korange.work/ja/writings/',
          en: 'https://korange.work/en/writings/',
        }
      },
    },
  ]
}
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import removeMarkdown from 'remove-markdown';

const tagSchema = z.object({
  id: z.string(),
  nameEn: z.string(),
  nameJa: z.string().optional()
})

const tags = defineCollection({
  name: "tags",
  parser: "yaml",
  directory: "contents/tags",
  include: "**/*.yml",
  schema: tagSchema
});

const basicPostSchema = z.object({
  published: z.boolean(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  coverImage: z.string().optional(),
  emoji: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  excerpt: z.string().optional()
});
const normalPostSchema = basicPostSchema.extend({
  type: z.literal("normal"),
  content: z.string(),
  translateOk: z.boolean().optional()
})
const translatedPostSchema = basicPostSchema.extend({
  type: z.literal("translated"),
  langFrom: z.enum(["ja", "en"]),
  withLLM: z.boolean().optional(),
  basedOnHash: z.string().optional(), // これがある場合AI
  content: z.string(),
  translateOk: z.boolean().optional()
})
const externalPostSchema = basicPostSchema.extend({
  type: z.literal("external"),
  platform: z.enum(["note", "zenn"]),
  //locale: z.enum(["ja", "en"]).optional(), // localeがない場合両方表示される
  url: z.string()
})
const PostSchema = z.discriminatedUnion("type", [normalPostSchema, translatedPostSchema, externalPostSchema]);

function generateExcerpt(content: string): string {
  const plainText = removeMarkdown(content);
  if (plainText.length <= 200) {
    return plainText;
  }
  return plainText.slice(0, 200) + '...';
}

const posts = defineCollection({
  name: "posts",
  directory: "contents/posts",
  include: [
    "**/*/index.mdx",
    "**/*.mdx"
  ], // ja/ en/ などLocale prefixがある
  schema: PostSchema,
  transform: async (document, context) => {
    const newTags = document.tagIds?.map(tagId =>
      context.documents(tags).find((t) => t.id === tagId)
    );

    const parts = document._meta.path
      .replace(/index\.mdx$/, "")
      .replace(/\.mdx$/, "")
      .split(/[\\/]/);

    const locale = parts[0];
    const slug = parts[1] ?? "";

    return {
      ...document,
      locale,
      slug,
      tags: newTags,
      excerpt: generateExcerpt(document.content)
    };
  }
});

const works = defineCollection({
  name: "works",
  directory: "contents/works",
  parser: "yaml",
  include: "**/*/index.yml",
  schema: z.object({
    order: z.number().optional(),
    featured: z.boolean().optional(),
    name: z.object({
      ja: z.string().optional(),
      en: z.string().optional()
    }),
    description: z.object({
      ja: z.string().optional(),
      en: z.string().optional()
    }),
    coverIcon: z.string().optional(),
    coverPyPercent: z.number().optional(),
    coverBgImage: z.string().optional(),
    coverBgCss: z.string().optional(),
    label: z.enum([
      "inDev",
      "ideaStage"
    ]).optional(),
    siteUrl: z.string().optional(),
    releasedAt: z.string().optional(),
    content: z.object({
      ja: z.string().optional(),
      en: z.string().optional()
    }).optional()
  }),
  transform: async (document, context) => {
    return {
      ...document,
      slug: document._meta.path.split(/[\\/]/)[0],
    };
  }
});

const timeline = defineCollection({
  name: "timeline",
  directory: "contents/timeline",
  parser: "yaml",
  include: "*.yml",
  schema: z.object({
    date: z.string(),
    icon: z.enum(["fire", "calendar"]),
    content: z.object({ // そのlocaleのcontentがない場合、その要素は表示されない
      ja: z.string().optional(), // []() Markdownスタイルのリンクに対応
      en: z.string().optional()
    }).optional(),
    linkCard: z.string().optional(),
    tweetUrl: z.string().optional()
  })
});
 
export default defineConfig({
  collections: [
    tags,
    posts,
    works,
    timeline
  ],
});

import type { MetadataRoute } from "next"
import { getAllPosts } from "@/server/post"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://shadospace.in"

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  try {
    const postsData = await getAllPosts()
    const postRoutes: MetadataRoute.Sitemap = postsData.map(({ post }) => ({
      url: `${baseUrl}/post/${post.id}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.createdAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }))

    return [...staticRoutes, ...postRoutes]
  } catch (error) {
    console.error("Failed to generate post routes for sitemap:", error)
    return staticRoutes
  }
}

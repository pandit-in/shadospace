import { UTApi } from "uploadthing/server"
import { db } from "@/db"
import { post } from "@/db/schema/post"
import { user } from "@/db/schema/auth"

export const utapi = new UTApi()

/**
 * Extracts UploadThing file key from a URL string
 */
export function extractFileKey(url: string | null | undefined): string | null {
  if (!url || typeof url !== "string") return null
  
  // Handle UploadThing URLs containing /f/<fileKey>
  if (url.includes("/f/")) {
    const key = url.split("/f/")[1]?.split("?")[0]?.split("#")[0]
    if (key) return key
  }
  
  // Handle uploadthing.com or utfs.io or ufs.sh URLs
  if (url.includes("utfs.io") || url.includes("ufs.sh") || url.includes("uploadthing")) {
    const parts = url.split("/")
    const lastPart = parts[parts.length - 1]?.split("?")[0]?.split("#")[0]
    if (lastPart) return lastPart
  }
  
  return null
}

/**
 * Extracts all UploadThing file keys from a thumbnail URL and HTML content string
 */
export function extractFileKeysFromPost(
  thumbnail: string | null | undefined,
  content: string | null | undefined
): string[] {
  const fileKeys = new Set<string>()

  if (thumbnail) {
    const key = extractFileKey(thumbnail)
    if (key) fileKeys.add(key)
  }

  if (content) {
    // Match image src attributes in HTML
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi
    let match: RegExpExecArray | null
    while ((match = imgRegex.exec(content)) !== null) {
      const src = match[1]
      const key = extractFileKey(src)
      if (key) fileKeys.add(key)
    }
  }

  return Array.from(fileKeys)
}

/**
 * Deletes an array of UploadThing file keys
 */
export async function deleteUploadThingFiles(fileKeys: string[]) {
  if (!fileKeys || fileKeys.length === 0) return
  try {
    await utapi.deleteFiles(fileKeys)
    console.log(`Successfully deleted ${fileKeys.length} file(s) from UploadThing:`, fileKeys)
  } catch (error) {
    console.error("Failed to delete files from UploadThing:", error)
  }
}

/**
 * Scans the DB for all active post & user image file keys,
 * and cleans up any orphaned files from UploadThing.
 */
export async function cleanupOrphanedUploadThingFiles() {
  try {
    const allPosts = await db.select({ thumbnail: post.thumbnail, content: post.content }).from(post)
    const allUsers = await db.select({ image: user.image }).from(user)

    const activeKeys = new Set<string>()

    for (const p of allPosts) {
      const keys = extractFileKeysFromPost(p.thumbnail, p.content)
      keys.forEach((k) => activeKeys.add(k))
    }

    for (const u of allUsers) {
      if (u.image) {
        const key = extractFileKey(u.image)
        if (key) activeKeys.add(key)
      }
    }

    // Fetch files from UploadThing
    const listResult = await utapi.listFiles()
    if (listResult && listResult.files) {
      const orphanedKeys = listResult.files
        .map((f) => f.key)
        .filter((key) => !activeKeys.has(key))

      if (orphanedKeys.length > 0) {
        await utapi.deleteFiles(orphanedKeys)
        console.log(`Cleaned up ${orphanedKeys.length} orphaned UploadThing files.`)
      }
    }
  } catch (error) {
    console.error("Failed to run orphaned UploadThing files cleanup:", error)
  }
}

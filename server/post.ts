"use server"

import { db } from "@/db"
import { post } from "@/db/schema/post"
import { eq, desc } from "drizzle-orm"
import { randomUUID } from "node:crypto"
import { revalidatePath } from "next/cache"
import { user } from "@/db/schema"

import {
  deleteUploadThingFiles,
  extractFileKeysFromPost,
} from "@/lib/uploadthing-server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function createPost(
  title: string,
  content: string,
  thumbnail: string | null | undefined,
  userId: string
) {
  await db.insert(post).values({
    id: randomUUID(),
    title,
    content,
    thumbnail,
    userId,
  })
  revalidatePath("/")
  revalidatePath(`/profile/${userId}`)
  return
}

export async function getPostById(id: string) {
  const result = await db
    .select()
    .from(post)
    .innerJoin(user, eq(user.id, post.userId))
    .where(eq(post.id, id))
    .limit(1)
  return result[0]
}

export async function updatePost(
  id: string,
  title: string,
  content: string,
  thumbnail: string | null | undefined
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    throw new Error("Unauthorized")
  }

  const existingPost = await db
    .select()
    .from(post)
    .where(eq(post.id, id))
    .limit(1)
  if (!existingPost.length || existingPost[0].userId !== session.user.id) {
    throw new Error("Unauthorized to edit this post")
  }

  const oldPost = existingPost[0]
  const oldKeys = extractFileKeysFromPost(oldPost.thumbnail, oldPost.content)
  const newKeys = extractFileKeysFromPost(thumbnail, content)

  // Determine which keys were removed in the edit
  const removedKeys = oldKeys.filter((key) => !newKeys.includes(key))

  await db
    .update(post)
    .set({ title, content, thumbnail })
    .where(eq(post.id, id))

  if (removedKeys.length > 0) {
    await deleteUploadThingFiles(removedKeys)
  }

  revalidatePath("/")
  revalidatePath(`/post/${id}`)
  revalidatePath(`/profile/${session.user.id}`)
}

export async function deletePost(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    throw new Error("Unauthorized")
  }

  const existingPost = await db
    .select()
    .from(post)
    .where(eq(post.id, id))
    .limit(1)
  if (!existingPost.length || existingPost[0].userId !== session.user.id) {
    throw new Error("Unauthorized to delete this post")
  }

  const targetPost = existingPost[0]
  const fileKeys = extractFileKeysFromPost(
    targetPost.thumbnail,
    targetPost.content
  )

  await db.delete(post).where(eq(post.id, id))

  if (fileKeys.length > 0) {
    await deleteUploadThingFiles(fileKeys)
  }

  revalidatePath("/")
  revalidatePath(`/profile/${session.user.id}`)
}

export async function getAllPosts() {
  return await db
    .select()
    .from(post)
    .orderBy(desc(post.createdAt))
    .innerJoin(user, eq(user.id, post.userId))
}

export async function getPostsByUserId(userId: string) {
  return await db
    .select()
    .from(post)
    .innerJoin(user, eq(user.id, post.userId))
    .where(eq(post.userId, userId))
    .orderBy(desc(post.createdAt))
}

export async function getUserById(userId: string) {
  const result = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1)
  return result[0]
}

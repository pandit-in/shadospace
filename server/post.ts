"use server"

import { db } from "@/db"
import { post } from "@/db/schema/post"
import { eq, desc } from "drizzle-orm"
import { randomUUID } from "node:crypto"
import { revalidatePath } from "next/cache"
import { user } from "@/db/schema"

export async function createPost(
  title: string,
  content: string,
  thumbnail: string,
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
  thumbnail: string
) {
  await db
    .update(post)
    .set({ title, content, thumbnail })
    .where(eq(post.id, id))
  revalidatePath("/")
  revalidatePath(`/post/${id}`)
}

export async function deletePost(id: string) {
  await db.delete(post).where(eq(post.id, id))
  revalidatePath("/")
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

"use server"

import { db } from "@/db";
import { post } from "@/db/schema/post";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { user } from "@/db/schema";

export async function createPost(title: string, content: string, userId: string) {
    await db.insert(post).values({
        id: randomUUID(),
        title,
        content,
        userId,
    });
    revalidatePath("/");
    return;
}

export async function getPostById(id: string) {
    const result = await db.select().from(post).where(eq(post.id, id)).limit(1);
    return result[0];
}

export async function deletePost(id: string) {
    await db.delete(post).where(eq(post.id, id));
    revalidatePath("/");
}

export async function getAllPosts() {
    return await db.select().from(post).orderBy(desc(post.createdAt)).innerJoin(user, eq(user.id, post.userId));
}
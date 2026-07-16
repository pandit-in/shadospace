"use server"

import { db } from "@/db";
import { post, like } from "@/db/schema/post";
import { eq, desc, and, sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { user } from "@/db/schema";

export async function createPost(title: string, content: string, thumbnail: string, userId: string) {
    await db.insert(post).values({
        id: randomUUID(),
        title,
        content,
        thumbnail,
        userId,
    });
    revalidatePath("/");
    return;
}

export async function getPostById(id: string) {
    const result = await db
        .select()
        .from(post)
        .innerJoin(user, eq(user.id, post.userId))
        .where(eq(post.id, id))
        .limit(1);
    return result[0];
}

export async function updatePost(id: string, title: string, content: string, thumbnail: string) {
    await db.update(post).set({ title, content, thumbnail }).where(eq(post.id, id));
    revalidatePath("/");
    revalidatePath(`/post/${id}`);
}

export async function deletePost(id: string) {
    await db.delete(post).where(eq(post.id, id));
    revalidatePath("/");
}

export async function getAllPosts() {
    return await db.select().from(post).orderBy(desc(post.createdAt)).innerJoin(user, eq(user.id, post.userId));
}

export async function getPostsByUserId(userId: string) {
    return await db
        .select()
        .from(post)
        .innerJoin(user, eq(user.id, post.userId))
        .where(eq(post.userId, userId))
        .orderBy(desc(post.createdAt));
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
        .limit(1);
    return result[0];
}

export async function toggleVote(
    postId: string,
    userId: string,
    type: "upvote" | "downvote"
) {
    const existing = await db
        .select()
        .from(like)
        .where(and(eq(like.postId, postId), eq(like.userId, userId)))
        .limit(1);

    if (existing.length > 0) {
        const current = existing[0];
        if (current.type === type) {
            await db.delete(like).where(eq(like.id, current.id));
        } else {
            await db.update(like).set({ type }).where(eq(like.id, current.id));
        }
    } else {
        await db.insert(like).values({
            id: randomUUID(),
            postId,
            userId,
            type,
        });
    }

    revalidatePath("/");
    revalidatePath(`/post/${postId}`);
}

export async function getPostVotes(postId: string) {
    const upvotes = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(like)
        .where(and(eq(like.postId, postId), eq(like.type, "upvote")));

    const downvotes = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(like)
        .where(and(eq(like.postId, postId), eq(like.type, "downvote")));

    return {
        upvotes: upvotes[0]?.count ?? 0,
        downvotes: downvotes[0]?.count ?? 0,
    };
}

export async function getUserVote(postId: string, userId: string) {
    const result = await db
        .select({ type: like.type })
        .from(like)
        .where(and(eq(like.postId, postId), eq(like.userId, userId)))
        .limit(1);
    return result[0]?.type ?? null;
}

export async function getPostVotesWithUser(postId: string, userId?: string) {
    const votes = await getPostVotes(postId);
    const userVote = userId ? await getUserVote(postId, userId) : null;
    return { ...votes, userVote };
}

export async function getAllPostsWithVotes() {
    const data = await db
        .select({
            post: post,
            user: user,
            upvotes: sql<number>`coalesce(sum(case when ${like.type} = 'upvote' then 1 else 0 end), 0)::int`,
            downvotes: sql<number>`coalesce(sum(case when ${like.type} = 'downvote' then 1 else 0 end), 0)::int`,
        })
        .from(post)
        .innerJoin(user, eq(user.id, post.userId))
        .leftJoin(like, eq(like.postId, post.id))
        .groupBy(post.id, user.id)
        .orderBy(desc(post.createdAt));

    return data;
}
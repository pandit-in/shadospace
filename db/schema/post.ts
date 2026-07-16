import { relations } from "drizzle-orm/_relations";
import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const post = pgTable("post", {
  id: text("id").primaryKey(),
  title: text("name").notNull(),
  content: text("content").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const comment = pgTable("comment", {
    id: text("id").primaryKey(),
    content: text("content").notNull(),
    userId: text("user_id").notNull(),
    postId: text("post_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
});

export const like = pgTable("like", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    postId: text("post_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  });

export const postRelations = relations(post, ({ many, one }) => ({
  comments: many(comment),
  likes: many(like),
  user: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
}));

export const commentRelations = relations(comment, ({ many, one }) => ({
  post: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),
  user: one(user, {
    fields: [comment.userId],
    references: [user.id],
  }),
}));

export const likeRelations = relations(like, ({ one }) => ({
  post: one(post, {
    fields: [like.postId],
    references: [post.id],
  }),
  user: one(user, {
    fields: [like.userId],
    references: [user.id],
  }),
}));

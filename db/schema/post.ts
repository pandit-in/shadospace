import { relations } from "drizzle-orm/_relations"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { user } from "./auth"

export const post = pgTable("post", {
  id: text("id").primaryKey(),
  title: text("name").notNull(),
  content: text("content").notNull(),
  thumbnail: text("thumbnail"),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const postRelations = relations(post, ({ one }) => ({
  user: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
}))

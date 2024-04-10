import {
  pgTable,
  index,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    user_name: varchar("user_name"),
    ip: varchar("ip"),
    comment: text("comment"),
    post_slug: varchar("post_slug"),
    createdAt: timestamp("createdat", {
      precision: 6,
      withTimezone: true,
    }).defaultNow(),
  },
  (table) => ({
    slugIndex: index("post_slug_idx").on(table.post_slug),
  }),
);

export const suggestions = pgTable("suggestions", {
  id: serial("id").primaryKey(),
  user_name: varchar("user_name"),
  ip: varchar("ip"),
  suggestion: text("suggestion"),
  createdAt: timestamp("createdat", {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
});

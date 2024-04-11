import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import { comments } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { formatDate } from "../utils";
import { AddComment } from "./AddComment";

export const Comments = async ({ post_slug }: { post_slug: string }) => {
  const LIMIT = 10;
  const data = await db
    .select()
    .from(comments)
    .where(eq(comments.post_slug, post_slug))
    .orderBy(desc(comments.createdAt))
    .limit(LIMIT);

  return (
    <div>
      {data.length > 0 ? (
        <>
          {data.map(({ id, comment, user_name, createdAt }) => (
            <div key={id} className="mt-4">
              <p className="text-neutral-900 dark:text-neutral-100">
                {comment}
              </p>
              <div className="mt-2 flex items-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {user_name}
                </p>
                <span className="mx-2">-</span>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {formatDate(createdAt, true)}
                </p>
              </div>
            </div>
          ))}
          <Separator className="mt-4 bg-neutral-300 dark:bg-neutral-700" />
          {data.length === LIMIT && (
            <div className="mt-4">
              <p className="text-neutral-600 dark:text-neutral-400">
                Theres more comments but I don&apos;t want to load them all at
                once...
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          No comments yet 😢
        </p>
      )}
      <AddComment
        post_slug={post_slug}
        insertComment={async (values) => {
          "use server";
          try {
            await db.insert(comments).values(values);
            revalidatePath(`/yap/${post_slug}`);
          } catch (error) {
            console.log("🚀 ~ insertComment={ ~ error:", error);
          }
        }}
      />
    </div>
  );
};

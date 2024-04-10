import { notFound } from "next/navigation";
import { formatDate, getBlogPosts } from "../utils";
import { baseUrl } from "@/lib/utils";
import { CustomMDX } from "@/components/mdx";
import db from "@/lib/db";
import { comments } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "sonner";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const generateStaticParams = () =>
  getBlogPosts().map((post) => ({
    slug: post.slug,
  }));

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image ?? `/og?title=${encodeURIComponent(title ?? "")}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/yap/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const AddComment = ({ post_slug }: { post_slug: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="btn">Add a comment</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a comment</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form>
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
              >
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                className="focus:ring-primary focus:border-primary mt-1 block w-full border-neutral-300 shadow-sm sm:text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
              >
                Your name
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                className="focus:ring-primary focus:border-primary mt-1 block w-full border-neutral-300 shadow-sm sm:text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
const Comments = async ({ post_slug }: { post_slug: string }) => {
  const data = await db
    .select()
    .from(comments)
    .where(eq(comments.post_slug, post_slug))
    .orderBy(desc(comments.createdAt));

  return (
    <div>
      {data.length > 0 ? (
        data.map(({ id, comment, user_name, createdAt }) => (
          <div key={id} className="mt-4">
            <p className="text-neutral-900 dark:text-neutral-100">{comment}</p>
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
        ))
      ) : (
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          No comments yet
        </p>
      )}
    </div>
  );
};
export default function Blog({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title ?? "")}`,
            url: `${baseUrl}/yap/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <h1 className="title text-2xl font-semibold tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="mt-2 mb-8 flex items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt ?? "", true)}
        </p>
      </div>
      <div className="mb-8">
        <p className="text-neutral-900 dark:text-neutral-100">
          {post.metadata.tags?.split(",").map((tag) => (
            <span
              key={tag}
              className="mr-2 rounded-full bg-blue-500 py-1 px-2 text-xs text-white"
            >
              {tag}
            </span>
          ))}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Comments</h2>
          {/* Add a new comment should be a simple model */}
        </div>
        <Suspense
          fallback={
            <div className="mt-4">
              <Skeleton className="mb-4 w-1/2" />
              <Skeleton className="mb-4 w-1/2" />
            </div>
          }
        >
          <Comments post_slug={post.slug} />
        </Suspense>
      </div>
    </section>
  );
}

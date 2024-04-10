import { notFound } from "next/navigation";
import { formatDate, getBlogPosts } from "../utils";
import { baseUrl } from "@/lib/utils";
import { CustomMDX } from "@/components/mdx";
import db from "@/lib/db";
import { comments } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { AddComment } from "./AddComment";

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

const Comments = async ({ post_slug }: { post_slug: string }) => {
  const data = await db
    .select()
    .from(comments)
    .where(eq(comments.post_slug, post_slug))
    .orderBy(desc(comments.createdAt))
    .limit(6);

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
          {data.length === 6 && (
            <div className="mt-4">
              <p className="text-neutral-600 dark:text-neutral-400">
                Theres more comments but I don&apos;t want to load them all at
                once...
              </p>
            </div>
          )}
          <AddComment post_slug={post_slug} />
        </>
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
      <Separator className="mt-4 bg-neutral-300 dark:bg-neutral-700" />
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

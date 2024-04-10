import Link from "next/link";
import { formatDate, getBlogPosts } from "@/app/yap/utils";
import { compareDesc } from "date-fns";

export const BlogPosts = () => (
  <div>
    {getBlogPosts()
      .sort((a, b) =>
        compareDesc(
          new Date(a.metadata.publishedAt ?? ""),
          new Date(b.metadata.publishedAt ?? ""),
        ),
      )
      .map((post) => (
        <Link
          key={post.slug}
          className="mb-4 flex flex-col space-y-1"
          href={`/yap/${post.slug}`}
        >
          <div className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2">
            <p className="tracking-tight text-neutral-900 dark:text-neutral-100 w-[500px]">
              {"•\t" + post.metadata.title}
            </p>
            <p className="w-[200px] tabular-nums text-neutral-600 dark:text-neutral-400">
              {formatDate(post.metadata.publishedAt ?? "", true)}
            </p>
          </div>
        </Link>
      ))}
  </div>
);

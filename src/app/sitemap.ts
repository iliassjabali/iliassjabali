import { baseUrl } from "@/lib/utils";
import { getBlogPosts } from "@/app/yap/utils";
import { format } from "date-fns";

export default function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/yap/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/yap"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: format(new Date(), "yyyy-MM-dd"),
  }));

  return [...routes, ...blogs];
}

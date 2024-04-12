import { baseUrl } from "@/lib/utils";
import { getBlogPosts } from "@/app/yap/utils";

export default function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/yap/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt ?? ""),
  }));

  const routes = ["", "/yap"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogs];
}

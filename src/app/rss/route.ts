import { baseUrl } from "@/lib/utils";
import { getBlogPosts } from "../yap/utils";
import { compareDesc } from "date-fns";

export function GET() {
  const allBlogs = getBlogPosts();

  const itemsXml = allBlogs
    .sort((a, b) =>
      compareDesc(
        new Date(a.metadata.publishedAt ?? ""),
        new Date(b.metadata.publishedAt ?? ""),
      ),
    )
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/yap/${post.slug}</link>
          <description>${post.metadata.summary ?? ""}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt ?? "",
          ).toUTCString()}</pubDate>
        </item>`,
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>My Portfolio</title>
        <link>${baseUrl}</link>
        <description>This is my portfolio RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}

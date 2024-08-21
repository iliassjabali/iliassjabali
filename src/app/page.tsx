import { BlogPosts } from "@/components/posts";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Iliass&apos;s Yap zone
      </h1>
      <p className="mb-4">
        My name is Iliass, and I work as a Software Engineer.
        <br /> Writing about engineering and other subjects that capture my
        interest.
        <br /> I strongly believe in the principles of minimalism, simplicity,
        and craftsmanship.
      </p>
      <div className="my-8">
        <Link
          className="mb-4 text-lg font-semibold tracking-tighter "
          href="/yap"
        >
          Some of my recent posts: <Separator className="my-4" />
        </Link>

        <BlogPosts />
      </div>
      {/* <div className="my-8">
        <h3 className="mb-4 text-lg font-semibold tracking-tighter">
          Most played song on Spotify
        </h3>
        <iframe
          style={{
            borderRadius: "12px",
          }}
          src="https://open.spotify.com/embed/track/1jJudDuP9BhE6fQrdiLTQY?utm_source=generator&theme=0"
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div> */}
    </section>
  );
}

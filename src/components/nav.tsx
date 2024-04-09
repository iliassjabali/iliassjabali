"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <aside className="mb-16 -ml-[8px] tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries({
              "/": {
                name: "Home",
              },
              "/yap": {
                name: "Blog",
              },
              // "https://www.instagram.com/iliass.webp": {
              //   name: "Photos",
              // },
            }).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className={cn(
                  "relative m-1 flex py-1 px-2 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200",
                  pathname.includes(path)
                    ? "text-neutral-800 dark:text-neutral-200"
                    : "text-neutral-600 dark:text-neutral-800",
                )}
              >
                {name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

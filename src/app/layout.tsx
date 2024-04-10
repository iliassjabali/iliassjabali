import "./global.css";
import type { Metadata } from "next";
import { Shantell_Sans } from "next/font/google";
import { Navbar } from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/footer";
import { baseUrl, cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const fonnt = Shantell_Sans({
  display: "swap",
  subsets: ["cyrillic"],
});
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Portfolio ",
    template: "%s | Iliass's Portfolio",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "My Portfolio",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-black dark:bg-black dark:text-white",
        "transition-colors duration-300",
        fonnt.className,
      )}
    >
      <body className="mx-4 mt-8 max-w-xl antialiased lg:mx-auto">
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
          <Navbar />
          {children}

          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
        <Toaster />
      </body>
    </html>
  );
}

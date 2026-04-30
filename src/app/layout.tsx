import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";

const satoshi = localFont({
  src: "../assets/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Monro",
  description:
    "Personal portfolio of Alex Monro, front-end developer based in Vancouver. Projects in React, Next.js, WordPress, and AI-assisted development.",
  metadataBase: new URL("https://alexmonro.com"),
  openGraph: {
    title: "Alex Monro",
    description:
      "Personal portfolio of Alex Monro, front-end developer based in Vancouver. Projects in React, Next.js, WordPress, and AI-assisted development.",
    type: "website",
    url: "https://alexmonro.com",
    images: [{ url: "/photos/alex.png", width: 1200, height: 630, alt: "Alex Monro, Front-End Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Monro",
    description:
      "Personal portfolio of Alex Monro, front-end developer based in Vancouver. Projects in React, Next.js, WordPress, and AI-assisted development.",
    images: ["/photos/alex.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={satoshi.variable}>
      <head>
        <meta name="theme-color" content="#09090b" />
      </head>
      <body>
        <Loader />
        <SmoothScroll>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-zinc-50 focus:text-zinc-950 focus:px-4 focus:py-2 focus:rounded-sm focus:text-sm focus:font-bold"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main-content" className="site-shell">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

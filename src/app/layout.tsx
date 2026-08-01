import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const satoshi = localFont({
  src: [
    {
      path: "../assets/fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Monro | Software Developer",
  description:
    "Portfolio of Alex Monro, a Vancouver-based software developer with front-end training and hands-on full-stack project experience.",
  metadataBase: new URL("https://alexmonro.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alex Monro | Software Developer",
    description:
      "Portfolio of Alex Monro, a Vancouver-based software developer with front-end training and hands-on full-stack project experience.",
    type: "website",
    url: "https://alexmonro.com",
  },
  twitter: {
    card: "summary",
    title: "Alex Monro | Software Developer",
    description:
      "Portfolio of Alex Monro, a Vancouver-based software developer",
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
    <html lang="en" className={satoshi.variable} data-scroll-behavior="smooth">
      <head>
        <meta name="theme-color" content="#f2f2f0" />
      </head>
      <body>
        <ScrollToTop />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-foreground focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:text-sm focus:font-bold"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="site-shell">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const satoshi = localFont({
  src: "../assets/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Monro",
  description:
    "Personal portfolio of Alex Monro, a front-end developer showcasing projects, skills, and experience in web development.",
  openGraph: {
    title: "Alex Monro",
    description:
      "Personal portfolio of Alex Monro, a front-end developer showcasing projects, skills, and experience in web development.",
    type: "website",
    url: "https://alexmonro.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Monro",
    description:
      "Personal portfolio of Alex Monro, a front-end developer showcasing projects, skills, and experience in web development.",
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
      <body>
        <SmoothScroll>
          <Nav />
          <main className="site-shell">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

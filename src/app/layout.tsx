import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { ViewTransitions } from "next-view-transitions";

const satoshi = localFont({
  src: "../assets/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Monro",
  description:
    "Personal portfolio of Alex Monro, a front-end developer specializing in React and Next.js. Showcasing projects, skills, and experience in web development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${satoshi.variable} h-full`}>
        <body>
          <SmoothScroll />
          <Cursor />
          <Nav />
          <main className="site-shell">{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}

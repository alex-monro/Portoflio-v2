import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { ViewTransitions } from "next-view-transitions";
import { LOADER_STORAGE_KEY } from "@/lib/constants";

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
      <html
        lang="en"
        className={`${satoshi.variable} h-full`}
        suppressHydrationWarning
      >
        <body suppressHydrationWarning>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (sessionStorage.getItem("soft-nav") === "true" && sessionStorage.getItem("${LOADER_STORAGE_KEY}") === "true") {
                    document.documentElement.dataset.hasLoaded = "true";
                  }
                } catch (error) {}
              `,
            }}
          />
          <Cursor />
          <Nav />

          <SmoothScroll>
            <main className="site-shell">{children}</main>
            <Footer />
          </SmoothScroll>
        </body>
      </html>
    </ViewTransitions>
  );
}

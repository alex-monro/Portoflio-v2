import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} h-full`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}

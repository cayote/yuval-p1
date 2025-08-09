import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation, MobileMenu } from "@/components";
import BackToTop from "@/components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuval Cohen Portfolio",
  description: "Yuval Cohen Portfolio | Architect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <header className="sticky top-0 z-40 bg-background border-b-1 border-neutral-900 shadow-[0_2px_0_rgba(0,0,0,0.12)] py-3 md:py-4">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3 md:py-4">
              <Navigation />
              <MobileMenu />
            </div>
          </div>
        </header>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}

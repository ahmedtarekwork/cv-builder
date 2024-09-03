// nextjs
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// styles
import "./globals.css";

// context
import UserContext from "@/context/UserContext";

// components
import Header from "@/components/Header";

// utils
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CV Builder",
  description: "build your cv and get your job",
  keywords:
    "CV, cv, build cv, make cv, professonal cv, get job, cv for job, resume, personal resume",
  authors: {
    name: "Ahmed Tarek",
    url: "https://github.com/ahmedtarekwork",
  },
  openGraph: {
    url: "https://ahmed-cv-builder.vercel.app/",
    type: "website",
    title: "CV Builder, build your dream cv",
    description: "this web application give ability to build professional cv",
    images: ["https://ahmed-cv-builder.vercel.app/og_img.webp"],
    siteName: "CV Builder",
  },
  twitter: {
    description: "this web application give ability to build professional cv",
    images: ["https://ahmed-cv-builder.vercel.app/og_img.webp"],
    title: "CV Builder, build your dream cv",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="mRJBiFAKZclxHqVNzE3XcVND8jU8zoZUfY4Z-kYZmQw"
        />

        {/* Twitter Meta Tags */}
        <meta
          property="twitter:domain"
          content="https://ahmed-cv-builder.vercel.app/"
        />
        <meta
          property="twitter:url"
          content="https://ahmed-cv-builder.vercel.app/"
        />
      </head>

      <UserContext>
        <body className={inter.className}>
          <div className="min-h-screen flex flex-col gap-4">
            <Header />
            {children}
            <Toaster richColors />
          </div>
        </body>
      </UserContext>
    </html>
  );
}

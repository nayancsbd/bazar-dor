import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর - নিত্যপণ্যের দৈনিক বাজার মূল্য",
  description: "নিত্যপ্রয়োজনীয় দ্রব্যাদির সর্বশেষ ও নির্ভরযোগ্য বাজার দর জানুন।",
  icons: {
    icon: [
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon.png?v=2", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${notoSerifBengali.variable} h-full antialiased`}>
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230f8b44'/%3E%3Ccircle cx='9' cy='25' r='2' fill='%23ffffff'/%3E%3Ccircle cx='23' cy='25' r='2' fill='%23ffffff'/%3E%3Cpath d='M3 6h4l3 13h14l3-9H9' fill='none' stroke='%23ffffff' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
        />
        <link rel="icon" type="image/svg+xml" href="/icon.svg?v=3" />
        <link rel="icon" type="image/png" href="/icon.png?v=3" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <link rel="apple-touch-icon" href="/icon.png?v=3" />
      </head>
      <body className="min-h-full flex flex-col font-bengali bg-gray-50/50 text-gray-900">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex-1 pb-16 sm:pb-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
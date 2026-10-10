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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${notoSerifBengali.variable} h-full antialiased`}>
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
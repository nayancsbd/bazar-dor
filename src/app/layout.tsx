import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
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
        <Header />
        <main className="flex-1">{children}</main>
        {/* Footer placeholder */}
        <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-100 bg-white">
          © ২০২৬ বাজার দর। সর্বস্বত্ব সংরক্ষিত।
        </footer>
      </body>
    </html>
  );
}
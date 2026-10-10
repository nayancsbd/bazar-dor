import React from "react";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-10">
      <Hero />

      <section id="সব-পণ্য" className="w-full pt-4 scroll-mt-28">
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            নিত্যপ্রয়োজনীয় বাজারের সকল পণ্যের তালিকা
          </p>
        </div>
      </section>
    </div>
  );
}

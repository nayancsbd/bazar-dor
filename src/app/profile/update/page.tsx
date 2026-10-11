"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        toast.error("অনুগ্রহ করে প্রথমে সাইন ইন করুন");
        router.replace("/signin?callbackUrl=%2Fprofile%2Fupdate&unauthorized=true");
      } else {
        setName(session.user.name || "");
      }
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="w-full max-w-2xl mx-auto py-10 sm:py-14 px-4 flex flex-col gap-6 animate-pulse">
        <div className="w-48 h-8 bg-gray-200 rounded-md" />
        <div className="w-full h-48 bg-white rounded-3xl border border-gray-100 p-6" />
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (name.trim().length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    setIsUpdating(true);

    try {
      const res = await updateUser({
        name: name.trim(),
      });

      if (res.error) {
        toast.error(res.error.message || "তথ্য আপডেট করা সম্ভব হয়নি");
      } else {
        toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "তথ্য আপডেট করতে সমস্যা হয়েছে";
      toast.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 sm:py-12 px-4 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <span>←</span>
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          তথ্য আপডেট করুন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>
      </div>

      <div className="bg-[#fafcfb] rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs flex flex-col gap-5">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
          ব্যবহারকারীর তথ্য
        </h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-gray-800">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
              className="w-full rounded-xl border border-gray-200 bg-[#fdfdfd] px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full py-2.5 sm:py-3 rounded-xl border-2 border-emerald-600 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white font-semibold text-sm transition-all duration-200 shadow-2xs active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            {isUpdating ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                <span>সংরক্ষণ হচ্ছে...</span>
              </>
            ) : (
              <span>তথ্য আপডেট করুন</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

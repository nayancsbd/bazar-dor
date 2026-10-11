"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন");
        router.replace("/signin?callbackUrl=%2Fprofile&unauthorized=true");
      } else {
        setName(session.user.name || "");
      }
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="w-full max-w-2xl mx-auto py-10 sm:py-14 px-4 flex flex-col gap-6 animate-pulse">
        <div className="w-48 h-8 bg-gray-200 rounded-md" />
        <div className="w-64 h-4 bg-gray-200 rounded-md mb-2" />
        <div className="w-full h-28 bg-white rounded-3xl border border-gray-100 p-6" />
        <div className="w-full h-48 bg-white rounded-3xl border border-gray-100 p-6" />
      </div>
    );
  }

  const user = session.user;

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে লগআউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগআউট করতে সমস্যা হয়েছে");
    }
  };

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
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="bg-[#fafcfb] rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-gray-200 shrink-0"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0f8b44] text-white flex items-center justify-center text-xl sm:text-2xl font-bold shadow-xs shrink-0 select-none">
              {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
            </div>
          )}

          <div className="flex flex-col min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight truncate">
              {user.name || "Rezwan Ahmed"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {user.email || "rezwanahmed@gmail.com"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-red-500 text-red-600 hover:bg-red-50 text-xs sm:text-sm font-semibold transition-colors shrink-0 cursor-pointer active:scale-95"
        >
          <span>←</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      <div className="bg-[#fafcfb] rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs flex flex-col gap-5">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
          তথ্য
        </h3>

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

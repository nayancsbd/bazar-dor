import React from "react";

export default function CategoryLoading() {
  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6 my-6 sm:my-8 animate-pulse">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gray-200 shrink-0" />
          <div className="flex flex-col gap-2">
            <div className="w-32 h-8 bg-gray-200 rounded-lg" />
            <div className="w-48 h-4 bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl px-6 py-4 border border-gray-100 shadow-xs flex items-center justify-end">
        <div className="w-40 h-8 bg-gray-200 rounded-xl" />
      </div>

      <div className="w-36 h-4 bg-gray-200 rounded-md pt-1" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`cat-skel-${i}`}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs flex flex-col justify-between gap-4 h-32"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-3/4 h-4 bg-gray-200 rounded-md" />
                <div className="w-1/3 h-3 bg-gray-200 rounded-md" />
              </div>
            </div>
            <div className="flex items-end justify-between pt-1 border-t border-gray-50">
              <div className="w-20 h-5 bg-gray-200 rounded-md" />
              <div className="w-14 h-5 bg-gray-200 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

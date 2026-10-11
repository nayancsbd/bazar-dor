import React from "react";

export default function Loading() {
  return (
    <div className="w-full flex flex-col gap-12 sm:gap-16 my-6 sm:my-8 animate-pulse">
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 flex flex-col items-start gap-4 w-full">
          <div className="w-40 h-6 bg-gray-200 rounded-full" />
          <div className="w-3/4 h-10 bg-gray-200 rounded-xl" />
          <div className="w-full max-w-md h-12 bg-gray-200 rounded-lg" />
          <div className="w-32 h-10 bg-gray-200 rounded-xl mt-2" />
        </div>
        <div className="w-64 h-52 sm:w-80 sm:h-64 bg-gray-100 rounded-2xl shrink-0" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-40 h-7 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`home-skel-riser-${i}`}
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

      <div className="flex flex-col gap-4">
        <div className="w-40 h-7 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`home-skel-faller-${i}`}
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
    </div>
  );
}

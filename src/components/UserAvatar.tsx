"use client";

import React, { useState } from "react";

interface UserAvatarProps {
  image?: string | null;
  name?: string | null;
  className?: string;
  shape?: "rounded-2xl" | "rounded-full";
}

export default function UserAvatar({
  image,
  name,
  className = "w-8 h-8 rounded-full",
  shape = "rounded-full",
}: UserAvatarProps) {
  const [hasError, setHasError] = useState(false);

  const initial = name ? name.trim().charAt(0).toUpperCase() : "👤";

  const getImageUrl = (src: string) => {
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return `/api/avatar?url=${encodeURIComponent(src)}`;
    }
    return src;
  };

  if (image && !hasError) {
    return (
      <img
        src={getImageUrl(image)}
        alt={name || "User"}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={() => setHasError(true)}
        className={`${className} object-cover shrink-0 select-none`}
      />
    );
  }

  return (
    <div
      className={`${className} ${shape} bg-[#0f8b44] text-white flex items-center justify-center font-bold select-none shrink-0 shadow-xs`}
    >
      <span>{initial}</span>
    </div>
  );
}

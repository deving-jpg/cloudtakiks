"use client";

import { useState } from "react";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

// Fills its parent container — wrap it in an aspect-ratio box.
export default function TeamAvatar({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-electric text-6xl font-extrabold text-white">
      {initials(name)}
    </div>
  );
}

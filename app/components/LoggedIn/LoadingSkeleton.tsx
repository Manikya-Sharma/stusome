"use client";

import "react-loading-skeleton/dist/skeleton.css";

import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function LoadingSkeleton() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  return (
    <SkeletonTheme
      baseColor={theme == "dark" ? "#333344" : "#aeaeae"}
      highlightColor={theme == "dark" ? "#aaa" : "#999"}
      duration={0.7}
    >
      <div className="mx-auto mb-3 flex w-[95%] gap-2 overflow-hidden pt-5">
        <Skeleton height={400} width={400} />
        <Skeleton height={400} width={400} />
        <Skeleton height={400} width={400} />
      </div>
    </SkeletonTheme>
  );
}

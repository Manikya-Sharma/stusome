"use client";
import "react-loading-skeleton/dist/skeleton.css";

import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function DoubtLoading() {
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
      <main className={"min-h-screen bg-gray-100 dark:bg-slate-800"}>
        <nav className="bg-black p-4 text-white dark:bg-slate-950">
          <div className="text-center">
            <h1 className="mb-3 text-2xl font-bold md:text-5xl">
              <Skeleton height={50} />
            </h1>
            <div className="mx-auto flex w-fit max-w-[80%] flex-wrap items-center justify-center">
              <p>tags:</p>
              <Skeleton height={20} />
              <Skeleton height={20} />
              <Skeleton height={20} />
            </div>
          </div>
        </nav>
        <div className="px-4 sm:px-8">
          <Skeleton height={300} />

          {/* <!-- Doubts Section --> */}

          <Skeleton height={280} />
          <Skeleton height={280} />
          <Skeleton height={280} />
          <Skeleton height={280} />
        </div>
      </main>
    </SkeletonTheme>
  );
}

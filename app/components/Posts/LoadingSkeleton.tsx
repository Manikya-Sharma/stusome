"use client";

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
    <div className="h-screen bg-slate-200 dark:bg-slate-800">
      <SkeletonTheme
        baseColor={theme == "dark" ? "#333344" : "#aeaeae"}
        highlightColor={theme == "dark" ? "#aaa" : "#999"}
        duration={0.7}
      >
        <div className="mx-auto mb-3 w-[95%] pt-5">
          <Skeleton height={100} />
        </div>
        <div className="sm:flex">
          <div className="h-0 w-0 md:h-fit md:w-[30vw] md:pl-3">
            <div className="mb-1 w-[80%]">
              <Skeleton height={40} />
            </div>
            <div className="mb-1 w-[70%]">
              <Skeleton height={40} />
            </div>
            <div className="mb-1 w-[90%]">
              <Skeleton height={40} />
            </div>
            <div className="mb-1 w-[65%]">
              <Skeleton height={40} />
            </div>
          </div>
          <div className="sm:w-[80vw] sm:pr-3 md:w-[50vw]">
            <div className="mb-2 ml-3 mt-5 w-[90%]">
              <Skeleton height={80} />
            </div>
            <div className="ml-3 w-[88%]">
              <Skeleton height={170} />
            </div>
            <div className="mb-2 ml-3 mt-5 w-[70%]">
              <Skeleton height={80} />
            </div>
            <div className="ml-3 w-[88%]">
              <Skeleton height={130} />
            </div>
          </div>
          <div className="w-0 sm:w-[20vw] sm:pr-3">
            <Skeleton height={300} />
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
}

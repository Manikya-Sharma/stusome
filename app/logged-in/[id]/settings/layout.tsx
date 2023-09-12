"use client";
import { useRouter } from "next/navigation";
import { IconContext } from "react-icons";
import { LuArrowLeft } from "react-icons/lu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <main className="relative min-h-screen dark:bg-slate-800 dark:text-slate-200">
      <IconContext.Provider value={{ className: "shared-class", size: "23" }}>
        <div className="absolute top-2 left-2 z-[100]">
          <button
            onClick={() => router.back()}
            className="text-slate-800 dark:text-slate-200 text-lg hover:underline underline-offset-2"
          >
            <LuArrowLeft />
          </button>
        </div>
      </IconContext.Provider>
      {children}
    </main>
  );
}

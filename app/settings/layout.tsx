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
        <div className="absolute left-2 top-2 z-[100]">
          <button
            onClick={() => router.back()}
            className="text-lg text-slate-800 underline-offset-2 hover:underline dark:text-slate-200"
          >
            <LuArrowLeft />
          </button>
        </div>
      </IconContext.Provider>
      {children}
    </main>
  );
}

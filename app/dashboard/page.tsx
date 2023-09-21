"use client";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <main className="px-4">
      <div className="h-10">
        <button
          onClick={() => {
            router.back();
          }}
        >
          <LuArrowLeft />
        </button>
      </div>
      <p>User dashboard for {session?.user?.name}</p>
    </main>
  );
}

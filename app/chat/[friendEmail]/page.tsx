"use client";
import ChatApp from "@/app/components/Chat/ChatApp";
import { useSession } from "next-auth/react";

export default function Chat({ params }: { params: { friendEmail: string } }) {
  const { data: session } = useSession();
  return (
    <main className="bg-slate-800">
      <div className="">
        {session && session.user && session.user.email && (
          <ChatApp
            userEmail={session.user.email}
            friendEmail={params.friendEmail}
          />
        )}
      </div>
    </main>
  );
}

"use client";
import ChatApp from "@/app/components/Chat/ChatApp";
import Sidebar from "@/app/components/Chat/Sidebar";

export default function Chat({
  params,
}: {
  params: { id: string; friendEmail: string };
}) {
  return (
    <main className="bg-slate-800">
      <div className="">
        <ChatApp userId={params.id} friendEmail={params.friendEmail} />
      </div>
    </main>
  );
}

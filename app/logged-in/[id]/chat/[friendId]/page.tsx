"use client";
import ChatApp from "@/app/components/Chat/ChatApp";
import Sidebar from "@/app/components/Chat/Sidebar";

export default function Chat({
  params,
}: {
  params: { id: string; friendId: string };
}) {
  return (
    <main className="flex">
      <div className="flex-[1]">
        <Sidebar />
      </div>
      <div className="flex-[3]">
        <ChatApp userId={params.id} friendId={params.friendId} />
      </div>
    </main>
  );
}

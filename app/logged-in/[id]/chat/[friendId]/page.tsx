"use client";
import ChatApp from "@/app/components/Chat/ChatApp";
import Sidebar from "@/app/components/Chat/Sidebar";

export default function Chat({
  params,
}: {
  params: { id: string; friendId: string };
}) {
  return (
    <main className="">
      <div className="">
        <ChatApp userId={params.id} friendId={params.friendId} />
      </div>
    </main>
  );
}

"use client";
import { Message } from "@/app/types/user";
import { getChatId } from "@/lib/utils";
import { FC, useEffect, useRef, useState } from "react";

interface ChatAppProps {
  userId: string;
  friendId: string;
}

const ChatApp: FC<ChatAppProps> = ({ userId, friendId }) => {
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  async function handleSubmit() {
    await fetch("/api/newMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: userId,
        receiverId: friendId,
        message: messageRef.current?.value,
        timeStamp: Date.now(),
      }),
    });
  }

  const [chats, setChats] = useState<Message[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const rawChats = await fetch("/api/getChatsWithId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getChatId(userId, friendId)),
      });
      const chats = (await rawChats.json()) as Message[];
      setChats(chats);
    };
    fetchData();
  }, [friendId, userId]);

  return (
    <div>
      <div>
        {chats &&
          chats.map((chat) => {
            return (
              <div key={chat.timeStamp}>
                <div className="flex flex-col-reverse space-y-3">
                  <div
                    className={chat.senderId == userId ? "ml-auto" : "mr-auto"}
                  >
                    {chat.message}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="absolute w-[70vw] flex justify-between items-center bottom-2 ">
        <textarea
          name="chat"
          id="chat"
          cols={30}
          rows={10}
          ref={messageRef}
          className="border border-black"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="block w-fit mx-auto bg-slate-200 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;

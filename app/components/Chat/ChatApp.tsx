"use client";
import { Message, State } from "@/app/types/user";
import { pusherClient } from "@/lib/pusher";
import { getChatId, toPusherKey } from "@/lib/utils";
import { FC, useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import TextArea from "react-textarea-autosize";

interface ChatAppProps {
  userId: string;
  friendEmail: string;
}

const ChatApp: FC<ChatAppProps> = ({ userId, friendEmail }) => {
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const chatsRef = useRef<HTMLDivElement | null>(null);
  const [friendData, setFriendData] = useState<State | null>(null);
  useEffect(() => {
    async function fetchData() {
      const rawData = await fetch(`/api/getAccountByEmail/${friendEmail}`);
      const data = (await rawData.json()) as State;
      setFriendData(data);
    }
    fetchData();
  }, [friendEmail]);
  async function handleSubmit() {
    if (friendData == null) {
      return;
    }
    await fetch("/api/newMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: userId,
        receiverId: friendData._id,
        message: messageRef.current?.value,
        timeStamp: Date.now(),
      }),
    });
    if (messageRef.current != null) {
      messageRef.current.value = "";
      messageRef.current.focus();
    }
  }

  const [chats, setChats] = useState<Message[] | null>(null);

  useEffect(() => {
    if (friendData == null) {
      return;
    }
    const fetchData = async () => {
      const rawChats = await fetch("/api/getChatsWithId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getChatId(userId, friendData._id)),
      });
      const chats = (await rawChats.json()) as Message[];
      setChats(chats);
    };
    fetchData();
  }, [friendData, userId]);

  useEffect(() => {
    if (chatsRef.current != null) {
      chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    if (friendData == null) {
      return;
    }
    const chatHandler = ({
      senderId,
      receiverId,
      message,
      timeStamp,
    }: Message) => {
      setChats((prev) => {
        if (prev != null) {
          return [...prev, { senderId, receiverId, message, timeStamp }];
        } else {
          return [{ senderId, receiverId, message, timeStamp }];
        }
      });
    };
    pusherClient.subscribe(
      toPusherKey(`chat-${getChatId(userId, friendData._id)}`)
    );
    pusherClient.bind("chat", chatHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`chat-${getChatId(userId, friendData._id)}`)
      );
      pusherClient.unbind("chat", chatHandler);
    };
  }, [friendData, userId]);

  return (
    <div className="bg-slate-800 text-slate-200 h-screen overflow-hidden">
      <div className="py-2 bg-slate-700 h-[15vh] truncate flex flex-col items-center justify-center">
        <h1 className="text-center text-6xl">{friendData?.name}</h1>
        <p className="text-center text-slate-300">{friendData?.email}</p>
      </div>

      <div className="h-[65vh] py-3 overflow-y-auto" ref={chatsRef}>
        {chats &&
          chats.map((chat) => {
            return (
              <div key={chat.timeStamp}>
                <div className="flex flex-col-reverse space-y-2 px-5">
                  <div
                    className={
                      "px-3 py-2 rounded-3xl my-1 max-w-[80%]" +
                      (chat.senderId == userId
                        ? " bg-slate-700 ml-auto rounded-br-none"
                        : " bg-slate-900 mr-auto rounded-bl-none")
                    }
                  >
                    {chat.message}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="h-[20vh] flex items-end pb-2 justify-between gap-2 px-2">
        <TextArea
          minRows={1}
          ref={messageRef}
          className="block w-full border border-black text-slate-700 font-semibold py-4 px-2 rounded-lg leading-relaxed resize-none"
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        ></TextArea>
        <button
          onClick={handleSubmit}
          className="block border w-fit mx-auto text-slate-900 bg-slate-200 hover:bg-slate-800 hover:text-white px-7 py-5 rounded-md hover:border-slate-200 transition-colors duration-200"
        >
          <MdSend />
        </button>
      </div>
    </div>
  );
};

export default ChatApp;

"use client";
import { Message, State } from "@/app/types/user";
import { pusherClient } from "@/lib/pusher";
import { getChatId } from "@/lib/utils";
import { FC, useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import TextArea from "react-textarea-autosize";
import { format } from "date-fns";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LuLoader } from "react-icons/lu";
import { IconContext } from "react-icons";

interface ChatAppProps {
  userId: string;
  friendEmail: string;
}

const ChatApp: FC<ChatAppProps> = ({ userId, friendEmail }) => {
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const chatsRef = useRef<HTMLDivElement | null>(null);
  const [friendData, setFriendData] = useState<State | null>(null);
  const [chats, setChats] = useState<Message[] | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [loadingChats, setLoadingChats] = useState<boolean>(true);
  const [loadingSend, setLoadingSend] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      const rawData = await fetch(`/api/getAccountByEmail/${friendEmail}`);
      const data = (await rawData.json()) as State;
      setFriendData(data);
      setLoadingData(false);
    }
    fetchData();
  }, [friendEmail]);
  async function handleSubmit() {
    setLoadingSend(true);
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
      setLoadingSend(false);
    }
  }

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
      setLoadingChats(false);
    };
    fetchData();
  }, [friendData, userId]);

  useEffect(() => {
    if (chatsRef.current != null) {
      chatsRef.current.scrollTop =
        chatsRef.current.scrollHeight + chatsRef.current.clientHeight;
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
    pusherClient.subscribe(`chat-${getChatId(userId, friendData._id)}`);
    pusherClient.bind("chat", chatHandler);

    return () => {
      pusherClient.unsubscribe(`chat-${getChatId(userId, friendData._id)}`);
      pusherClient.unbind("chat", chatHandler);
    };
  }, [friendData, userId]);

  return (
    <SkeletonTheme baseColor="#333344" highlightColor="#aaa" duration={0.7}>
      <div className="bg-slate-800 text-slate-200 min-h-screen overflow-hidden">
        {loadingData ? (
          <div className="-mb-16 -mt-1 mx-auto">
            <Skeleton height={80} />
          </div>
        ) : (
          <div className="flex py-1 sm:py-2 bg-slate-700 items-center justify-center px-2 gap-2 fixed w-[100vw] h-[10vh] sm:h-[15vh] ">
            <div className="flex flex-col items-center align-middle justify-center w-12 h-12 rounded-full bg-slate-300 overflow-hidden dark:border-slate-400 dark:border-2">
              {friendData?.hasPic && (
                <Image
                  src={`data:image/png;base64,${friendData?.picture}`}
                  alt=""
                  width={70}
                  height={70}
                />
              )}
            </div>
            <div className="truncate flex flex-col items-center justify-center">
              <h1 className="text-center text-3xl sm:text-5xl truncate max-w-full px-2">
                {friendData?.name}
              </h1>
              <p className="text-center text-slate-300 truncate max-w-full px-2">
                {friendData?.email}
              </p>
            </div>
          </div>
        )}

        <div
          className="mt-20 h-[72vh] max-h-full mb-20 overflow-y-auto sm:mt-32"
          ref={chatsRef}
        >
          {loadingChats ? (
            <div className="flex flex-col gap-5">
              <Skeleton height={70} width={350} />
              <Skeleton height={70} width={250} />
              <div className="w-fit ml-auto">
                <Skeleton height={70} width={300} />
              </div>
              <Skeleton height={70} width={375} />
              <div className="w-fit ml-auto">
                <Skeleton height={70} width={250} />
              </div>
            </div>
          ) : (
            chats &&
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
                      <p>{chat.message}</p>
                      <p
                        className={
                          "text-xs text-slate-400" +
                          (chat.senderId == userId
                            ? " text-right"
                            : " text-left")
                        }
                      >
                        {format(chat.timeStamp, "HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {!loadingChats && !loadingData && (
          <div className="fixed bottom-0 h-[20vh] w-[100vw] flex items-end pb-2 justify-between gap-2 px-2">
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
            <IconContext.Provider
              value={{ className: "shared-class", size: "23" }}
            >
              <button
                onClick={handleSubmit}
                className="block border w-fit mx-auto text-slate-900 bg-slate-200 hover:bg-slate-800 hover:text-white px-7 py-[1.1rem] rounded-md hover:border-slate-200 transition-colors duration-200"
                disabled={loadingSend}
              >
                {loadingSend ? (
                  <div className="animate-spin">
                    <LuLoader />
                  </div>
                ) : (
                  <div>
                    <MdSend />
                  </div>
                )}
              </button>
            </IconContext.Provider>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

export default ChatApp;

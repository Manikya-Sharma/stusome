"use client";
import { Message, State } from "@/types/user";
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

// TODO: Make email based data storage or do something about _id
interface ChatAppProps {
  userEmail: string;
  friendEmail: string;
}

const ChatApp: FC<ChatAppProps> = ({ userEmail, friendEmail }) => {
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const chatsRef = useRef<HTMLDivElement | null>(null);
  const [friendData, setFriendData] = useState<State | null>(null);
  const [userData, setUserData] = useState<State | null>(null);
  const [chats, setChats] = useState<Message[] | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [loadingChats, setLoadingChats] = useState<boolean>(true);
  const [loadingSend, setLoadingSend] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData1() {
      const rawData = await fetch(`/api/getAccountByEmail/${friendEmail}`);
      const data = (await rawData.json()) as State;
      setFriendData(data);
      setLoadingData(false);
    }
    async function fetchData2() {
      const rawData = await fetch(`/api/getAccountByEmail/${userEmail}`);
      const data = (await rawData.json()) as State;
      setUserData(data);
      setLoadingData(false);
    }
    fetchData1();
    fetchData2();
  }, [friendEmail, userEmail]);

  async function handleSubmit() {
    setLoadingSend(true);
    if (friendData == null || userData == null) {
      return;
    }
    await fetch("/api/newMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: userData.email,
        receiverEmail: friendData.email,
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
    if (friendData == null || userData == null) {
      return;
    }
    const fetchData = async () => {
      const rawChats = await fetch("/api/getChatsWithId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getChatId(userData.email, friendData.email)),
      });
      const chats = (await rawChats.json()) as Message[];
      setChats(chats);
      setLoadingChats(false);
    };
    try {
      fetchData();
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setLoadingChats(false);
    }
  }, [friendData, userData]);

  useEffect(() => {
    if (chatsRef.current != null) {
      chatsRef.current.scrollTop =
        chatsRef.current.scrollHeight + chatsRef.current.clientHeight;
    }
  }, [chats]);

  useEffect(() => {
    if (friendData == null || userData == null) {
      return;
    }
    const chatHandler = ({
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
      message,
      timeStamp,
    }: Message) => {
      setChats((prev) => {
        if (prev != null) {
          return [
            ...prev,
            {
              senderEmail: senderEmail,
              receiverEmail: receiverEmail,
              message,
              timeStamp,
            },
          ];
        } else {
          return [
            {
              senderEmail: senderEmail,
              receiverEmail: receiverEmail,
              message,
              timeStamp,
            },
          ];
        }
      });
    };
    pusherClient.subscribe(
      `chat-${getChatId(userData.email, friendData.email)}`,
    );
    pusherClient.bind("chat", chatHandler);

    return () => {
      pusherClient.unsubscribe(
        `chat-${getChatId(userData.email, friendData.email)}`,
      );
      pusherClient.unbind("chat", chatHandler);
    };
  }, [friendData, userData]);

  return (
    <SkeletonTheme baseColor="#333344" highlightColor="#aaa" duration={0.7}>
      <div className="min-h-screen overflow-hidden bg-slate-800 text-slate-200">
        {loadingData ? (
          <div className="mx-auto -mb-16 -mt-1">
            <Skeleton height={80} />
          </div>
        ) : (
          <div className="fixed flex h-[10vh] w-[100vw] items-center justify-center gap-2 bg-slate-700 px-2 py-1 sm:h-[15vh] sm:py-2 ">
            <div className="flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded-full bg-slate-300 align-middle dark:border-2 dark:border-slate-400">
              {friendData && (
                <Image src={friendData.image} alt="" width={70} height={70} />
              )}
            </div>
            <div className="flex flex-col items-center justify-center truncate">
              <h1 className="max-w-full truncate px-2 text-center text-3xl sm:text-5xl">
                {friendData?.name}
              </h1>
              <p className="max-w-full truncate px-2 text-center text-slate-300">
                {friendData?.email}
              </p>
            </div>
          </div>
        )}

        <div
          className="mb-20 mt-20 h-[72vh] max-h-full overflow-y-auto sm:mt-32"
          ref={chatsRef}
        >
          {loadingChats ? (
            <div className="flex flex-col gap-5">
              <Skeleton height={70} width={350} />
              <Skeleton height={70} width={250} />
              <div className="ml-auto w-fit">
                <Skeleton height={70} width={300} />
              </div>
              <Skeleton height={70} width={375} />
              <div className="ml-auto w-fit">
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
                        "my-1 max-w-[80%] rounded-3xl px-3 py-2" +
                        (chat.senderEmail == userData?.email
                          ? " ml-auto rounded-br-none bg-slate-700"
                          : " mr-auto rounded-bl-none bg-slate-900")
                      }
                    >
                      <p>{chat.message}</p>
                      <p
                        className={
                          "text-xs text-slate-400" +
                          (chat.senderEmail == userData?.email
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
          <div className="fixed bottom-0 flex h-[20vh] w-[100vw] items-end justify-between gap-2 px-2 pb-2">
            <TextArea
              minRows={1}
              ref={messageRef}
              className="block w-full resize-none rounded-lg border border-black px-2 py-4 font-semibold leading-relaxed text-slate-700"
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
                className="mx-auto block w-fit rounded-md border bg-slate-200 px-7 py-[1.1rem] text-slate-900 transition-colors duration-200 hover:border-slate-200 hover:bg-slate-800 hover:text-white"
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

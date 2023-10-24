"use client";
import doubts from "@/public/doubts.json";

import { inter } from "@/custom-fonts/fonts";

import { useState, useEffect } from "react";
import MainQuestion from "@/app/components/Doubts/MainQuestion";
import Answer from "@/app/components/Doubts/Answer";
import GetAnswer from "@/app/components/Doubts/GetAnswer";
import { BarLoader } from "react-spinners";
import { State } from "@/types/user";

export default function Doubt({ params: { id } }: { params: { id: string } }) {
  const [data, setData] = useState<Doubt | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<Map<string, State>>();
  useEffect(() => {
    async function fetchAuthorData() {
      const authors: Map<string, State> = new Map();
      const emails: Array<string> = [
        ...doubt.answers.map((answer) => answer.author),
        ...doubt.answers.flatMap((answer) =>
          answer.replies.map((reply) => reply.author),
        ),
        doubt.author,
      ];

      const promises = emails.map((email) =>
        fetch(`/api/getAccountByEmail/${email}`),
      );

      const rawResponses = await Promise.all(promises);
      const responses = await Promise.all(
        rawResponses.map((response) => response.json()),
      );

      responses.map((value, index) => {
        authors.set(emails[index], value);
      });
      setAccounts(authors);
    }

    const doubt = doubts.filter((doubt) => doubt.id == id)[0];
    setData(doubt);

    // get authors
    fetchAuthorData().then(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <main className={"bg-gray-100 dark:bg-slate-800 " + inter.className}>
      {loading && (
        <div className="absolute left-0 top-0 z-[200]">
          <BarLoader
            height={3}
            width={width}
            color="#55fff6"
            cssOverride={{ backgroundColor: "#11aaaa", overflow: "hidden" }}
          />
        </div>
      )}
      <nav className="bg-black p-4 text-white dark:bg-slate-950">
        <div className="text-center">
          <h1 className="mb-3 text-2xl font-bold">{data?.title}</h1>
          <div className="mx-auto flex w-fit max-w-[80%] flex-wrap items-center justify-center">
            <p>tags:</p>
            {data &&
              data.tags.map((tag) => {
                return (
                  <p
                    key={tag}
                    className="dark:text=slate-200 mx-1 block w-fit rounded-xl bg-slate-300 px-2 py-1 text-xs text-slate-700 dark:bg-slate-800"
                  >
                    {tag}
                  </p>
                );
              })}
          </div>
        </div>
      </nav>
      <div className="px-4 sm:px-8">
        {data && accounts && (
          <MainQuestion
            author={accounts.get(data.author)}
            content={data.content}
          />
        )}

        {/* <!-- Doubts Section --> */}

        {data &&
          accounts &&
          data.answers.map((answer) => {
            return (
              <Answer
                key={answer.id}
                author={accounts.get(answer.author)}
                content={answer.content}
                replies={answer.replies}
                authors={accounts}
              />
            );
          })}

        <section className="container mx-auto mt-6">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 shadow-md dark:border-green-600 dark:bg-green-950">
            <h2 className="mb-4 text-xl font-semibold dark:text-slate-300">
              Post Your Answer
            </h2>
            <GetAnswer />
          </div>
        </section>
      </div>
    </main>
  );
}

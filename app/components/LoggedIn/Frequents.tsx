"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { quicksand } from "@/custom-fonts/fonts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { State } from "@/types/user";

export default function PopularDoubts() {
  const [width, setWidth] = useState<number>(0);
  const [doubts, setDoubts] = useState<Array<Doubt> | null>(null);
  const [users, setUsers] = useState<Array<{
    email: string;
    data: State;
  }> | null>(null);

  useEffect(() => {
    async function fetchData() {
      // get doubts
      const rawMostViewedDoubtIds = await fetch(
        "/api/doubts/getMostViewedDoubts",
        { cache: "no-cache" },
      );
      const mostViewedDoubtIds = (await rawMostViewedDoubtIds.json()) as Array<{
        id: string;
      }>;
      const requests = mostViewedDoubtIds.map((elem) => {
        return fetch(`/api/doubts/getDoubt/${elem.id}`);
      });
      const responses = await Promise.all(requests);
      let data = (await Promise.all(
        responses.map((response) => response.json()),
      )) as Doubt[];

      data = data.filter((doubt) => doubt != null);
      setDoubts(data);

      // authors
      const authorEmails = data.map((doubt) => doubt.author);
      const EmailRequests = authorEmails.map((email) => {
        return fetch(`/api/getAccountByEmail/${email}`);
      });
      const emailResponses = await Promise.all(EmailRequests);
      const authors = (await Promise.all(
        emailResponses.map((account) => {
          return account.json();
        }),
      )) as State[];

      const authorsArray: Array<{
        email: string;
        data: State;
      }> = [];
      for (let i = 0; i < authorEmails.length; i += 1) {
        authorsArray.push({ email: authorEmails[i], data: authors[i] });
      }
      setUsers(authorsArray);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setWidth(() => window.innerWidth);
  }, []);
  return (
    <section className="my-20">
      <h2 className="mb-5 mt-7 text-2xl font-semibold sm:text-5xl">
        Common Doubts
      </h2>
      <div className={quicksand.className}>
        <div className="text-lg">
          <Swiper
            allowTouchMove={true}
            slidesPerView={width < 600 ? 1 : 3}
            navigation={true}
            modules={[Navigation]}
            className="w-full [&>*:first-child]:ml-10 [&>*:last-child]:mr-10"
          >
            {doubts &&
              doubts.map((doubt) => {
                return (
                  <SwiperSlide key={doubt.id}>
                    <Link
                      href={`/doubts/${doubt.id}`}
                      className="mx-3 block h-[30vh] rounded-md border border-rose-300 px-2 py-2 text-center transition-all duration-150 hover:bg-rose-300 hover:text-pink-800 dark:border-rose-300 dark:bg-zinc-700 dark:text-rose-100 dark:hover:bg-rose-200 dark:hover:text-rose-950"
                    >
                      <p>{doubt.title}</p>
                    </Link>
                  </SwiperSlide>
                );
              })}
            <SwiperSlide></SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

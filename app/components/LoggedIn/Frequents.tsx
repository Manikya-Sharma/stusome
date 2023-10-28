"use client";
import { useEffect, useState } from "react";
import { quicksand } from "@/custom-fonts/fonts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { State } from "@/types/user";
import DoubtTile from "./DoubtTile";
import LoadingSkeleton from "./LoadingSkeleton";

export default function PopularDoubts() {
  const [width, setWidth] = useState<number>(0);
  const [doubts, setDoubts] = useState<Array<Doubt> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
      setLoading(false);

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
      {loading ? (
        <LoadingSkeleton />
      ) : (
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
                users &&
                doubts.map((doubt) => {
                  return (
                    <SwiperSlide key={doubt.id}>
                      <DoubtTile
                        doubt={doubt}
                        authorName={
                          users
                            .filter((user) => user.email == doubt.author)[0]
                            .data.name.split(" ")[0]
                        }
                      />
                    </SwiperSlide>
                  );
                })}
              <SwiperSlide></SwiperSlide>
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
}

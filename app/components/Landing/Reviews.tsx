"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import reviews from "@/public/reviews.json";

export default function Reviews() {
  return (
    <div className="max-w-full overflow-hidden">
      <section className="relative text-gray-600 body-font mx-auto">
        <div className="-z-50 absolute -top-28 left-0 bg-gradient-to-b from-amber-300 to-white w-[100vw] h-56"></div>
        <h2 className="text-center text-3xl md:text-5xl text-slate-700 font-merri tracking-tight my-5">
          Reviews from our Users
        </h2>
        <Swiper
          centeredSlides={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          allowTouchMove={true}
          slidesPerView={1}
          className="w-full"
        >
          {reviews.map(
            (elem: {
              image: string;
              content: string;
              name: string;
              position: string;
            }) => {
              return (
                <SwiperSlide key={elem.name}>
                  <div className="container mx-auto mb-7">
                    <div className="lg:w-1/3 lg:mb-0 mb-6 p-4 mx-auto">
                      <div className="h-full text-center">
                        <Image
                          alt=""
                          className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                          src={elem.image}
                          width={300}
                          height={300}
                        />
                        <p className="leading-relaxed md:text-lg">
                          {elem.content}
                        </p>
                        <span className="inline-block h-1 w-10 rounded bg-red-500 mt-6 mb-4"></span>
                        <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm md:text-md">
                          {elem.name.toUpperCase()}
                        </h2>
                        <p className="text-gray-500">{elem.position}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      </section>
    </div>
  );
}

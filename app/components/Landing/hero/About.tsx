"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { quicksand } from "@/custom-fonts/fonts";
import "swiper/css";

export default function About() {
  return (
    <div
      className={
        "mx-auto my-5 w-[50%] text-center text-lg sm:text-2xl" +
        quicksand.className
      }
    >
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay]}
        loop={true}
      >
        <SwiperSlide>
          <div className="cursor-default rounded-md bg-gradient-to-br from-[rgba(52,211,253,0.6)] to-[rgba(50,70,100,0.8)] p-5 text-[#fff] drop-shadow-md">
            Tired of unsolved doubts?
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="cursor-default rounded-md bg-gradient-to-br from-[rgba(52,211,253,0.6)] to-[rgba(50,70,100,0.8)] p-5 text-[#fff] drop-shadow-md">
            Want to have guidance from seniors?
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="cursor-default rounded-md bg-gradient-to-br from-[rgba(52,211,253,0.6)] to-[rgba(50,70,100,0.8)] p-5 text-[#fff] drop-shadow-md">
            Want to expand your network?
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="cursor-default rounded-md bg-gradient-to-br from-[rgba(52,211,253,0.6)] to-[rgba(50,70,100,0.8)] p-5 text-[#fff] drop-shadow-md">
            Need a social media without distractions?
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

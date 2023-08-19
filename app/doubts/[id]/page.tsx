"use client";
import doubts from "@/public/doubts.json";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Doubt() {
  const pathname = usePathname();
  const id = parseInt(pathname.split("/")[2]);
  const [state, setState] = useState({
    id: id,
    title: "",
  });
  useEffect(() => {
    for (const doubt of doubts) {
      if (doubt.id == id) {
        setState(doubt);
      }
    }
  }, [id]);
  return <h1>{state.title}</h1>;
}

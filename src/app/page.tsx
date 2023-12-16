"use client";
import Image from "next/image";
import Navbar from "./Navbar";
import { topNews } from "@/lib/fetchNews";
import { useEffect, useState } from "react";
import { StoryComponent } from "@/components/page";

export default function Home() {
  const [topStory, setTopStory] = useState([]);
  const fetchTStory = async () => {
    const res = await topNews(6);
    setTopStory(res);
  }
  useEffect(() => {
    fetchTStory();
  }, []);
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <>
      <Navbar />
      <section className="w-full">
        <StoryComponent newsType="Top Stories" newsData={topStory} />
      </section>
    </>
    //</main>
  );
}

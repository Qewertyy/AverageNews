"use client";
import { topNews } from "@/lib/fetchNews";
import { useEffect, useState } from "react";
import { NewsComponent, NewsLoading } from "@/components/News";
import { LoaderIcon } from "lucide-react";

type TopStories = {
  newsId: string;
  title: string;
  author: string;
  source:string;
  url: string;
  content: string;
  description: string;
  imageUrl: string;
  timestamp: string;
  author_url: string;
};

export default function Home() {
  const [topStory, setTopStory] = useState<TopStories[]>([]);
  const [counts, setCounts] = useState(6);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newsOffset, setNewsOffset] = useState<string>();
  const fetchTStory = async () => {
    const res = await topNews(counts);
    if (!res) {
      return <h1>Something went wrong</h1>;
    }
    setTopStory(res);
    setLoading(false);
    setLoadMore(false);
  };
  useEffect(() => {
    fetchTStory();
  }, [counts]);
  const handleBtnClick = () => {
    setNewsOffset(topStory.at(-1)?.newsId);
    setLoadMore(true);
    setCounts(counts + 3);
  };
  return (
    <>
      {loading ? (
        <NewsLoading />
      ) : (
        <div
          className="flex justify-center p-3 flex-col items-center"
          id="mainDiv"
        >
          <NewsComponent newsType="Top Stories" newsData={topStory} />
          {loadMore ? (
            <LoaderIcon size={32} />
          ) : (
            <button
              className="w-40 bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded"
              onClick={handleBtnClick}
            >
              Load More
            </button>
          )}
        </div>
      )}
      <p className="text-center mb-3">Source -&gt; <a target="_blank" className=" text-blue-200 hover:underline" href="https://github.com/Qewertyy/AverageNews">Github</a></p>
    </>
  );
}

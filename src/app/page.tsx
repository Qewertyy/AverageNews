"use client";
import { topNews } from "@/lib/fetchNews";
import { useEffect, useState } from "react";
import { NewsComponent, NewsLoading } from "@/components/News";
import { LoaderIcon } from "lucide-react";

export default function Home() {
  const [topStory, setTopStory] = useState([]);
  const [counts, setCounts] = useState(6);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
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
    setLoadMore(true);
    setCounts(counts + 3);
    document?.getElementById("mainDiv")?.scrollIntoView({ behavior: "smooth" });
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
    </>
  );
}

"use client";
import Navbar from "./Navbar";
import { topNews } from "@/lib/fetchNews";
import { useEffect, useState } from "react";
import { NewsComponent } from "@/components/page";
import { usePathname } from "next/navigation";


export default function Home() {
  const [topStory, setTopStory] = useState([]);
  const [counts, setCounts] = useState(6);
  const [loading, setLoading] = useState(false);
  const fetchTStory = async () => {
    const res = await topNews(counts);
    setTopStory(res);
    setLoading(false);
  };
  useEffect(() => {
    fetchTStory();
  }, [counts]);
  const handleBtnClick = () => {
    setLoading(true);
    setCounts(counts + 3);
  };
  const ok = usePathname();
  return (
    <>
      { ok === "/" && <NewsComponent newsType="Top Stories" newsData={topStory} />}
      <div className="flex justify-center">
        { loading ? (<button type="button" className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded" disabled>
          <svg className="animate-spin h-1 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
          Loading....
        </button>) :

        (<button
          className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded"
          onClick={handleBtnClick}
        >
          Load More
        </button>)
        }
      </div>
    </>
  );
}

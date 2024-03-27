"use client";
import { NewsComponent } from "@/components/News";
import { getCategories, getNewsByCategory } from "@/lib/fetchNews";
import { usePathname, notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function News() {
  const [categories, setCategories] = useState<string[] | undefined>([]);
  const [category, setCategory] = useState<string>("");
  const [pageNo, setPageNo] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const pathname = usePathname();
  useEffect(() => {
    const [newCategory, newPageNo] = [
      pathname.split("/")[1],
      pathname.split("/")[2],
    ];
    setCategory(newCategory.charAt(0).toUpperCase() + newCategory.slice(1));
    setPageNo(parseInt(newPageNo));
  }, [pathname]);

  const fetchNews = async () => {
    try {
      const res = await getNewsByCategory(category, pageNo);
      setNews(res);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (category !== "") {
      fetchNews();
    }
  }, [category]);

  if (loading || categories === undefined) {
    return <p>Loading...</p>;
  }
  if (categories.length === 0 || !categories.includes(category)) {
    return notFound();
  }
  return (
    <div>
      <NewsComponent newsType={category} newsData={news} />
      <div className="flex justify-center gap-6">
      <button
          className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded"
          disabled={pageNo === 1}
          onClick={() => window.location.href = `/${category}/${pageNo - 1}`}
          style={{
            cursor: pageNo === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <button
          className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded"
          disabled={news.length < 6 || pageNo > 10}
          onClick={() => window.location.href = `/${category}/${pageNo + 1}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

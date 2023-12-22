"use client";
import { NewsComponent } from "@/components/page";
import { getCategories, getNewsByCategory } from "@/lib/fetchNews";
import { usePathname, notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function News() {
  const [categories, setCategories] = useState<string[] | undefined>([]);
  const [category, setCategory] = useState<string>("");
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

  const fetchNews = async () => {
    try {
      const res = await getNewsByCategory(category);
      setNews(res);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const pathname = usePathname();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const newCategory = pathname.split("/")[1];
    setCategory(newCategory.charAt(0).toUpperCase() + newCategory.slice(1));
  }, [pathname]);

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
          disabled={true}
        >
          Previous
        </button>
        <button
          className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded"
          disabled={news.length < 6}
          onClick={() => window.location.href = `/${category}/${2}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

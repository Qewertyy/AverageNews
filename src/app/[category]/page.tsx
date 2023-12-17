"use client";
import { NewsComponent } from "@/components/page";
import { getCategories, getNewsByCategory } from "@/lib/fetchNews";
import { usePathname, notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function News() {
  const [categories, setCategories] = useState<string[] | undefined>([]);
  const [category, setCategory] = useState("");
  const [news, setNews] = useState([]);

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
    fetchCategories();
  }, []);

  const fetchNews = async () => {
    try {
      console.log(category);
      const res = await getNewsByCategory(category);
      setNews(res);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    const newCategory = pathname.split("/")[1];
    setCategory(newCategory.charAt(0).toUpperCase() + newCategory.slice(1));
  }, [pathname]);

  useEffect(() => {
    fetchNews();
  }, [category]);

  if (!categories) {
    return notFound()
  }
  if (categories.length === 0) {
    return <p>Loading...</p>;
  }

  if (!categories.includes(category as string)) {
    console.log("not found");
    return notFound();
  }
  return (
    <div>
      <NewsComponent newsType={category} newsData={news} />
    </div>
  );
}

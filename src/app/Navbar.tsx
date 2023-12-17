"use client";
import { getCategories, topNews } from "@/lib/fetchNews";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [categories, setCategories] = useState<string[]|undefined>([]);
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const renderCategories = categories && categories.map((category,index) => {
    return index <= 5 && (
      <Link className="text-zinc-100 hover:text-zinc-400 cursor-pointer" key={index+category} href={"/"+category}>
        {category}
      </Link>
    );
  });
  return (
    <header className="bg-black text-zinc-100 py-4 border-w">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold cursor-pointer" onClick={()=>window.location.href = "/"}>Average News</div>
          <div className="space-x-4">{renderCategories}</div>
        </nav>
      </div>
    </header>
  );
}

"use client";
import { getCategories, topNews } from "@/lib/fetchNews";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  
  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const renderCategories = categories.map((category,index) => {
    return index <= 5 && (
      <Link className="text-zinc-100 hover:text-zinc-400" key={index+category} href="#">
        {category}
      </Link>
    );
  });
  return (
    <header className="bg-black text-zinc-100 py-4 border-w">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold">Average News</div>
          <div className="space-x-4">{renderCategories}</div>
        </nav>
      </div>
    </header>
  );
}
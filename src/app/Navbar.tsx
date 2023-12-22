"use client";
import { getCategories, topNews } from "@/lib/fetchNews";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../Styles/Navbar.css";

export default function Navbar() {
  const [categories, setCategories] = useState<string[] | undefined>([]);
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const renderCategories =
    categories &&
    categories.map((category, index) => {
      return (
        index <= 10 && (
          <Link
            className="text-gray-300 hover:bg-black hover:text-white rounded-md px-3 py-2 text-lg"
            key={index + category}
            href={"/" + category}
            onClick={() => document.getElementById("nav-check")?.click()}
          >
            {category}
          </Link>
        )
      );
    });
  return (
    <>
      <nav className="bg-black">
        <div className="nav">
          <div className="nav-header">
            <Link className="text-2xl font-bold pt-3.5 pl-4 cursor-pointer" href='/'>AverageNews</Link>
          </div>
          <input type="checkbox" id="nav-check" />
          <div className="nav-btn">
            <label className="label" htmlFor="nav-check">
              <div className="menu">
                <span className="span1"></span>
                <span className="span2"></span>
                <span className="span3"></span>
              </div>
            </label>
          </div>

          <div className="nav-links">
            {renderCategories}
          </div>
        </div>
      </nav>
    </>
  );
}

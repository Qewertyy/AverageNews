import Image from "next/image";
import Link from "next/link";
import { Loading } from "./ui/loading";

interface newsProps {
  newsType: string;
  newsData: {
    newsId: string;
    title: string;
    content: string;
    url: string;
    imageUrl: string;
  }[];
}

export function NewsComponent({ newsType, newsData }: newsProps) {
  const items = newsData.map((item: any, index: number) => {
    return (
      <section
        key={item.newsId}
        className="hover:scale-105 transition-transform"
      >
        <div>
          <img
            alt={item.title}
            className="w-full h-64 object-cover object-center rounded-lg"
            height="400"
            src={item.imageUrl}
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width="600"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-2">{item.title}</h3>
          <p className="text-zinc-100 text-xs dark:text-zinc-400">
            {item.content}
          </p>
          <Link
            className="text-blue-500 hover:text-blue-700 mt-4"
            href={item.url}
          >
            Read More
          </Link>
        </div>
      </section>
    );
  });
  return (
    <main className="container mx-auto px-4 md:px-6 py-8 pb-0 pt-1.5">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{newsType}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{items}</div>
      </section>
    </main>
  );
}
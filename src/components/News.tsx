import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

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
        className="hover:translate-x-[5px] transition-transform border-solid border-white border-2 p-3 flex flex-col justify-center rounded-md"
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
        <div className="flex flex-col justify-center gap-3">
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-zinc-100 text-xs dark:text-zinc-400">
            {item.content}
          </p>
          <Link
            className="text-blue-400  hover:text-blue-500 w-[6.3rem] "
            href={item.url}
          >
            Read More
          </Link>
        </div>
      </section>
    );
  });
  console.log(items.length);
  return (
    <main className="container mx-auto px-4 md:px-6 py-8 pb-0 pt-1.5">
      <section className="mb-[0.75rem] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">{newsType}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-items-center">
          {items}
        </div>
      </section>
    </main>
  );
}

export function NewsLoading() {
  const items = Array.from({ length: 6 }).map((_, index) => {
    return (
      <div key={index} className="flex flex-col align-middle">
        <div>
          <Skeleton className="h-[256px] w-[395px] rounded-xl" />
        </div>
        <div>
          <Skeleton className="h-3 w-[350px]" />
          <Skeleton className="h-2 w-[300px]" />
          <Skeleton className="h-2 w-[300px]" />
          <Skeleton className="h-2 w-[300px]" />
        </div>
      </div>
    );
  });
  return (
    <main className="container mx-auto px-4 md:px-6 py-8 pb-0 pt-1.5">
      <div>
        <Skeleton className="text-2xl font-bold mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{items}</div>
      </div>
    </main>
  );
}

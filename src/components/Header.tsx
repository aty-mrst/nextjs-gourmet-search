import { PLACE } from "@/data/data";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="text-center py-5 border-b fixed w-[100%] top-0 bg-white z-20">
      <h1 className="inline-block text-xl">
        <Link href={"/"}>〜山口県 グルメガイド〜</Link>
      </h1>

      <div className="whitespace-nowrap overflow-x-scroll">
        {PLACE.map((place) => (
          <Link key={place.NAME} href={place.URL} className="mx-3">
            {place.NAME}
          </Link>
        ))}
      </div>
    </header>
  );
};

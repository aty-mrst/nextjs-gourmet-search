import { PLACE } from "@/data/data";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";

type HeaderType = {
  area: string | string[] | undefined;
  setSideIn: any;
  setGenreName: any;
  setSearchNum: any;
  setShopData: any;
};

export const Header = ({
  area,
  setSideIn,
  setGenreName,
  setSearchNum,
  setShopData,
}: HeaderType) => {
  useEffect(() => {
    setGenreName("全てのジャンル");
    const firstGetShop = async () => {
      try {
        if (!area) return;

        const res = await axios.get("/api/getShopLists", {
          params: {
            place: area,
          },
        });
        console.log(res.data);
        setSearchNum(res.data.results_available);
        setShopData(res.data.shop);
      } catch (err) {
        console.log(err);
      }
    };
    firstGetShop();
  }, [area]);

  const handleArea = () => {
    setSideIn(null);
  };

  return (
    <header className="text-center py-5 border-b fixed w-[100%] top-0 bg-white z-20">
      <h1 className="inline-block text-xl">
        <Link href={"/"}>〜山口県 グルメガイド〜</Link>
      </h1>

      <div className="whitespace-nowrap overflow-x-scroll">
        {PLACE.map((place) => (
          <Link
            key={place.NAME}
            href={place.URL}
            className="mx-3"
            onClick={handleArea}
          >
            {place.NAME}
          </Link>
        ))}
      </div>
    </header>
  );
};

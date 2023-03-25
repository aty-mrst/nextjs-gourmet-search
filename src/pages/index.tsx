import { Footer } from "@/components/Footer";
import GenreButton from "@/components/GenreButton";
import { Header } from "@/components/Header";
import { GENRES } from "@/data/place";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [searchNum, setSearchNum] = useState(null);
  const [shopData, setShopData] = useState([]);

  const getPlaceShop = async (genre: string) => {
    try {
      const res = await axios.get("/api/search", {
        params: {
          genre: genre,
        },
      });
      setSearchNum(res.data.results_available);
      setShopData(res.data.shop);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center max-w-[1200px] mx-auto mt-10">
        <aside className="w-[220px] max-w-[25%]">
          {GENRES.map((genre) => (
            <GenreButton
              key={genre.NAME}
              genreName={genre.NAME}
              onClick={() => getPlaceShop(genre.NUM)}
            />
          ))}
        </aside>
        <main className="px-5 w-[calc(100%-220px)]">
          {searchNum ? (
            <p>
              <span>{searchNum}</span>件のお店が見つかりました！
            </p>
          ) : (
            <p>ジャンルを選択してください</p>
          )}
          <ul>
            {shopData.map((shop: any) => (
              <li key={shop.id} className="my-5">
                <a
                  href={shop.urls.pc}
                  target="_blank"
                  className="flex justify-between px-5 py-8 bg-[#f7f3e1] border hover:border"
                >
                  <div className="w-[200px] h-[200px] relative">
                    <Image fill src={shop.photo.pc.l} alt={shop.name} />
                  </div>

                  <div className="w-[calc(100%-220px)]">
                    <span className="text-xs block">{shop.genre.catch}</span>
                    <h2 className="text-xl border-b inline-block">
                      {shop.name}
                    </h2>
                    <span className="block text-sm">{shop.budget.average}</span>
                    {shop.card === "利用可" ? (
                      <p className="text-sm">カード利用可能</p>
                    ) : (
                      <p className="text-sm">カードは利用できません</p>
                    )}
                    {shop.course === "あり" && (
                      <p className="text-sm">コースあり</p>
                    )}
                    <p className="text-sm">アクセス: {shop.mobile_access}</p>
                    <p className="text-sm">駐車場: {shop.parking}</p>
                    <p className="text-sm">営業日時: {shop.open}</p>
                    <p className="text-sm">{shop.catch}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </main>
      </div>
      <Footer />
    </>
  );
}

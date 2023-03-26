import AreaSelect from "@/components/AreaSelect";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ShopItem } from "@/components/ShopItem";
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchNum, setSearchNum] = useState(null);
  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    setShopData([]);
  }, []);

  return (
    <>
      <Header />
      <AreaSelect />
      <div className="flex justify-center max-w-[1200px] mx-auto mt-10">
        <Sidebar
          setSearchNum={setSearchNum}
          setShopData={setShopData}
          area={"all"}
        />
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
              <ShopItem key={shop.id} shop={shop} />
            ))}
          </ul>
        </main>
      </div>
      <Footer />
    </>
  );
}

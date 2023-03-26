import FixedButton from "@/components/FixedButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutMain } from "@/components/LayoutMain";
import { LayoutWrap } from "@/components/LayoutWrap";
import { ShopItem } from "@/components/ShopItem";
import { Sidebar } from "@/components/Sidebar";
import { TextArea } from "@/components/TextArea";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchNum, setSearchNum] = useState(null);
  const [shopData, setShopData] = useState([]);

  // useEffect(() => {
  //   setShopData([]);
  // }, []);

  //sp サイドメニューの表示切り替え
  const [sideIn, setSideIn] = useState<string | null>(null);
  const sideNavIn = () => {
    if (!sideIn) {
      setSideIn("left-[0]");
    } else {
      setSideIn(null);
    }
  };

  return (
    <>
      <Header />

      <LayoutWrap>
        <Sidebar
          setSearchNum={setSearchNum}
          setShopData={setShopData}
          area={"all"}
          sideIn={sideIn}
          setSideIn={setSideIn}
        />
        <LayoutMain>
          <TextArea searchNum={searchNum} />
          <ul>
            {shopData.map((shop: any) => (
              <ShopItem key={shop.id} shop={shop} />
            ))}
          </ul>
        </LayoutMain>
      </LayoutWrap>

      <Footer />

      <FixedButton onClick={sideNavIn} />
    </>
  );
}

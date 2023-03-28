import FixedButton from "@/components/FixedButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutMain } from "@/components/LayoutMain";
import { LayoutWrap } from "@/components/LayoutWrap";
import { ShopItem } from "@/components/ShopItem";
import { Sidebar } from "@/components/Sidebar";
import { TextArea } from "@/components/TextArea";
import { useState } from "react";

export default function Home() {
  const [searchNum, setSearchNum] = useState(null);
  const [shopData, setShopData] = useState([]);
  const [genreName, setGenreName] = useState("全てのジャンル");

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
      <Header
        setSideIn={setSideIn}
        area={"all"}
        setGenreName={setGenreName}
        setSearchNum={setSearchNum}
        setShopData={setShopData}
      />

      <LayoutWrap>
        <Sidebar
          setSearchNum={setSearchNum}
          setShopData={setShopData}
          area={"all"}
          sideIn={sideIn}
          setSideIn={setSideIn}
          setGenreName={setGenreName}
        />
        <LayoutMain>
          <TextArea searchNum={searchNum} genreName={genreName} area={"all"} />
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

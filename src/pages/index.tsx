import FixedButton from "@/components/FixedButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutMain } from "@/components/LayoutMain";
import { LayoutWrap } from "@/components/LayoutWrap";
import { ShopItem } from "@/components/ShopItem";
import { Sidebar } from "@/components/Sidebar";
import { TextArea } from "@/components/TextArea";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

type HomeType = {
  pageNum: number | undefined;
  resolvedUrl: string | undefined;
};

export default function Home({ pageNum, resolvedUrl }: HomeType) {
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

  const firstGetShop = async () => {
    try {
      const res = await axios.get("/api/getShopLists", {
        params: {
          place: "all",
          startNum: pageNum,
        },
      });
      setSearchNum(res.data.results_available);
      setShopData(res.data.shop);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setShopData([]);
    setSearchNum(null);
    setGenreName("全てのジャンル");
    firstGetShop();
  }, [resolvedUrl]);

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
          setGenreName={setGenreName}
          resolvedUrl={resolvedUrl}
        />
        <LayoutMain
          shopData={shopData}
          setSearchNum={setSearchNum}
          setShopData={setShopData}
          pageNum={pageNum}
        >
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { page } = context.query;

  console.log(context);

  if (!page || page === "0") page = "1";

  return {
    props: {
      pageNum: page,
      resolvedUrl: "/",
    },
  };
};

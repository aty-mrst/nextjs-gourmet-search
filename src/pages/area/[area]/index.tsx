import FixedButton from "@/components/FixedButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutMain } from "@/components/LayoutMain";
import { LayoutWrap } from "@/components/LayoutWrap";
import { ShopItem } from "@/components/ShopItem";
import { Sidebar } from "@/components/Sidebar";
import { TextArea } from "@/components/TextArea";
import axios from "axios";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";

type HomeType = {
  area: string | undefined;
  pageNum: number | undefined;
};

export default function Home({ area, pageNum }: HomeType) {
  const [searchNum, setSearchNum] = useState(null);
  const [shopData, setShopData] = useState([]);
  const [genreName, setGenreName] = useState("全てのジャンル");
  const [areaName, setAreaName] = useState("");

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
    setShopData([]);
    setSearchNum(null);
    try {
      const res = await axios.get("/api/getShopLists", {
        params: {
          place: area,
          startNum: 1,
        },
      });
      setGenreName("全てのジャンル");
      setSearchNum(res.data.results_available);
      setShopData(res.data.shop);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    firstGetShop();
  }, []);

  return (
    <>
      <Header onClick={firstGetShop} />

      <LayoutWrap>
        <Sidebar
          area={area}
          resolvedUrl={`/area/${area}/genre`}
          setSearchNum={setSearchNum}
          setShopData={setShopData}
          sideIn={sideIn}
          setSideIn={setSideIn}
          setGenreName={setGenreName}
        />
        <LayoutMain shopData={shopData} currentNum={1}>
          <TextArea searchNum={searchNum} genreName={genreName} area={area} />
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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { area: "" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const area = context.params?.area;

  return {
    props: {
      area,
    },
  };
};

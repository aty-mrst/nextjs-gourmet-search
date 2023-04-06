import FixedButton from "@/components/FixedButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutMain } from "@/components/LayoutMain";
import { LayoutWrap } from "@/components/LayoutWrap";
import { ShopItem } from "@/components/ShopItem";
import { Sidebar } from "@/components/Sidebar";
import { TextArea } from "@/components/TextArea";
import { GENRES } from "@/data/data";
import axios from "axios";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";

type HomeType = {
  pageNum: number;
  genreNum: string;
  genreItem: string;
};

export default function Home({ pageNum, genreNum, genreItem }: HomeType) {
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
    setShopData([]);
    setSearchNum(null);
    try {
      const res = await axios.get("/api/getShopLists", {
        params: {
          place: "all",
          genre: genreNum,
          startNum: 1,
        },
      });
      setGenreName(genreItem);
      setSearchNum(res.data.results_available);
      setShopData(res.data.shop);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    firstGetShop();
  }, [genreNum]);

  return (
    <>
      <Header onClick={firstGetShop} />

      <LayoutWrap>
        <Sidebar
          area={"all"}
          resolvedUrl={"/genre"}
          setSearchNum={setSearchNum}
          setShopData={setShopData}
          sideIn={sideIn}
          setSideIn={setSideIn}
          setGenreName={setGenreName}
        />
        <LayoutMain
          shopData={shopData}
          // setSearchNum={setSearchNum}
          // setShopData={setShopData}
          currentPage={1}
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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    // paths: [{ params: { genre: "" } }],
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const genreUrl = context.params?.genre;
  const pickupGenre = GENRES.find((genre) => {
    return genre.KEY === genreUrl;
  });
  //apiを叩く用のジャンル番号
  const genreNum = pickupGenre && pickupGenre.NUM;
  //画面表示用のジャンル名
  const genreItem = pickupGenre && pickupGenre.NAME;

  return {
    props: { genreNum, genreItem },
  };
};

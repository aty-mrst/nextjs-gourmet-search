import FixedButton from "@/components/FixedButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutMain } from "@/components/LayoutMain";
import { LayoutWrap } from "@/components/LayoutWrap";
import { Meta } from "@/components/Meta";
import { Pagination } from "@/components/Pagination";
import { ShopItem } from "@/components/ShopItem";
import { Sidebar } from "@/components/Sidebar";
import { TextArea } from "@/components/TextArea";
import { GENRES, REVALIDATE_TIME } from "@/data/data";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type HomeType = {
  genreNum: string;
  genreItem: string;
};

export default function Home({ genreNum, genreItem }: HomeType) {
  const [searchNum, setSearchNum] = useState(null);
  const [shopData, setShopData] = useState([]);
  const [genreName, setGenreName] = useState("全てのジャンル");
  const [totalPages, setTotalPages] = useState(1);
  const [loadAreaText, setLoadAreaText] = useState("お店を探しています・・・");
  const [isPagination, setIsPagination] = useState(true);

  const router = useRouter();
  const { query, asPath } = router;
  const currentPage = query.page || 1;
  const urlWithoutQuery = asPath.split("?")[0];

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
    setIsPagination(true);
    setShopData([]);
    setSearchNum(null);
    try {
      const res = await axios.get("/api/getShopLists", {
        params: {
          place: "all",
          genre: genreNum,
          startNum: currentPage,
        },
      });
      setGenreName(genreItem);
      setShopData(res.data.shop);
      setTotalPages(Math.ceil(res.data.results_available / 10));
      await setSearchNum(res.data.results_available);
      if (!res.data.results_available) {
        setLoadAreaText("条件に一致するお店が見つかりませんでした。");
      } else {
        setLoadAreaText("お店を探しています・・・");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    firstGetShop();
    setSideIn(null);
  }, [genreNum, router.query]);

  return (
    <>
      <Meta title={`山口県の${genreItem}`} />

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
          setIsPagination={setIsPagination}
        />
        <LayoutMain>
          {/* リードエリア */}
          <TextArea
            searchNum={searchNum}
            genreName={genreName}
            area={"all"}
            loadAreaText={loadAreaText}
          />

          {/* 店舗リスト */}
          <ul>
            {shopData.map((shop: any) => (
              <ShopItem key={shop.id} shop={shop} />
            ))}
          </ul>

          {/* ページネーション */}
          {shopData.length && isPagination ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              path={urlWithoutQuery}
            />
          ) : (
            ""
          )}
        </LayoutMain>
      </LayoutWrap>

      <Footer />

      <FixedButton onClick={sideNavIn} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
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
    revalidate: REVALIDATE_TIME,
  };
};

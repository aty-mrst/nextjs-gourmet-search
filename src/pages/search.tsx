import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutMain } from "@/components/LayoutMain";
import { Meta } from "@/components/Meta";
import { Pagination } from "@/components/Pagination";
import { SearchArea } from "@/components/SearchArea";
import { ShopItem } from "@/components/ShopItem";
import { TextArea } from "@/components/TextArea";
import { Alert } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  prefecture: [];
  genres: [];
};

export default function Search({ prefecture, genres }: Props) {
  const [searchNum, setSearchNum] = useState(null); //ショップ数
  const [shopData, setShopData] = useState([]); //ショップリスト
  const [totalPages, setTotalPages] = useState(1); //ページネーションの総数
  const [isLoad, setIsLoad] = useState(true); //ロード用
  const [isLikePopUp, setIsLikePopUp] = useState(false); //ポップアップ用
  const [popUpText, setPopUpText] = useState(""); //ポップアップテキスト

  const router = useRouter();
  const { query, asPath } = router;
  const currentPage = query.page || 1; //現在のページ

  const areaCode = query.area; //パラメータ エリアコード
  const genreCode = query.genre; //パラメータ ジャンルコード
  const keyword = query.keyword; //パラメータ キーワード

  const firstGetShop = async () => {
    try {
      setIsLoad(true);
      setShopData([]);
      const res = await axios.get("/api/getShopLists", {
        params: {
          startNum: currentPage,
          areaCode,
          genreCode,
          keyword,
        },
      });
      setShopData(res.data.shop);
      setSearchNum(res.data.results_available);
      setTotalPages(Math.ceil(res.data.results_available / 10));
      setIsLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    firstGetShop();
  }, [router.query]);

  return (
    <>
      <Meta />

      {/* いいねのポップアップ */}
      {isLikePopUp && (
        <div className="fixed w-[100%] top-0 z-30">
          <Alert variant="filled" severity="success">
            {popUpText}
          </Alert>
        </div>
      )}

      <Header />

      {/* 検索エリア */}
      <SearchArea prefecture={prefecture} genres={genres} />

      <LayoutMain>
        {/* リードエリア */}
        <TextArea
          isLoad={isLoad}
          searchNum={searchNum}
          totalPages={totalPages}
          currentPage={currentPage}
        />

        {/* 店舗リスト */}
        <ul className="px-5 max-w-[768px] mx-auto">
          {shopData.map((shop: any) => (
            <ShopItem
              key={shop.id}
              shop={shop}
              setIsLikePopUp={setIsLikePopUp}
              setPopUpText={setPopUpText}
            />
          ))}
        </ul>

        {/* ページネーション */}
        {shopData.length ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            path={asPath}
          />
        ) : (
          ""
        )}
      </LayoutMain>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  //apiURL
  const apiAreaUrl = process.env.HOTPEPPER_AREA_API;
  const apiGenreUrl = process.env.HOTPEPPER_GENRE_API;
  //apiキー
  const apiKey = `&key=${process.env.HOTPEPPER_API_KEY}`;

  //県ごとにエリアを取得
  const resArea = await fetch(`${apiAreaUrl}${apiKey}`);
  const resAreaJson = await resArea.json();
  const prefecture = resAreaJson.results.large_area;

  //ジャンルを取得
  const resGenre = await fetch(`${apiGenreUrl}${apiKey}`);
  const resGenreJson = await resGenre.json();
  const genres = resGenreJson.results.genre;

  return {
    props: {
      prefecture,
      genres,
    },
  };
}

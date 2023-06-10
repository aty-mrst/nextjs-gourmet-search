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
import { useAuthContext } from "@/context/AuthContext";
import { GENRES, PLACE, REVALIDATE_TIME } from "@/data/data";
import { Alert } from "@mui/material";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type HomeType = {
  area: string | undefined;
  genreNum: string;
  genreItem: string;
};

export default function Home({ area, genreNum, genreItem }: HomeType) {
  const [searchNum, setSearchNum] = useState(null); //ショップの数
  const [shopData, setShopData] = useState([]); //ショップのリスト
  const [genreName, setGenreName] = useState("全てのジャンル"); //ジャンル名
  const [totalPages, setTotalPages] = useState(1); //ページネーションの総数
  const [isPagination, setIsPagination] = useState(true); //ページネーションの有無
  const [isLoad, setIsLoad] = useState(false); //ロード用
  const [isLikePopUp, setIsLikePopUp] = useState(false); //ポップアップ用
  const [popUpText, setPopUpText] = useState(""); //ポップアップテキスト

  const router = useRouter();
  const { query, asPath } = router;
  const currentPage = query.page || 1;
  const urlWithoutQuery = asPath.split("?")[0];

  const { currentUser } = useAuthContext(); //ログイン状態

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
    setIsLoad(true);
    setIsPagination(true);
    setShopData([]);
    setSearchNum(null);
    try {
      const res = await axios.get("/api/getShopLists", {
        params: {
          place: area,
          genre: genreNum,
          startNum: currentPage,
        },
      });
      setGenreName(genreItem);
      setShopData(res.data.shop);
      setTotalPages(Math.ceil(res.data.results_available / 10));
      setSearchNum(res.data.results_available);
      setIsLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    firstGetShop();
    setSideIn(null);
  }, [genreNum, router.query]);

  //エリア名を取得
  const areaData = PLACE.find((data) => {
    return data.KEY === area;
  });
  const areaName = areaData?.NAME;

  return (
    <>
      <Meta title={`${areaName}駅チカの${genreItem}`} />

      {isLikePopUp && (
        <div className="fixed w-[100%] top-0 z-30">
          <Alert variant="filled" severity="success">
            {popUpText}
          </Alert>
        </div>
      )}

      <Header onClick={firstGetShop} currentUser={currentUser} />

      <LayoutWrap>
        <Sidebar
          area={area}
          resolvedUrl={`/area/${area}/genre`}
          setSearchNum={setSearchNum}
          setShopData={setShopData}
          sideIn={sideIn}
          setSideIn={setSideIn}
          setGenreName={setGenreName}
          setIsPagination={setIsPagination}
          setIsLoad={setIsLoad}
        />
        <LayoutMain>
          {/* リードエリア */}
          <TextArea
            searchNum={searchNum}
            genreName={genreName}
            area={area}
            isLoad={isLoad}
          />

          {/* 店舗リスト */}
          <ul>
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
  const area = context.params?.area;

  const genreUrl = context.params?.genre;
  const pickupGenre = GENRES.find((genre) => {
    return genre.KEY === genreUrl;
  });
  //apiを叩く用のジャンル番号
  const genreNum = pickupGenre && pickupGenre.NUM;
  //画面表示用のジャンル名
  const genreItem = pickupGenre && pickupGenre.NAME;

  return {
    props: {
      area,
      genreNum,
      genreItem,
    },
    revalidate: REVALIDATE_TIME,
  };
};

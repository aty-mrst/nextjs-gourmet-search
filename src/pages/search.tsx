import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutMain } from "@/components/LayoutMain";
import { Meta } from "@/components/Meta";
import { Pagination } from "@/components/Pagination";
import { SearchArea } from "@/components/SearchArea";
import { SearchAreaWrap } from "@/components/SearchAreaWrap";
import { ShopItem } from "@/components/ShopItem";
import { TextArea } from "@/components/TextArea";
import { useAuthContext } from "@/context/AuthContext";
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
  const [likeShopId, setLikeShopId] = useState([]); //いいね保存済みの店舗ID

  const router = useRouter();
  const { query, asPath } = router;
  const currentPage = query.page || 1; //現在のページ

  const areaCode = query.area; //パラメータ 県コード
  const stationPre = query.pre; //パラメータ 県名
  const stationPos = query.station; //パラメータ 駅名
  const genreCode = query.genre; //パラメータ ジャンルコード
  const keyword = query.keyword; //パラメータ キーワード

  const { currentUser } = useAuthContext(); //ログイン状態

  const getLikeShopId = async () => {
    //ログイン状態のみで実行する
    if (!currentUser) return;

    const resData = await axios.post("/api/getLikeShopList", {
      currentUserId: currentUser?.uid,
    });

    //いいね済みがなかった場合
    if (!Object.keys(resData.data).length) {
      setLikeShopId([]);
      return false;
    }

    const dataArray = resData.data.shop;
    const IdArray = dataArray.map((data: any) => {
      return data.id;
    });
    setLikeShopId(IdArray);
  };

  const firstGetShop = async () => {
    try {
      setIsLoad(true);
      setShopData([]);
      const res = await axios.get("/api/getShopLists", {
        params: {
          startNum: currentPage,
          areaCode,
          stationPre,
          stationPos,
          genreCode,
          keyword,
        },
      });

      //オブジェクトにいいね判定のプロパティを追加
      await res.data.shop.map((data: any) => {
        data.isLiked = false;
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
    getLikeShopId();
    firstGetShop();
  }, [router.query]);

  return (
    <>
      <Meta title="お店を探す" />

      <Header />

      {/* 検索エリア */}
      <SearchAreaWrap>
        <SearchArea prefecture={prefecture} genres={genres} />
      </SearchAreaWrap>

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
          {shopData.map((shop: any) => {
            likeShopId.map((id) => {
              if (shop.id === id) {
                shop.isLiked = true;
              }
            });
            return (
              <ShopItem
                key={shop.id}
                shop={shop}
                setIsLikePopUp={setIsLikePopUp}
                setPopUpText={setPopUpText}
                isLiked={shop.isLiked}
              />
            );
          })}
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

      {/* いいねのポップアップ */}
      <div
        className={`fixed w-[95%] left-[50%] translate-x-[-50%] bottom-3 z-30 ease-in-out duration-200 ${
          isLikePopUp ? "translate-y-[0]" : "translate-y-[150%]"
        } `}
      >
        <Alert variant="filled" severity="success">
          {popUpText}
        </Alert>
      </div>

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

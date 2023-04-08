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
import { REVALIDATE_TIME } from "@/data/data";
import axios from "axios";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
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
          startNum: currentPage,
        },
      });
      setGenreName("全てのジャンル");
      setShopData(res.data.shop);
      setTotalPages(Math.ceil(res.data.results_available / 10));
      setSearchNum(res.data.results_available);
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
  }, [router.query]);

  return (
    <>
      <Meta />

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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: REVALIDATE_TIME,
  };
};

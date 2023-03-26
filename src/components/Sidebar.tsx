import { GENRES } from "@/data/data";
import axios from "axios";
import { useEffect, useState } from "react";
import GenreButton from "./GenreButton";

type SidebarType = {
  setSearchNum: any;
  setShopData: any;
  area: string | string[] | undefined;
  sideIn: string | null;
  setSideIn: any;
};

export const Sidebar = ({
  setSearchNum,
  setShopData,
  area,
  sideIn,
  setSideIn,
}: SidebarType) => {
  const [inputWord, setInputWord] = useState("");

  useEffect(() => {
    setShopData([]);

    const firstGetShop = async () => {
      try {
        const res = await axios.get("/api/getShopLists", {
          params: {
            place: area,
          },
        });
        setSearchNum(res.data.results_available);
        setShopData(res.data.shop);
      } catch (err) {
        console.log(err);
      }
    };
    firstGetShop();
  }, [area]);

  /**
   * ジャンル別 店舗リストを取得
   */
  const getPlaceShop = async (genre: string) => {
    try {
      setSideIn(null);
      const res = await axios.get("/api/getShopLists", {
        params: {
          genre: genre,
          place: area,
        },
      });
      setSearchNum(res.data.results_available);
      setShopData(res.data.shop);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * 検索 フォーム入力テキスト取得
   */
  const onChangeText = (e: any) => {
    setInputWord(e.target.value);
  };

  /**
   * 検索 店舗リストを取得
   */
  const searchWord = async (e: any, inputWord: string) => {
    e.preventDefault();
    setSideIn(null);

    try {
      const res = await axios.get("/api/getShopLists", {
        params: {
          keyword: inputWord,
        },
      });
      setSearchNum(res.data.results_available);
      setShopData(res.data.shop);

      setInputWord("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside
      className={`w-[100%] h-[100vh] bg-white z-10 lg:w-[220px] lg:max-w-[25%] left-[-100%] top-[90px] fixed maxlg:overflow-scroll lg:h-[auto] lg:block lg:static transition-all ease-in-out duration-300 ${sideIn}`}
    >
      <div className="">
        <form id="searchForm" onSubmit={(e) => searchWord(e, inputWord)}>
          <input
            type="text"
            placeholder="キーワードを入力"
            value={inputWord}
            onChange={onChangeText}
          />
          <button type="submit">検索</button>
        </form>

        {GENRES.map((genre) => (
          <GenreButton
            key={genre.NAME}
            genreName={genre.NAME}
            onClick={() => getPlaceShop(genre.NUM)}
          />
        ))}
      </div>
    </aside>
  );
};

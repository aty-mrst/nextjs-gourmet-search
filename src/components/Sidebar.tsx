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
  setGenreName: any;
};

export const Sidebar = ({
  setSearchNum,
  setShopData,
  area,
  sideIn,
  setSideIn,
  setGenreName,
}: SidebarType) => {
  const [inputWord, setInputWord] = useState("");
  /**
   * ジャンル別 店舗リストを取得
   */
  const getPlaceShop = async (e: any, genre: string) => {
    setShopData([]);
    setGenreName(e.currentTarget.dataset.name);
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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    setGenreName(`「${inputWord}」で検索結果`);
    setSideIn(null);

    try {
      const res = await axios.get("/api/getShopLists", {
        params: {
          keyword: inputWord,
          place: area,
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
      className={`w-[100%] h-[100vh] bg-white z-10 lg:w-[220px] lg:max-w-[25%] left-[-100%] maxlg:top-[30px] maxlg:pt-[105px] fixed maxlg:overflow-scroll lg:h-[auto] lg:block lg:static transition-all ease-in-out duration-300 ${sideIn}`}
    >
      <div className="px-1 maxlg:px-3">
        <form id="searchForm" onSubmit={(e) => searchWord(e, inputWord)}>
          <input
            type="text"
            placeholder="キーワードを入力"
            value={inputWord}
            onChange={onChangeText}
            className="border border-[#F8E6CC] h-10 px-1 text-sm w-[75%]"
          />
          <button
            type="submit"
            className="bg-[#017D01] text-[#fff] h-10 text-sm w-[25%]"
          >
            検索
          </button>
        </form>

        <div className="mt-3">
          {GENRES.map((genre) => (
            <GenreButton
              key={genre.NAME}
              genreName={genre.NAME}
              onClick={(e) => getPlaceShop(e, genre.NUM)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

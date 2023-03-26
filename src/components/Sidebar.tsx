import { GENRES } from "@/data/place";
import axios from "axios";
import { useState } from "react";
import GenreButton from "./GenreButton";

type SidebarType = {
  setSearchNum: any;
  setShopData: any;
  area: string | string[] | undefined;
  keyword?: string;
};

export const Sidebar = ({
  setSearchNum,
  setShopData,
  area,
  keyword,
}: SidebarType) => {
  const [inputWord, setInputWord] = useState("");

  const getPlaceShop = async (genre: string) => {
    try {
      const res = await axios.get("/api/getShopLists", {
        params: {
          genre: genre,
          place: area,
          keyword: keyword,
        },
      });
      setSearchNum(res.data.results_available);
      setShopData(res.data.shop);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeText = (e: any) => {
    setInputWord(e.target.value);
  };

  const searchWord = async (e: any, inputWord: string) => {
    e.preventDefault();

    try {
      const res = await axios.get("/api/getShopLists", {
        params: {
          place: area,
          keyword: inputWord,
        },
      });
      console.log("検索APIを叩く");
      setSearchNum(res.data.results_available);
      setShopData(res.data.shop);
      console.log(res.data.results_available);

      setInputWord("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside className="w-[220px] max-w-[25%]">
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
    </aside>
  );
};

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  prefecture?: [];
  genres?: [];
};

export const SearchArea = ({ prefecture = [], genres = [] }: Props) => {
  const router = useRouter();

  //エリアコード
  const [selectedAreaCode, setSelectedAreaCode] = useState(
    router.query.area || "Z011"
  );
  //エリア名(初期値:東京)
  const [selectedAreaName, setSelectedAreaName] = useState("東京");

  //ジャンルコード(初期値:全てのジャンル)
  const [selectedGenreCode, setSelectedGenreCode] = useState(
    router.query.genre || null
  );
  //ジャンル名(初期値:全てのジャンル)
  const [selectedGenreName, setSelectedGenreName] = useState("全てのジャンル");

  //キーワード入力テキスト
  const [searchText, setSearchText] = useState(router.query.keyword || "");

  useEffect(() => {
    firstPrefectureDisplay();
    firstGenreDisplay();
  }, []);

  /**
   * エリアのselectボックスの初期値を指定
   */
  const firstPrefectureDisplay = async () => {
    if (selectedAreaCode) {
      const currentAreaObj: any = prefecture.filter((area: any) => {
        return area.code === selectedAreaCode;
      });
      setSelectedAreaName(currentAreaObj[0].name);
    }
  };

  /**
   * ジャンルのselectボックスの初期値を指定
   */
  const firstGenreDisplay = async () => {
    if (selectedGenreCode) {
      const currentGenreObj: any = genres.filter((genre: any) => {
        return genre.code === selectedGenreCode;
      });
      setSelectedGenreName(currentGenreObj[0].name);
    }
  };

  /**
   * 選択中のエリアのコードを取得
   */
  const handleAreaChange = (e: any) => {
    setSelectedAreaCode(e.target.value);
  };

  /**
   * 選択中のジャンルのコードを取得
   */
  const handleGenreChange = (e: any) => {
    setSelectedGenreCode(e.target.value);
  };

  /**
   * キーワード入力を取得
   */
  const handleSearchInput = (e: any) => {
    setSearchText(e.target.value);
  };

  /**
   * 検索ボタン
   */
  const handleSearch = () => {
    //エリア
    let resultAreaCode = `?area=${selectedAreaCode}`;

    //ジャンル
    let resultGenreCode = "";
    if (selectedGenreCode) {
      resultGenreCode = `&genre=${selectedGenreCode}`;
    }

    //キーワード
    let resultKeyword = "";
    if (searchText !== "") {
      resultKeyword = `&keyword=${searchText}`;
    }

    router.push(`/search${resultAreaCode}${resultGenreCode}${resultKeyword}`);
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between">
      <div className="w-[100%] lg:w-[65%] flex justify-between">
        {/* エリア */}
        <div className="w-[39%] border-[1px] border-[#999s] rounded-md overflow-hidden shadow">
          <select
            name=""
            id=""
            onChange={handleAreaChange}
            className="w-[100%] py-[10px] px-3 text-[14px] outline-none h-[100%] "
          >
            {prefecture.map((area: any) => {
              //selectの初期値を設定
              let isSelect = false;
              if (area.name === selectedAreaName) {
                isSelect = true;
              }
              return (
                <option key={area.name} value={area.code} selected={isSelect}>
                  {area.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* ジャンル */}
        <div className="w-[59%] border-[1px] border-[#999s] rounded-md overflow-hidden shadow">
          <select
            name=""
            id=""
            onChange={handleGenreChange}
            className="w-[100%] py-[10px] px-3 text-[14px] outline-none h-[100%]"
          >
            <option value="">全てのジャンル</option>
            {genres.map((genre: any) => {
              //selectの初期値を設定
              let isSelect = false;
              if (genre.name === selectedGenreName) {
                isSelect = true;
              }
              return (
                <option key={genre.name} value={genre.code} selected={isSelect}>
                  {genre.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* キーワード */}
      <div className="w-[100%] lg:w-[35%] lg:ml-2 mt-2 lg:mt-0">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchInput}
          placeholder="キーワード"
          className="border-[1px] h-[100%] lg:border-t-2 lg:border-l-0 border-[#999s] w-[100%] py-[10px] px-3 text-[14px] outline-none rounded-md shadow"
        />
      </div>

      {/* 検索 */}
      <button
        onClick={handleSearch}
        className="block rounded-md mt-2 lg:mt-0 lg:ml-2 w-[100%] lg:w-[100px] bg-[#017D01] text-white py-[10px] border-0 text-[14px] max-w-[400px] shadow"
      >
        検索する
      </button>
    </div>
  );
};

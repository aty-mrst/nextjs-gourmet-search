import { STATION_AREA } from "@/data/data";
import { query } from "firebase/firestore";
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
  const [selectedAreaName, setSelectedAreaName] = useState<any>("東京");

  //ジャンルコード(初期値:全てのジャンル)
  const [selectedGenreCode, setSelectedGenreCode] = useState(
    router.query.genre || null
  );
  //ジャンル名(初期値:全てのジャンル)
  const [selectedGenreName, setSelectedGenreName] = useState("全てのジャンル");

  //キーワード入力テキスト
  const [searchText, setSearchText] = useState(router.query.keyword || "");

  //県名
  const [prefectureName, setPrefectureName] = useState<any>(
    router.query.pre || "東京"
  );

  //駅名
  const [stationName, setStationName] = useState("");

  useEffect(() => {
    firstPrefectureDisplay();
    firstGenreDisplay();
  }, []);

  /**
   * エリアのselectボックスの初期値を指定
   */
  const firstPrefectureDisplay = async () => {
    if (router.query.area) {
      const currentAreaObj: any = prefecture.filter((area: any) => {
        return area.code === selectedAreaCode;
      });
      setSelectedAreaName(currentAreaObj[0].name);
    } else {
      setSelectedAreaName(router.query.pre);
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

  //駅の配列を取得
  const stationArray = STATION_AREA[prefectureName].map((area: any) => {
    return area.NAME;
  });

  /**
   * 選択中のエリアのコードを取得
   */
  const handleAreaChange = (e: any) => {
    setSelectedAreaCode(e.target.value);

    const selectedPrefecture =
      e.target.options[e.target.selectedIndex].dataset.prefecture;
    setPrefectureName(selectedPrefecture);
    setStationName(""); // 都道府県が変わった時に駅の選択をリセット
  };

  /**
   * 駅のselectボックスの変更時発火
   */
  const handleStationChange = (event: any) => {
    setStationName(event.target.value);
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
    //県
    let resultPrefectureCode = "";

    //駅
    let resultStationName = "";
    let resultPreName = "";
    if (stationName !== "") {
      resultStationName = `&station=${stationName}`;
      resultPreName = `?pre=${prefectureName}`;
    } else {
      resultPrefectureCode = `?area=${selectedAreaCode}`;
    }

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

    router.push(
      `/search${resultPrefectureCode}${resultPreName}${resultStationName}${resultGenreCode}${resultKeyword}`
    );
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between lg:justify-start">
      <div className="w-[100%] lg:w-auto flex justify-between lg:justify-start">
        {/* エリア */}
        <div className="w-[49%] lg:w-[100px] border-[1px] border-[#999s] rounded-md overflow-hidden shadow">
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
                <option
                  key={area.name}
                  value={area.code}
                  selected={isSelect}
                  data-prefecture={area.name}
                >
                  {area.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="w-[49%] lg:w-[100px] border-[1px] border-[#999s] rounded-md overflow-hidden shadow lg:ml-2">
          {/* 駅名 */}
          <select
            onChange={handleStationChange}
            className="w-[100%] py-[10px] px-3 text-[14px] outline-none h-[100%] "
          >
            <option value="">駅を選択</option>
            {prefectureName &&
              stationArray.map((station) => {
                //selectの初期値を設定
                let isSelectStation = false;
                if (station === router.query.station) {
                  isSelectStation = true;
                }
                return (
                  <option
                    key={station}
                    value={station}
                    selected={isSelectStation}
                    className={`${isSelectStation}`}
                  >
                    {station}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      {/* ジャンル */}
      <div className="w-[100%] lg:w-[300px] border-[1px] border-[#999s] rounded-md overflow-hidden shadow mt-1 lg:mt-0 lg:ml-2">
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

      {/* キーワード */}
      <div className="w-[100%] lg:w-[35%] lg:ml-2 mt-1 lg:mt-0">
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
        className="block rounded-md mt-2 lg:mt-0 lg:ml-2 w-[100%] lg:w-[100px] bg-[#017D01] text-white py-[10px] border-0 text-[14px] max-w-[400px] shadow shrink-0"
      >
        検索する
      </button>
    </div>
  );
};

import { useRouter } from "next/router";
import { useSearchSetting } from "./useSearchSetting";
import { SearchAreaProps } from "./index.type";

export const SearchArea = ({ prefecture, genres }: SearchAreaProps) => {
  const router = useRouter();

  const {
    handleAreaChange,
    handleStationChange,
    handleGenreChange,
    handleSearchInput,
    handleSearch,
    selectedAreaName,
    prefectureName,
    selectedGenreName,
    stationArray,
    searchText,
  } = useSearchSetting({ prefecture, genres });

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

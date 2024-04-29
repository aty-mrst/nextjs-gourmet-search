import { STATION_AREA } from "@/data/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SearchAreaProps } from "./index.type";

export const useSearchSetting = ({ prefecture, genres }: SearchAreaProps) => {
  const router = useRouter();

  const [selectedAreaCode, setSelectedAreaCode] = useState(
    router.query.area || "Z011"
  );
  const [selectedAreaName, setSelectedAreaName] = useState<any>("東京");
  const [selectedGenreCode, setSelectedGenreCode] = useState(
    router.query.genre || null
  );
  const [selectedGenreName, setSelectedGenreName] = useState("全てのジャンル");
  const [searchText, setSearchText] = useState(router.query.keyword || "");
  const [prefectureName, setPrefectureName] = useState<any>(
    router.query.pre || "東京"
  );
  const [stationName, setStationName] = useState("");

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

  const firstGenreDisplay = async () => {
    if (selectedGenreCode) {
      const currentGenreObj: any = genres.filter((genre: any) => {
        return genre.code === selectedGenreCode;
      });
      setSelectedGenreName(currentGenreObj[0].name);
    }
  };

  useEffect(() => {
    firstPrefectureDisplay();
    firstGenreDisplay();
  }, []);

  //駅の配列を取得
  const stationArray = STATION_AREA[prefectureName].map((area: any) => {
    return area.NAME;
  });

  const handleAreaChange = (e: any) => {
    setSelectedAreaCode(e.target.value);

    const selectedPrefecture =
      e.target.options[e.target.selectedIndex].dataset.prefecture;
    setPrefectureName(selectedPrefecture);
    setStationName(""); // 都道府県が変わった時に駅の選択をリセット
  };

  const handleStationChange = (event: any) => {
    setStationName(event.target.value);
  };

  const handleGenreChange = (e: any) => {
    setSelectedGenreCode(e.target.value);
  };

  const handleSearchInput = (e: any) => {
    setSearchText(e.target.value);
  };

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

  return {
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
  };
};

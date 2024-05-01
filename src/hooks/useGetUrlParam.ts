import { ParsedUrlQuery } from "querystring";

export const useGetUrlParam = (query: ParsedUrlQuery) => {
  const areaCode = query.area;
  const prefectureName = query.pre;
  const stationName = query.station;
  const genreCode = query.genre;
  const keyword = query.keyword;

  return { areaCode, prefectureName, stationName, genreCode, keyword };
};

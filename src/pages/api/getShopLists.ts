import { PLACE } from "@/data/place";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiUrl = process.env.HOTPEPPER_API;

  //apiキー
  const apiKey = `&key=${process.env.HOTPEPPER_API_KEY}`;

  //表示件数
  const apiCount = `&count=30`;

  //ジャンル
  let apiGenre = "";
  if (req.query.genre) {
    apiGenre = `&genre=${req.query.genre}`;
  }

  //地域
  let apiPlace = req.query.place;
  switch (apiPlace) {
    case "all":
      apiPlace = PLACE.ALL;
      break;
    case "yudaonsen":
      apiPlace = PLACE.YUDA;
      break;
    case "hofu":
      apiPlace = PLACE.HOFU;
      break;
    case "iwakuni":
      apiPlace = PLACE.IWAKUNI;
      break;
    default:
      res.status(500).json("この地域のデータはありません");
  }

  //検索
  let apiKeyword = "";
  if (req.query.keyword) {
    apiKeyword = `&keyword=${req.query.keyword}`;
  }

  try {
    const resData = await axios.get(
      `${apiUrl}${apiKey}${apiPlace}${apiGenre}${apiKeyword}${apiCount}`
    );
    const shopLists = resData.data.results;

    res.status(200).json(shopLists);
  } catch (err) {
    console.log(err);
  }
}

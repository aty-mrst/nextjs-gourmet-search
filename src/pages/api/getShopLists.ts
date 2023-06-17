import { PLACE } from "@/data/data";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

//表示件数
export const SHOW_NUM = 10;

/**
 * 飲食店のリストを取得するAPI
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiUrl = process.env.HOTPEPPER_API;

  //apiキー
  const apiKey = `&key=${process.env.HOTPEPPER_API_KEY}`;

  //表示件数
  let apiCount = `&count=${SHOW_NUM}`;
  if (req.query.count) {
    apiCount = `&count=${req.query.count}`;
  }

  //何件目から取得するか
  let apiNum = "&start=1";
  if (req.query.startNum) {
    const resNum: any = req.query.startNum;
    const num = resNum * 10 - 9;
    apiNum = `&start=${num}`;
  }

  //地域 (初期値:東京)
  let apiPlace = "";
  if (req.query.areaCode) {
    apiPlace = `&large_area=${req.query.areaCode}`;
  } else {
    apiPlace = "&large_area=Z011";
  }

  //ジャンル
  let apiGenre = "";
  if (req.query.genreCode) {
    apiGenre = `&genre=${req.query.genreCode}`;
  }

  //キーワード
  let apiKeyword = "";
  if (req.query.keyword) {
    apiKeyword = `&keyword=${req.query.keyword}`;
  }

  try {
    const resData = await axios.get(
      `${apiUrl}${apiKey}${apiPlace}${apiGenre}${apiKeyword}${apiCount}${apiNum}&range=3`
    );
    const shopLists = resData.data.results;

    res.status(200).json(shopLists);
  } catch (err) {
    console.log(err);
  }
}

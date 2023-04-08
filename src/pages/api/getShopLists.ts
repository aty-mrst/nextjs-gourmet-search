import { PLACE } from "@/data/data";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export const SHOW_NUM = 10;

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

  //何件目から取得するかs
  let apiNum = "&start=1";
  if (req.query.startNum) {
    const resNum: any = req.query.startNum;
    const num = resNum * 10 - 9;
    apiNum = `&start=${num}`;
  }

  //ジャンル
  let apiGenre = "";
  if (req.query.genre) {
    apiGenre = `&genre=${req.query.genre}`;
  }

  //地域
  const placeObj = PLACE.find((elem) => {
    if (req.query.place) {
      return elem.KEY === req.query.place;
    } else {
      return elem.KEY === "all";
    }
  });
  const apiPlace = placeObj && placeObj.POSITION;

  //検索
  let apiKeyword = "";
  if (req.query.keyword) {
    apiKeyword = `&keyword=${req.query.keyword}`;
  }

  try {
    const resData = await axios.get(
      `${apiUrl}${apiKey}${apiPlace}${apiGenre}${apiKeyword}${apiCount}${apiNum}&range=5`
    );
    const shopLists = resData.data.results;

    res.status(200).json(shopLists);
  } catch (err) {
    console.log(err);
  }
}

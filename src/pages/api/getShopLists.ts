import { PLACE } from "@/data/data";
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
  const apiCount = `&count=100`;

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
    console.log(
      `${apiUrl}${apiKey}${apiPlace}${apiGenre}${apiKeyword}${apiCount}&range=5`
    );
    const resData = await axios.get(
      `${apiUrl}${apiKey}${apiPlace}${apiGenre}${apiKeyword}${apiCount}&range=5`
    );
    const shopLists = resData.data.results;

    res.status(200).json(shopLists);
  } catch (err) {
    console.log(err);
  }
}

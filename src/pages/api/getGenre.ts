import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

//表示件数
export const SHOW_NUM = 10;

/**
 * ジャンルを取得
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //apiURL
  const apiUrl = process.env.HOTPEPPER_GENRE_API;

  //apiキー
  const apiKey = `&key=${process.env.HOTPEPPER_API_KEY}`;

  try {
    const resData = await axios.get(`${apiUrl}${apiKey}`);
    const resultGenre = resData.data.results.genre;

    res.status(200).json(resultGenre);
  } catch (err) {
    console.log(err);
  }
}

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

//表示件数
export const SHOW_NUM = 10;

/**
 * 県ごとにエリアを取得
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //apiURL
  const apiUrl = process.env.HOTPEPPER_AREA_API;

  //apiキー
  const apiKey = `&key=${process.env.HOTPEPPER_API_KEY}`;

  try {
    const resData = await axios.get(`${apiUrl}${apiKey}`);
    const largeArea = resData.data.results.large_area;
    // const resultLargeArea = largeArea.map((area: any) => {
    //   return area.service_area;
    // });

    res.status(200).json(largeArea);
  } catch (err) {
    console.log(err);
  }
}

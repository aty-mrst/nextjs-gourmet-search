import { PLACE } from "@/data/place";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiUrl = process.env.HOTPEPPER_API;
  const apiKey = process.env.HOTPEPPER_API_KEY;
  const place = PLACE.YUDA;
  const genre = req.query.genre;

  console.log(`${apiUrl}&key=${apiKey}${place}&genre=${genre}&count=30`);

  try {
    const shopLists = await axios.get(
      `${apiUrl}&key=${apiKey}${place}&genre=${genre}&count=30`
    );
    const shopList = shopLists.data.results;

    console.log(shopList);

    res.status(200).json(shopList);
  } catch (err) {
    console.log(err);
  }
}

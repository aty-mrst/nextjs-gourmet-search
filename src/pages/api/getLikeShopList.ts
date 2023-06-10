import { PLACE } from "@/data/data";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";

//表示件数
export const SHOW_NUM = 10;

/**
 * 飲食店のリストを取得するAPI
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUserId = req.body.currentUserId; //ユーザーID
  const usersCollectionRef = collection(db, "user", currentUserId, "like"); //該当ユーザーのlikeコレクション

  let shopIdArray: string[] = [];
  await getDocs(usersCollectionRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      const existShopId = doc.data().shopId;
      shopIdArray.push(existShopId);
    });
  });

  //保存済みのshopIdがなければここで返す
  if (shopIdArray.length < 1) {
    return res.status(200).json({});
  }

  //店舗ID
  let result = shopIdArray.join(",");
  const apiShopId = `&id=${result}`;

  const apiUrl = process.env.HOTPEPPER_API;

  //apiキー
  const apiKey = `&key=${process.env.HOTPEPPER_API_KEY}`;

  try {
    const resData = await axios.get(`${apiUrl}${apiKey}${apiShopId}&range=3`);
    const shopLists = resData.data.results;

    res.status(200).json(shopLists);
  } catch (err) {
    console.log(err);
  }
}

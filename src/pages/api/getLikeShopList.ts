import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";

/**
 * 飲食店のリストを取得するAPI
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUserId = req.body.currentUserId; //ユーザーID

  //店舗idデータを取得
  const docRef = doc(db, "like", currentUserId);

  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();

  //ドキュメント登録がなければ返す
  if (!docData) {
    return res.status(200).json({});
  }

  const likeShopIdArray = docData && docData.likeShopId;

  //保存済みのshopIdがなければ返す
  if (likeShopIdArray.length < 1) {
    return res.status(200).json({});
  }

  //店舗ID
  let result = likeShopIdArray.join(",");
  const apiShopId = `&id=${result}`;

  //api url
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

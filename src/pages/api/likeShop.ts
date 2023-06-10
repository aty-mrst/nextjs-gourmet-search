import { PLACE } from "@/data/data";
import axios from "axios";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
  const shopId = req.body.shopId; //ショップID
  const usersCollectionRef = collection(db, "user", currentUserId, "like"); //該当ユーザーのlikeコレクション

  /**
   * likeコレクションにいいねしたshopIdを保存する
   */

  //既にいいね済みのshopIDがあるか判定
  let isExistShop = false;
  await getDocs(usersCollectionRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      const existShopId = doc.data().shopId;
      console.log(existShopId);
      if (existShopId === shopId) {
        isExistShop = true;
      }
    });
  });

  if (isExistShop)
    return res.status(200).json({
      message: {
        popup: "このお店はすでにいいねされています！",
      },
    });

  //登録済みのshopIdがなければ登録
  await setDoc(doc(db, "user", currentUserId), {});
  await setDoc(doc(usersCollectionRef), {
    shopId: shopId,
  });

  res.status(200).json({
    message: {
      popup: "いいねしました！マイページからご確認ください。",
    },
  });
}

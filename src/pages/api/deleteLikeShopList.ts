import { PLACE } from "@/data/data";
import axios from "axios";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
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
   * likeコレクションから選択した店舗を削除する
   */
  await getDocs(query(usersCollectionRef, where("shopId", "==", shopId))).then(
    (snapshot) => {
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }
  );

  res.status(200).json({
    message: {
      popup: "お気に入りから削除しました。",
    },
  });
}

import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUserId = req.body.currentUserId;
  const shopId = req.body.shopId;

  const docRef = doc(db, "like", currentUserId);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();

  //ドキュメントにユーザーIDがなければ登録する
  if (!docData) {
    await setDoc(doc(db, "like", currentUserId), {
      likeShopId: [],
    });
  }

  //取得した店舗ID配列から新たな配列を作成
  let likeShopIdArray = [];
  if (docData) {
    likeShopIdArray = docData.likeShopId;
  }

  //すでに存在するか判定用
  let isExistShop = false;
  likeShopIdArray.map((id: string) => {
    if (id === shopId) {
      isExistShop = true;
    }
  });

  //すでに存在したら返す
  if (isExistShop) {
    return res.status(200).json({
      message: {
        popup: "このお店はすでにいいねされています！",
      },
    });
  }

  //存在してなければ新しく追加する
  const docRefResult = doc(db, "like", currentUserId);
  await updateDoc(docRefResult, {
    likeShopId: arrayUnion(shopId),
  });

  res.status(200).json({
    message: {
      popup: "いいねしました！マイページからご確認ください。",
    },
  });
}

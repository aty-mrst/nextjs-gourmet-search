import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";

export const useLikeShop = () => {
  const { currentUser } = useAuthContext();
  const [isLoad, setIsLoad] = useState(false);
  const [shopData, setShopData] = useState([]);
  const [isLikePopUp, setIsLikePopUp] = useState(false);
  const [popUpText, setPopUpText] = useState("");

  const getLikeShop = async () => {
    try {
      setIsLoad(true);
      const resData = await axios.post("/api/getLikeShopList", {
        currentUserId: currentUser?.uid,
      });
      setShopData(resData.data.shop);
      setIsLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLikeShop = async (shopId: string) => {
    const isConfirm = confirm("お気に入りから削除してもよろしいですか？");
    if (!isConfirm) return;

    const res = await axios.post("/api/deleteLikeShopList", {
      currentUserId: currentUser?.uid,
      shopId: shopId,
    });
    setPopUpText(res.data.message.popup);
    setIsLikePopUp(true);
    setTimeout(() => {
      setIsLikePopUp(false);
    }, 3000);
    getLikeShop();
  };

  return {
    isLoad,
    shopData,
    getLikeShop,
    deleteLikeShop,
    isLikePopUp,
    popUpText,
  };
};

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useShopLikeProps } from "./index.type";

export const useShopLike = ({
  currentUser,
  setIsLikePopUp,
  setPopUpText,
}: useShopLikeProps) => {
  const router = useRouter();

  const [isLikeHover, setIsLikeHover] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const onHover = () => {
    setIsLikeHover(true);
  };

  const onHoverLeave = () => {
    setIsLikeHover(false);
  };

  const onLike = async (shopId: string) => {
    if (currentUser) {
      //ログイン中
      setIsClick(true);
      const res = await axios.post("/api/addLikeShop", {
        currentUserId: currentUser?.uid,
        shopId: shopId,
      });
      setPopUpText(res.data.message.popup);
      setIsLikePopUp(true);
      setTimeout(() => {
        setIsLikePopUp(false);
      }, 3000);
    } else {
      //未ログイン状態
      console.log("未ログインです！", shopId);
      router.push("/login");
    }
  };

  return {
    isLikeHover,
    isClick,
    onHover,
    onHoverLeave,
    onLike,
  };
};

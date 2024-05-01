import { AuthContextProps } from "@/context/AuthContext";

export type ShopItemProps = {
  shop: any;
  setIsLikePopUp: any;
  setPopUpText: any;
  isLiked: boolean;
};

export type useShopLikeProps = {
  currentUser: AuthContextProps["currentUser"];
  setIsLikePopUp: ShopItemProps["setIsLikePopUp"];
  setPopUpText: ShopItemProps["setPopUpText"];
};

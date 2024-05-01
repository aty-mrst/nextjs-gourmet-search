import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ShopItemProps } from "./index.type";
import { useShopLike } from "./useShopLike";

export const ShopItem = ({
  shop,
  setIsLikePopUp,
  setPopUpText,
  isLiked,
}: ShopItemProps) => {
  const { currentUser } = useAuthContext();

  const { isLikeHover, isClick, onHover, onHoverLeave, onLike } = useShopLike({
    currentUser,
    setIsLikePopUp,
    setPopUpText,
  });

  return (
    <>
      <li key={shop.id} className="my-5 relative" id={shop.id}>
        <div className="block px-5 py-8 bg-[#FEF6E8] border lg:flex justify-between ease-in duration-150 border-[#017D01] rounded-md">
          <button
            className="cursor-point absolute top-4 md:top-6 right-4 md-right-6 text-2xl bg-white rounded-[50%] w-[40px] h-[40px] outline-none"
            onClick={() => onLike(shop.id)}
            onMouseEnter={onHover}
            onMouseLeave={onHoverLeave}
          >
            {isLikeHover || isLiked || isClick ? (
              <FavoriteOutlinedIcon
                sx={{ color: "#FF555A" }}
                className="favo-color"
              />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
          <figure className="w-[200px] h-[200px] relative m-auto overflow-hidden">
            <Link href={shop.urls.pc} target="_blank" className="">
              <Image
                fill
                src={shop.photo.pc.l}
                alt={shop.name}
                className="object-cover hover:scale-[1.1] transition"
              />
            </Link>
          </figure>

          <div className="lg:w-[calc(100%-220px)] mt-4 lg:mt-0">
            <small className="text-xs block text-[#017D01]">
              {shop.genre.catch}
            </small>
            <Link
              href={shop.urls.pc}
              target="_blank"
              className="text-xl inline-block font-bold mt-1 mb-2 hover:underline"
            >
              {shop.name}
            </Link>
            <p className="block text-sm my-1">[予算] {shop.budget.average}</p>
            {shop.course === "あり" && <p className="text-sm">[コース]あり</p>}
            <p className="text-sm my-1">
              <span className="">[アクセス]</span> {shop.mobile_access}
            </p>
            <p className="text-sm my-1">
              <span className="">[駐車場]</span> {shop.parking}
            </p>
            <p className="text-sm my-1">
              <span className="">[営業日時]</span> {shop.open}
            </p>
            {shop.card === "利用可" ? (
              <p className="text-sm my-1">[カード] 利用可能</p>
            ) : (
              <p className="text-sm my-1">[カード] 不可</p>
            )}
            <p className="text-sm my-1">
              <span className="">[wifi]</span> {shop.wifi}
            </p>

            <p className="text-sm">{shop.catch}</p>
          </div>
        </div>
      </li>
    </>
  );
};

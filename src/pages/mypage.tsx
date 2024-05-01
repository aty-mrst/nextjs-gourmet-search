import { Header } from "@/components/Header";
import { useAuthContext } from "@/context/AuthContext";
import { signOut } from "@firebase/auth";
import { auth } from "../../lib/firebase";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Alert, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Meta } from "@/components/Meta";
import { useLikeShop } from "@/hooks/useLikeShop";

export default function Mypage() {
  const router = useRouter();
  const { currentUser } = useAuthContext();

  const {
    isLoad,
    shopData,
    getLikeShop,
    deleteLikeShop,
    isLikePopUp,
    popUpText,
  } = useLikeShop();

  useEffect(() => {
    if (!currentUser) router.push("/");
    getLikeShop();
  }, []);

  return (
    <>
      <Meta title="マイページ" />

      <Header />

      <div className="mt-[100px] lg:mt-[120px] mb-20 max-w-[800px] mx-auto px-[15px]">
        <h1 className="text-center font-bold text-lg">お気に入り済みの店舗</h1>
        {isLoad ? (
          <CircularProgress color="success" />
        ) : (
          <ul className="grid gap-2 mt-3 max-w-[600px] mx-auto">
            {shopData ? (
              shopData.map((shop: any) => (
                <li
                  key={shop.id}
                  id={shop.id}
                  className="bg-[#FEF6E8] border border-[#017D01] p-3"
                >
                  <div className="flex items-center">
                    <Link
                      href={shop.urls.pc}
                      target="_blank"
                      className="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] shrink-0 mr-[10px] overflow-hidden"
                    >
                      <Image
                        fill
                        src={shop.photo.pc.l}
                        alt={shop.name}
                        className="object-cover hover:scale-[1.1] transition"
                      />
                    </Link>
                    <div className="w-[calc(100%-90px)]">
                      <small className="block text-[#017D01] text-[10px] lg:text-[14px]">
                        {shop.genre.catch}
                      </small>
                      <Link
                        href={shop.urls.pc}
                        target="_blank"
                        className="inline hover:underline font-bold text-[14px] lg:text-[16px]"
                      >
                        {shop.name}
                      </Link>
                      <div className="text-right mt-4">
                        <button
                          onClick={() => deleteLikeShop(shop.id)}
                          className="text-sm"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>現在お気に入りの店舗はありません。</p>
            )}
          </ul>
        )}
      </div>

      {/* いいねのポップアップ */}
      <div
        className={`fixed w-[95%] left-[50%] translate-x-[-50%] bottom-3 z-30 ease-in-out duration-200 ${
          isLikePopUp ? "translate-y-[0]" : "translate-y-[150%]"
        } `}
      >
        <Alert variant="filled" severity="success">
          {popUpText}
        </Alert>
      </div>
    </>
  );
}

import { Header } from "@/components/Header";
import { useAuthContext } from "@/context/AuthContext";
import { signOut } from "@firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../../lib/firebase";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Mypage() {
  const { currentUser } = useAuthContext(); //ログイン状態
  const [shopData, setShopData] = useState([]); //ショップリスト

  const router = useRouter();
  /**
   * ログアウト
   */
  const onLogout = async () => {
    const isConfirm = confirm("ログアウトしますか？");
    if (!isConfirm) return;
    await signOut(auth);
    router.push("/login");
  };

  useEffect(() => {
    getLikeShop();
  }, []);

  /**
   * いいね済み店舗を取得
   */
  const getLikeShop = async () => {
    try {
      const resData = await axios.post("/api/getLikeShopList", {
        currentUserId: currentUser?.uid,
      });
      setShopData(resData.data.shop);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header isNotSearch currentUser={currentUser} />
      <div className="mt-40">
        <button onClick={onLogout}>ログアウトをする</button>
        <h2>お気に入りの店舗</h2>
        <ul>
          {shopData &&
            shopData.map((shop: any) => (
              <li key={shop.id}>
                <div className="flex">
                  <a href={shop.urls.pc} target="_blank" className="">
                    <figure className="relative w-[150px] h-[150px]">
                      <Image
                        fill
                        src={shop.photo.pc.l}
                        alt={shop.name}
                        className="object-cover"
                      />
                    </figure>
                  </a>
                  <div>
                    <small>{shop.genre.catch}</small>
                    <h3>{shop.name}</h3>
                    <p>{shop.budget.average}</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

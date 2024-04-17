import { signOut } from "@firebase/auth";
import Link from "next/link";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";

export const Header = () => {
  const router = useRouter();

  const { currentUser } = useAuthContext(); //ログイン状態

  /**
   * ログアウト
   */
  const onLogout = async () => {
    const isConfirm = confirm("ログアウトしますか？");
    if (!isConfirm) return;
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header className="text-center border-b  fixed w-[100%] top-0 bg-white z-20">
      <div className="flex justify-between items-center px-4 lg:px-6">
        <h1 className="inline-block py-3">
          <Link href={"/"} className="text-md font-bold">
            <span className="text-[#017D01] text-xl">グルメ検索</span>アプリ
          </Link>
        </h1>
        <div className="flex gap-4">
          {currentUser ? (
            <>
              <button onClick={onLogout} className="text-sm">
                ログアウト
              </button>
              <Link href={"/mypage"} className="text-sm">
                マイページ
              </Link>
            </>
          ) : (
            <>
              <Link href={"/login"} className="text-sm">
                ログイン
              </Link>
              <Link href={"/signup"} className="text-sm">
                新規登録
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

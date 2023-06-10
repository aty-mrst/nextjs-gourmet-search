import { PLACE } from "@/data/data";
import { signOut } from "@firebase/auth";
import Link from "next/link";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";

type HeaderType = {
  onClick?: () => void;
  isNotSearch?: boolean;
  currentUser?: any;
};

export const Header = ({ onClick, isNotSearch, currentUser }: HeaderType) => {
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

  return (
    <header className="text-center border-b border-[#F8E6CC] fixed w-[100%] top-0 bg-white z-20">
      <div className="flex justify-between items-center px-4 lg:px-6">
        <h1 className="inline-block py-3">
          <Link href={"/"} className="text-md font-bold" onClick={onClick}>
            <span className="text-[#017D01] text-xl">東京駅チカ</span>グルメ
          </Link>
        </h1>
        <div className="flex gap-4">
          {currentUser ? (
            <>
              <button onClick={onLogout} className="text-sm">
                ログアウト
              </button>
              <Link href={"mypage"} className="text-sm">
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

      {isNotSearch || (
        <div className="whitespace-nowrap overflow-x-scroll bg-[#FEF6E8] py-3">
          {PLACE.map((place) => (
            <Link
              key={place.NAME}
              href={place.URL}
              className="px-5 border-r-2 border-[#017D01] ease-in duration-150 hover:text-[#017D01]"
              onClick={onClick}
            >
              {place.NAME}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

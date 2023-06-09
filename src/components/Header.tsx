import { PLACE } from "@/data/data";
import Link from "next/link";

type HeaderType = {
  onClick?: () => void;
  isNotSearch?: boolean;
  currentUser?: any;
};

export const Header = ({ onClick, isNotSearch, currentUser }: HeaderType) => {
  return (
    <header className="text-center border-b border-[#F8E6CC] fixed w-[100%] top-0 bg-white z-20">
      <div className="flex justify-between items-center px-10">
        <h1 className="inline-block py-3">
          <Link href={"/"} className="text-xl font-bold" onClick={onClick}>
            <span className="text-[#017D01] text-2xl">東京駅チカ</span>グルメ
          </Link>
        </h1>
        <div className="flex gap-6">
          {currentUser ? (
            <Link href={"mypage"}>マイページ</Link>
          ) : (
            <>
              <Link href={"/login"}>ログイン</Link>
              <Link href={"/signup"}>新規会員登録</Link>
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

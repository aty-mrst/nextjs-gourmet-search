import { SearchArea } from "./SearchArea";

type TopMvType = {
  prefecture: [];
  genres: [];
};

export const TopMv = ({ prefecture, genres }: TopMvType) => {
  return (
    <div className="bg-[url('/image/mv_top_pc.jpg')] bg-cover h-[100vh] flex items-center justify-center px-3">
      <div className="bg-white/[.9] rounded-lg px-5 lg:px-10 py-10">
        <h2 className="text-[26px] lg:text-[36px] font-bold text-center">
          お気に入りのお店を
          <br />
          簡単便利に探せます
        </h2>
        <p className="text-[14px] lg:text-[24px] text-center mt-2">
          全国のお店から、
          <br />
          あなた合ったお店が見つかる
        </p>
        <div className="max-w-[350px] lg:max-w-[700px] lg:w-[700px] mx-auto mt-4">
          <SearchArea prefecture={prefecture} genres={genres} />
        </div>
      </div>
    </div>
  );
};

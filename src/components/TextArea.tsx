import { PLACE } from "@/data/data";
import { CircularProgress } from "@mui/material";

type TextAreaType = {
  searchNum: number | null;
  genreName: string;
  area: string | string[] | undefined;
  isLoad?: boolean;
};

export const TextArea = ({
  searchNum,
  genreName,
  area,
  isLoad,
}: TextAreaType) => {
  //エリア名を取得
  const areaData = PLACE.find((data) => {
    return data.KEY === area;
  });
  const areaName = areaData?.NAME;

  return (
    <>
      <p className="border-l-4 border-[#017D01] pl-2 mb-1">現在の選択条件</p>
      <p className="text-sm">
        エリア <span className="font-bold text-lg ml-1">{areaName}</span>
      </p>
      <p className="text-sm">
        ジャンル <span className="font-bold text-lg ml-1">{genreName}</span>
      </p>

      {isLoad ? (
        <CircularProgress color="success" />
      ) : searchNum ? (
        <p className="mt-3 text-sm">
          <span className="inline-block font-bold text-xl mr-1">
            {searchNum}
          </span>
          件のお店が見つかりました！
        </p>
      ) : (
        <p className="mt-3 text-sm">
          条件に一致するお店が見つかりませんでした。
        </p>
      )}
    </>
  );
};

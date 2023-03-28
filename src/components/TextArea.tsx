import { PLACE } from "@/data/data";

type TextAreaType = {
  searchNum: number | null;
  genreName: string;
  area: string | string[] | undefined;
};

export const TextArea = ({ searchNum, genreName, area }: TextAreaType) => {
  //エリア名を取得
  const areaData = PLACE.find((data) => {
    return data.KEY === area;
  });
  const areaName = areaData?.NAME;

  return (
    <>
      <p>エリア名: {areaName}</p>
      <p>ジャンル: {genreName}</p>
      {searchNum ? (
        <p>
          <span>{searchNum}</span>件のお店が見つかりました！
        </p>
      ) : (
        <p>ジャンルを選択してください</p>
      )}
    </>
  );
};

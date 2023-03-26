type TextAreaType = {
  searchNum: number | null;
};

export const TextArea = ({ searchNum }: TextAreaType) => {
  return (
    <>
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

import { CircularProgress } from "@mui/material";

type TextAreaType = {
  isLoad?: boolean;
  searchNum: number | null;
  totalPages: number;
  currentPage: any;
};

export const TextArea = ({
  isLoad,
  searchNum,
  totalPages,
  currentPage,
}: TextAreaType) => {
  return (
    <div className="px-5 max-w-[768px] mx-auto">
      {isLoad ? (
        <CircularProgress color="success" />
      ) : searchNum ? (
        <p>{`${searchNum}件 (${currentPage} / ${totalPages}ページ)`}</p>
      ) : (
        <p className="mt-3 text-sm">
          条件に一致するお店が見つかりませんでした。
        </p>
      )}
    </div>
  );
};

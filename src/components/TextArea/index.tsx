import { CircularProgress } from "@mui/material";
import { TextAreaProps } from "./index.type";

export const TextArea = ({
  isLoad,
  searchNum,
  totalPages,
  currentPage,
}: TextAreaProps) => {
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

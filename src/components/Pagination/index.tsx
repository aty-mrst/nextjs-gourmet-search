import Link from "next/link";
import { usePagination } from "./usePagination";
import { useUrlSetting } from "./useUrlSetting";
import { PaginationProps } from "./index.type";

export const Pagination = ({
  currentPage,
  path,
  totalPages,
}: PaginationProps) => {
  const { resultPath, pageParam, prevPage, nextPage, resultTotalPage } =
    useUrlSetting({ currentPage, path, totalPages });

  const { pageNumbers } = usePagination({
    currentPage,
    totalPages: resultTotalPage,
  });

  const liStyle =
    "flex justify-center items-center w-[40px] h-[40px] border text-center text-[14px] border-[#F8E6CC]";
  const currentStyle = "bg-[#017D01] text-white pointer-events-none";

  return (
    <section>
      <ul className="flex justify-center">
        {/* 前へ */}
        <li>
          {prevPage > 0 && (
            <Link
              href={`${resultPath}${pageParam}${prevPage}`}
              className={`${liStyle} rounded`}
            >
              ＜
            </Link>
          )}
        </li>

        {/* 先頭 */}
        {currentPage > 2 && (
          <>
            <li className="">
              <Link
                href={`${resultPath}${pageParam}${1}`}
                className={`${liStyle} rounded`}
              >
                1
              </Link>
            </li>
            <li>
              <span className={`${liStyle} rounded`}>...</span>
            </li>
          </>
        )}

        {/* 動的な数字部分 */}
        {pageNumbers.map((page) => (
          <li key={page.key}>
            <Link
              href={`${resultPath}${pageParam}${page.key}`}
              className={`dynamicPage rounded ${liStyle} ${
                page.key === Number(currentPage) ? currentStyle : ""
              }`}
            >
              {page.key}
            </Link>
          </li>
        ))}

        {/* 最後 */}
        {nextPage <= resultTotalPage - 1 && (
          <>
            <li>
              <span className={`${liStyle} rounded`}>...</span>
            </li>
            <li>
              <Link
                href={`${resultPath}${pageParam}${resultTotalPage}`}
                className={`${liStyle} rounded`}
              >
                {resultTotalPage}
              </Link>
            </li>
          </>
        )}

        {/* 次へ */}
        <li>
          {nextPage <= resultTotalPage && (
            <Link
              href={`${resultPath}${pageParam}${nextPage}`}
              className={`${liStyle} rounded`}
            >
              ＞
            </Link>
          )}
        </li>
      </ul>
    </section>
  );
};

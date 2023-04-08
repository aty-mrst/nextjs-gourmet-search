import Link from "next/link";

type PaginationType = {
  currentPage: number | any;
  totalPages?: number;
  path: string;
};

export const Pagination = ({
  currentPage,
  path,
  totalPages,
}: PaginationType) => {
  if (!totalPages) totalPages = 1;

  const prevPage = Number(currentPage) - 1;
  const nextPage = Number(currentPage) + 1;

  const liStyle =
    "flex justify-center items-center w-[40px] h-[40px] border text-center text-[14px] border-[#F8E6CC]";
  const currentStyle = "bg-[#017D01] text-white pointer-events-none";

  /**
   * 動的な数字部分
   */
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages!, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      console.log("currentPage", currentPage);
      console.log("i", i);
      pageNumbers.push(
        <li key={i}>
          <Link
            href={`${path}?page=${i}`}
            className={`dynamicPage ${liStyle} ${
              i === Number(currentPage) ? currentStyle : ""
            }`}
          >
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <section>
      <ul className="flex justify-center">
        {/* 前へ */}
        <li>
          {prevPage > 0 && (
            <Link href={`${path}?page=${prevPage}`} className={liStyle}>
              ＜
            </Link>
          )}
        </li>

        {/* 先頭 */}
        {currentPage > 2 && (
          <>
            <li>
              <Link href={`${path}?page=${1}`} className={liStyle}>
                1
              </Link>
            </li>
            <li>
              <span className={liStyle}>...</span>
            </li>
          </>
        )}

        {/* 動的な数字部分 */}
        {renderPageNumbers()}

        {/* 最後 */}
        {nextPage <= totalPages - 1 && (
          <>
            <li>
              <span className={liStyle}>...</span>
            </li>
            <li>
              <Link href={`${path}?page=${totalPages}`} className={liStyle}>
                {totalPages}
              </Link>
            </li>
          </>
        )}

        {/* 次へ */}
        <li>
          {nextPage <= totalPages && (
            <Link href={`${path}?page=${nextPage}`} className={liStyle}>
              ＞
            </Link>
          )}
        </li>
      </ul>
    </section>
  );
};

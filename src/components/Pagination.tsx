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
  let rootUrl;
  if (process.env.NODE_ENV === "production") {
    //本番
    rootUrl = process.env.NEXT_PUBLIC_SITE_URL;
  } else if (process.env.NODE_ENV === "development") {
    //ローカル
    rootUrl = "http://localhost:3000";
  }

  //pageパラメータを除く
  let url = new URL(path, rootUrl);
  url.searchParams.delete("page");
  const resultPath = url.href;

  //pageパラメータの書き方
  let pageParam = "&page=";
  if (path === "/") {
    //トップページの場合
    pageParam = "?page=";
  }

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
      pageNumbers.push(
        <li key={i}>
          <Link
            href={`${resultPath}${pageParam}${i}`}
            className={`dynamicPage rounded ${liStyle} ${
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
        {renderPageNumbers()}

        {/* 最後 */}
        {nextPage <= totalPages - 1 && (
          <>
            <li>
              <span className={`${liStyle} rounded`}>...</span>
            </li>
            <li>
              <Link
                href={`${resultPath}${pageParam}${totalPages}`}
                className={`${liStyle} rounded`}
              >
                {totalPages}
              </Link>
            </li>
          </>
        )}

        {/* 次へ */}
        <li>
          {nextPage <= totalPages && (
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

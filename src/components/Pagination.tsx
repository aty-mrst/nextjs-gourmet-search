// type PaginationType = {
//   currentNum: number;
// };

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

type PaginationType = {
  // setSearchNum: any;
  // setShopData: any;
  currentPage: number;
};

export const Pagination = ({
  // setSearchNum,
  // setShopData,
  currentPage,
}: PaginationType) => {
  const router = useRouter();
  const { page } = router.query;

  //urlを取得
  let pathname = router.asPath;
  if (pathname.indexOf("?") !== -1) {
    pathname = pathname.substring(0, pathname.indexOf("?"));
  }

  //currentNum
  // let currentNum = Number(page);
  // if (!page) {
  //   currentNum = 1;
  // }

  //prevNum
  // const prevNum = currentNum - 1;
  // const nextNum = currentNum + 1;

  const handlePrev = async () => {
    // router.push(`${pathname}?page=${prevNum}`);
    // const res = await axios.get("/api/getShopLists", {
    //   params: {
    //     startNum: pageNum,
    //   },
    // });
    // setSearchNum(res.data.results_available);
    // setShopData(res.data.shop);
  };

  const handleNext = async () => {
    // router.push(`${pathname}?page=${nextNum}`);
    // const res = await axios.get("/api/getShopLists", {
    //   params: {
    //     startNum: pageNum,
    //   },
    // });
    // setSearchNum(res.data.results_available);
    // setShopData(res.data.shop);
  };

  return (
    <section>
      【現在ページネーションの実装中・・・・】
      <ul>
        {/* {prevNum > 0 && (
          <li>
            <button onClick={handlePrev}>前へ</button>
          </li>
        )} */}

        <li>
          <span>{currentPage}</span>
        </li>

        {/* <li>
          <button onClick={handleNext}>次へ</button>
        </li> */}
      </ul>
    </section>
  );
};

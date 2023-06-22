import { ReactNode, useEffect, useState } from "react";

type SearchAreaWrapType = {
  children: ReactNode;
};

export const SearchAreaWrap = ({ children }: SearchAreaWrapType) => {
  const [isStickyShow, setIsStickyShow] = useState(true);

  /**
   * 検索エリアのスクロールに応じた位置調整
   */
  let set_position = 0;
  const handleSticky = () => {
    if (set_position < document.documentElement.scrollTop) {
      window.scrollY > 200 ? setIsStickyShow(false) : setIsStickyShow(true);
      console.log(`down`);
    } else {
      setIsStickyShow(true);
      console.log(`up`);
    }
    set_position = document.documentElement.scrollTop;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
    return () => {
      window.removeEventListener("scroll", handleSticky);
    };
  }, []);

  return (
    <div
      className={`py-3 lg:py-5 px-5 lg:flex sticky top-[52px] z-10 bg-white shadow ease-in-out duration-500 ${
        isStickyShow ? "translate-y-[0]" : "translate-y-[-160px]"
      }`}
    >
      <div className="max-w-[400px] lg:max-w-[700px]">{children}</div>
    </div>
  );
};

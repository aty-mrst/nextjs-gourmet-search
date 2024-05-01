import { useState } from "react";

export const useSearchPositionSet = () => {
  const [isStickyShow, setIsStickyShow] = useState(true);

  /**
   * 検索エリアのスクロールに応じた位置調整
   */
  let set_position = 0;
  const handleSticky = () => {
    if (set_position < document.documentElement.scrollTop) {
      window.scrollY > 200 ? setIsStickyShow(false) : setIsStickyShow(true);
    } else {
      setIsStickyShow(true);
    }
    set_position = document.documentElement.scrollTop;
  };

  return {
    isStickyShow,
    handleSticky,
  };
};

import { useEffect } from "react";
import { SearchAreaWrapProps } from "./index.type";
import { useSearchPositionSet } from "./useSearchPositionSet";

export const SearchAreaWrap = ({ children }: SearchAreaWrapProps) => {
  const { isStickyShow, handleSticky } = useSearchPositionSet();

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
    return () => {
      window.removeEventListener("scroll", handleSticky);
    };
  }, [handleSticky]);

  return (
    <div
      className={`py-3 lg:py-5 px-5 lg:flex sticky top-[52px] z-10 bg-white shadow ease-in-out duration-500 ${
        isStickyShow ? "translate-y-[0]" : "translate-y-[-200px]"
      }`}
    >
      <div className="max-w-[400px] lg:max-w-[700px]">{children}</div>
    </div>
  );
};

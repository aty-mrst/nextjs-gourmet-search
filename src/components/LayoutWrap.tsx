import { ReactNode } from "react";

type LayoutWrapType = {
  children: ReactNode;
};

export const LayoutWrap = ({ children }: LayoutWrapType) => {
  return (
    <div className="flex justify-between max-w-[1200px] mx-auto mt-[140px]">
      {children}
    </div>
  );
};

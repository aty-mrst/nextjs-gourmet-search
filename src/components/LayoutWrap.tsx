import { ReactNode } from "react";

type LayoutWrapType = {
  children: ReactNode;
};

export const LayoutWrap = ({ children }: LayoutWrapType) => {
  return (
    <div className="flex justify-center max-w-[1200px] mx-auto mt-[120px]">
      {children}
    </div>
  );
};

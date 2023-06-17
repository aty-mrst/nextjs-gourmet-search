import { ReactNode } from "react";

type LayoutWrapType = {
  children: ReactNode;
};

export const LayoutWrap = ({ children }: LayoutWrapType) => {
  return <div className="max-w-[1000px] mx-auto mt-[100px]">{children}</div>;
};

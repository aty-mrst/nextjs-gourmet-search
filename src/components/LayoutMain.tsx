import { ReactNode } from "react";

type LayoutMainType = {
  children: ReactNode;
};

export const LayoutMain = ({ children }: LayoutMainType) => {
  return <main className="px-5 lg:w-[calc(100%-220px)]">{children}</main>;
};

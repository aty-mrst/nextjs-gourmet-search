import { ReactNode } from "react";

type LayoutMainType = {
  children: ReactNode;
};

export const LayoutMain = ({ children }: LayoutMainType) => {
  return (
    <main className="max-w-[1000px] mx-auto mt-[80px]  mb-[100px]">
      {children}
    </main>
  );
};

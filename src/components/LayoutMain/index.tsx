import { LayoutMainProps } from "./index.type";

export const LayoutMain = ({ children }: LayoutMainProps) => {
  return (
    <main className="max-w-[1000px] mx-auto mt-[80px]  mb-[100px]">
      {children}
    </main>
  );
};

import Link from "next/link";

export const Header = () => {
  return (
    <header className="h-[60px] leading-[60px] text-center">
      <h1 className="inline-block">
        <Link href={"/"}>山口県 グルメガイド</Link>
      </h1>
    </header>
  );
};

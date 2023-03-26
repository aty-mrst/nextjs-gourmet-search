import Link from "next/link";

const AreaSelect = () => {
  return (
    <div>
      <Link href={"/"}>山口県全て</Link>
      <Link href={"/area/yudaonsen"}>湯田温泉</Link>
      <Link href={"/area/hofu"}>防府市</Link>
      <Link href={"/area/iwakuni"}>岩国市</Link>
    </div>
  );
};

export default AreaSelect;

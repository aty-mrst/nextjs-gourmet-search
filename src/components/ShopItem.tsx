import Image from "next/image";

type ShopItemType = {
  shop: any;
};

export const ShopItem = ({ shop }: ShopItemType) => {
  console.log(shop);

  return (
    <li key={shop.id} className="my-5 relative">
      <a
        href={shop.urls.pc}
        target="_blank"
        className="block px-5 py-8 bg-[#FEF6E8] border border-[#F8E6CC] hover:border lg:flex justify-between ease-in duration-150 hover:border-[#017D01]"
      >
        <div className="w-[200px] h-[200px] relative m-auto">
          <Image
            fill
            src={shop.photo.pc.l}
            alt={shop.name}
            className="object-cover"
          />
        </div>

        <div className="lg:w-[calc(100%-220px)]">
          <small className="text-xs block text-[#017D01]">
            {shop.genre.catch}
          </small>
          <h2 className="text-xl inline-block font-bold">{shop.name}</h2>
          <p className="block text-sm">[予算] {shop.budget.average}</p>
          {shop.course === "あり" && <p className="text-sm">[コース]あり</p>}
          <p className="text-sm">
            <span className="">[アクセス]</span> {shop.mobile_access}
          </p>
          <p className="text-sm">
            <span className="">[駐車場]</span> {shop.parking}
          </p>
          <p className="text-sm">
            <span className="">[営業日時]</span> {shop.open}
          </p>
          {shop.card === "利用可" ? (
            <p className="text-sm">[カード] 利用可能</p>
          ) : (
            <p className="text-sm">[カード] 不可</p>
          )}
          <p className="text-sm">
            <span className="">[wifi]</span> {shop.wifi}
          </p>

          <p className="text-sm">{shop.catch}</p>
        </div>
      </a>
    </li>
  );
};

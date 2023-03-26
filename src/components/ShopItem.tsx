import Image from "next/image";

type ShopItemType = {
  shop: any;
};

export const ShopItem = ({ shop }: ShopItemType) => {
  return (
    <li key={shop.id} className="my-5">
      <a
        href={shop.urls.pc}
        target="_blank"
        className="flex justify-between px-5 py-8 bg-[#f7f3e1] border hover:border"
      >
        <div className="w-[200px] h-[200px] relative">
          <Image
            fill
            src={shop.photo.pc.l}
            alt={shop.name}
            className="object-cover"
          />
        </div>

        <div className="w-[calc(100%-220px)]">
          <span className="text-xs block">{shop.genre.catch}</span>
          <h2 className="text-xl border-b inline-block">{shop.name}</h2>
          <span className="block text-sm">{shop.budget.average}</span>
          {shop.card === "利用可" ? (
            <p className="text-sm">カード利用可能</p>
          ) : (
            <p className="text-sm">カードは利用できません</p>
          )}
          {shop.course === "あり" && <p className="text-sm">コースあり</p>}
          <p className="text-sm">アクセス: {shop.mobile_access}</p>
          <p className="text-sm">駐車場: {shop.parking}</p>
          <p className="text-sm">営業日時: {shop.open}</p>
          <p className="text-sm">{shop.catch}</p>
        </div>
      </a>
    </li>
  );
};

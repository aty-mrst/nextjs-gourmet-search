export const REVALIDATE_TIME = 3600 * 3; //3時間

export const PLACE = [
  {
    KEY: "all",
    URL: "/",
    NAME: "東京",
    POSITION: "&lat=35.68146275605016&lng=139.76710333847444",
  },
  {
    KEY: "shibuya",
    URL: "/area/shibuya",
    NAME: "渋谷",
    POSITION: "&lat=35.658182066464185&lng=139.70159288080336",
  },
  {
    KEY: "shinjuku",
    URL: "/area/shinjuku",
    NAME: "新宿",
    POSITION: "&lat=35.68978966315499&lng=139.7005605673097",
  },
  {
    KEY: "shimokitazawa",
    URL: "/area/shimokitazawa",
    NAME: "下北沢",
    POSITION: "&lat=35.66183756248904&lng=139.6668381519685",
  },
  {
    KEY: "shinagawa",
    URL: "/area/shinagawa",
    NAME: "品川",
    POSITION: "&lat=35.62868056481697&lng=139.73869532313222",
  },
  {
    KEY: "ueno",
    URL: "/area/ueno",
    NAME: "上野",
    POSITION: "&lat=35.714315262208316&lng=139.77749492682557",
  },
  {
    KEY: "ikebukuro",
    URL: "/area/ikebukuro",
    NAME: "池袋",
    POSITION: "&lat=35.72980113647696&lng=139.71083213431248",
  },
  {
    KEY: "akihabara",
    URL: "/area/akihabara",
    NAME: "秋葉原",
    POSITION: "&lat=35.69856754301279&lng=139.77308169031997",
  },
];

export const GENRES = [
  { KEY: "izakaya", NAME: "居酒屋", NUM: "G001" },
  { KEY: "dining-bar", NAME: "ダイニングバー・バル", NUM: "G002" },
  { KEY: "creative-cuisine", NAME: "創作料理", NUM: "G003" },
  { KEY: "japanese-meal", NAME: "和食", NUM: "G004" },
  { KEY: "western-food", NAME: "洋食", NUM: "G005" },
  { KEY: "italian-french", NAME: "イタリアン・フレンチ", NUM: "G006" },
  { KEY: "cinese-food", NAME: "中華", NUM: "G007" },
  { KEY: "yakiniku", NAME: "焼肉・ホルモン", NUM: "G008" },
  { KEY: "korean-cuisine", NAME: "韓国料理", NUM: "G017" },
  { KEY: "asian-ethnic-cuisine", NAME: "アジア・エスニック料理", NUM: "G009" },
  { KEY: "international-cuisine", NAME: "各国料理", NUM: "G010" },
  { KEY: "karaoke-party", NAME: "カラオケ・パーティ", NUM: "G011" },
  { KEY: "bar-cocktail", NAME: "バー・カクテル", NUM: "G012" },
  { KEY: "ramen", NAME: "ラーメン", NUM: "G013" },
  { KEY: "okonomiyaki-monja", NAME: "お好み焼き・もんじゃ", NUM: "G016" },
  { KEY: "cafe-sweets", NAME: "カフェ・スイーツ", NUM: "G014" },
  { KEY: "other-gourmet", NAME: "その他グルメ", NUM: "G015" },
];

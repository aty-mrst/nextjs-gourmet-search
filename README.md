# 飲食店検索アプリ 山口県特化

山口県の飲食店が検索できるアプリ

## 検索候補

- 地域別
- ジャンル別

## 参考

- [ホットペッパー API リファレンス](https://webservice.recruit.co.jp/doc/hotpepper/reference.html)
- [Hotpepper API を使って指定した地点の近くの飲食店を検索する](https://coffee-nominagara.com/hotpepper-api)

## Todo

- ページネーションの実装

1. ページコンポーネントで getServerSideProps でページ番号を取得する
2. api を ページコンポーネントで全て叩く
3. 必要な可能性のあるパラメータは全て受け取って、判定はapi側で行う
3. パラメーターをもとに、取得するデータの内容を調整する

- 地域をクリックすると全てのジャンルを検索しなおす
- 型定義 any の修正
- pwa の導入 android だけうまくいった

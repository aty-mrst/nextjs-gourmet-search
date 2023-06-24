# Next.js× ホットペッパーグルメ API でグルメ検索アプリ制作

## 技術スタック

- Next.js
- TypeScript
- TailwindCSS
- Material UI
- Vercel
- Firebase
- PWA

## 主な機能

- 検索機能(都道府県 × 駅名 × ジャンル × キーワード)
- 新規会員登録(Firebase Authentication)
- ログイン、ログアウト(Firebase Authentication)
- いいね機能(Cloud Firestore)
- ページネーション
- PWA

## Cloud Firestore DB

<table>
<tr align="center">
  <th>データモデル</th>
  <th>データ名</th>
  <th>タイプ</th>
  <th>備考</th>
</tr>
<tr>
<tr align="center">
  <th>コレクション</th>
  <td>like</td>
  <td>-</td>
  <td>ユーザーごとにお気に入り店舗のIDを管理</td>
</tr>
<tr align="center">
  <th>ドキュメント</th>
  <td>ユーザーID</td>
  <td>-</td>
  <td>AuthenticationのユーザーUIDが入る</td>
</tr>
<tr align="center">
  <th rowspan="2">フィールド</th>
  <td>likeShopId</td>
  <td>array</td>
  <td>お気に入りした店舗IDを管理</td>
</tr>
</table>

## Todo

- 主要駅のデータをまとめる
- OGP の設定
- safari と android の UI 調整
- フォームをフロントでバリデーションをかける
- 会員登録とログイン待ちの時に、ローディングバーの設置とボタンを disable 状態にしておく

## 参考

- [ホットペッパー API リファレンス](https://webservice.recruit.co.jp/doc/hotpepper/reference.html)
- [Hotpepper API を使って指定した地点の近くの飲食店を検索する](https://coffee-nominagara.com/hotpepper-api)

## 開発者

[Atsuya](https://github.com/AtsuyaMorishita)

## 公開 URL

https://gourmet-search-tau.vercel.app/

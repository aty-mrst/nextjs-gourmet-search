# Next.js× ホットペッパーグルメ API でグルメ検索アプリ制作

## 機能

- 地域別検索
- ジャンル別検索
- キーワード検索
- ページネーション
- PWA 対応

## 参考

- [ホットペッパー API リファレンス](https://webservice.recruit.co.jp/doc/hotpepper/reference.html)
- [Hotpepper API を使って指定した地点の近くの飲食店を検索する](https://coffee-nominagara.com/hotpepper-api)

## Todo

- 検索フォームと URL の状態を常に一致させる → OK
- 件数表示を 1/300 のようにページネーション とも連動させる → OK
- 未ログイン状態でいいね → ローカルストレージに保存 → ログイン後 firestore へ保存 → ローカルストレージから削除
- いいね済みの店舗をいいね順に並べる
- いいね済みのアイテムは disable 状態にする api を叩く時に、いいね済みの ID も取得して、一致した店舗だけに適用する
- 一覧でもいいねのつけ外しをする。ボタンを押すたびに api が叩かれる。
- 検索エリアを上にスクロールしたときだけ丈夫固定にする。下にスクロール時は戻る。

## 開発者

[Atsuya](https://github.com/AtsuyaMorishita)

## 公開 URL

https://gourmet-search-tau.vercel.app/

## Todo

- 未ログイン状態でいいねした時は、ログインに誘導して、いいねされている状態に

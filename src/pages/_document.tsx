import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="content-language" content="ja" />
        <meta name="msapplication-TileColor" content="#ffad1a" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="application-name" content="gourmet-search" />
        <meta name="description" content="グルメ検索アプリだよ！！！！！！" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

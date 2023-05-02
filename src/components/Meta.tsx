import Head from "next/head";

type MetaType = {
  title?: string;
  description?: string;
};

export const Meta = ({ title, description }: MetaType) => {
  const metaTitle = title
    ? `${title} | 東京駅チカグルメ`
    : "東京駅チカグルメ";

  const metaDesc = description
    ? description
    : "東京の各主要駅から徒歩15分以内の飲食店が検索できます。地域、ジャンルからあなたのお気に入りのお店を見つけよう！";

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta property="og:title" content={metaTitle} />
      <meta property="description" content={metaDesc} />
      <meta property="og:description" content={metaDesc} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp_large.png`}
      />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

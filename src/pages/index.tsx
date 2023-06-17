import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutMain } from "@/components/LayoutMain";
import { Meta } from "@/components/Meta";
import { SearchArea } from "@/components/SearchArea";

type Props = {
  prefecture: [];
  genres: [];
};

export default function Home({ prefecture, genres }: Props) {
  return (
    <>
      <Meta />

      <Header />

      <LayoutMain>
        <div>
          <h2>
            あなただけのお店を
            <br />
            簡単に探そう
          </h2>
          <p>
            全国のお店から、
            <br />
            あなた合ったお店がすぐ見つかる
          </p>
          <SearchArea prefecture={prefecture} genres={genres} />
        </div>
      </LayoutMain>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  //apiURL
  const apiAreaUrl = process.env.HOTPEPPER_AREA_API;
  const apiGenreUrl = process.env.HOTPEPPER_GENRE_API;
  //apiキー
  const apiKey = `&key=${process.env.HOTPEPPER_API_KEY}`;

  //県ごとにエリアを取得
  const resArea = await fetch(`${apiAreaUrl}${apiKey}`);
  const resAreaJson = await resArea.json();
  const prefecture = resAreaJson.results.large_area;

  //ジャンルを取得
  const resGenre = await fetch(`${apiGenreUrl}${apiKey}`);
  const resGenreJson = await resGenre.json();
  const genres = resGenreJson.results.genre;

  return {
    props: {
      prefecture,
      genres,
    },
  };
}

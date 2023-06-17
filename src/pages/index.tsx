import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutMain } from "@/components/LayoutMain";
import { Meta } from "@/components/Meta";
import { SearchArea } from "@/components/SearchArea";
import { TopMv } from "@/components/TopMv";

type Props = {
  prefecture: [];
  genres: [];
};

export default function Home({ prefecture, genres }: Props) {
  return (
    <>
      <Meta />

      
      <Header />
      <TopMv prefecture={prefecture} genres={genres} />

      {/* <LayoutMain></LayoutMain> */}

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

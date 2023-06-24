import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutMain } from "@/components/LayoutMain";
import { Meta } from "@/components/Meta";
import { TopMv } from "@/components/TopMv";
import useInstallPrompt from "@/components/UseInstallPrompt";

type Props = {
  prefecture: [];
  genres: [];
};

export default function Home({ prefecture, genres }: Props) {
  const [isInstallable, acceptPrompt] = useInstallPrompt();

  return (
    <>
      <Meta />

      <Header />

      <TopMv prefecture={prefecture} genres={genres} />

      {/* <LayoutMain></LayoutMain> */}

      <Footer />

      {isInstallable && (
        <button
          onClick={acceptPrompt}
          className="fixed w-[280px] bottom-16 z-50 left-[50%] translate-x-[-50%] border border-[#017D01] text-[#017D01] bg-white px-5 py-2 rounded"
        >
          アプリ版をインストール
        </button>
      )}
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

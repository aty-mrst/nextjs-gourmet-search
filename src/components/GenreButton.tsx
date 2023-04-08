import Link from "next/link";

type GenreButtonType = {
  genreName: string;
  onClick: (e: any) => void;
  resolvedUrl: string | undefined;
  genreUrl: string;
};

const GenreButton = ({ genreName, resolvedUrl, genreUrl }: GenreButtonType) => {
  return (
    <Link
      href={`${resolvedUrl}/${genreUrl}`}
      className="text-center w-[100%] block py-3 text-sm border-b first-of-type:border-t border-[#F8E6CC] ease-in duration-150 hover:text-[#017D01]"
    >
      {genreName}
    </Link>
  );
};

export default GenreButton;

import axios from "axios";

type GenreButtonType = {
  genreName: string;
  onClick: (e: any) => void;
};

const GenreButton = ({ genreName, onClick }: GenreButtonType) => {
  return (
    <button
      onClick={(e) => onClick(e)}
      className="w-[100%] block py-3 text-sm border-b first-of-type:border-t"
      data-name={genreName}
    >
      {genreName}
    </button>
  );
};

export default GenreButton;

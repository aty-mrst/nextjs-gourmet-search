import axios from "axios";

type GenreButtonType = {
  genreName: string;
  onClick: () => void;
};

const GenreButton = ({ genreName, onClick }: GenreButtonType) => {
  return (
    <button
      onClick={() => onClick()}
      className="w-[100%] block py-3 text-sm border-b first-of-type:border-t"
    >
      {genreName}
    </button>
  );
};

export default GenreButton;

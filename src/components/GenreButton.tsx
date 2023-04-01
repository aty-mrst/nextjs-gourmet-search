import axios from "axios";

type GenreButtonType = {
  genreName: string;
  onClick: (e: any) => void;
};

const GenreButton = ({ genreName, onClick }: GenreButtonType) => {
  return (
    <button
      onClick={(e) => onClick(e)}
      className="w-[100%] block py-3 text-sm border-b first-of-type:border-t border-[#F8E6CC] ease-in duration-150 hover:text-[#017D01]"
      data-name={genreName}
    >
      {genreName}
    </button>
  );
};

export default GenreButton;

type FixedButtonType = {
  onClick: () => void;
};

const FixedButton = ({ onClick }: FixedButtonType) => {
  const scrollTo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* sp */}
      <button
        className="fixed right-[15px] bottom-[15px] border rounded-[50%] w-[80px] h-[80px] inline-block text-sm lg:hidden z-30 bg-white"
        onClick={onClick}
      >
        ジャンルを
        <br />
        選択
      </button>

      {/* pc */}
      <button
        className="hidden lg:inline-block fixed right-[15px] bottom-[15px] border rounded-[50%] w-[80px] h-[80px] text-sm z-30 bg-white"
        onClick={scrollTo}
      >
        ページ
        <br />
        トップ
      </button>
    </>
  );
};

export default FixedButton;

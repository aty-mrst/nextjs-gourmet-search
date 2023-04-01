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
        className="fixed right-[10px] bottom-[10px] border-2 rounded-[50%] w-[80px] h-[80px] inline-block text-xs lg:hidden z-30 bg-[#017D01] text-[#fff] border-[#fff]"
        onClick={onClick}
      >
        ジャンルを
        <br />
        選択
      </button>

      {/* pc */}
      <button
        className="hidden lg:inline-block fixed right-[15px] bottom-[15px] border-2 rounded-[50%] w-[80px] h-[80px] text-xs z-30 bg-[#017D01] text-[#fff] border-[#fff]"
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

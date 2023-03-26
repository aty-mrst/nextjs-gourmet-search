type FixedButtonType = {
  onClick: () => void;
};

const FixedButton = ({ onClick }: FixedButtonType) => {
  return (
    <button
      className="fixed right-[15px] bottom-[15px] border rounded-[50%] w-[80px] h-[80px] inline-block text-sm lg:hidden z-30 bg-white"
      onClick={onClick}
    >
      ジャンルを
      <br />
      選択
    </button>
  );
};

export default FixedButton;

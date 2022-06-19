const Char = ({ char, successKeys, misplacedKeys, failedKeys, onClick }) => {
  const getStyle = () => {
    if (misplacedKeys.includes(char)) return "bg-yellow-500 text-white";
    if (failedKeys.includes(char)) return "bg-slate-800 text-white";
    return "";
  };
  return (
    <button
      className={`border rounded-lg w-8 sm:w-12 h-8 sm:h-12 flex justify-center items-center uppercase font-bold text-4xl ${getStyle()}`}
      onClick={() => onClick(char)}
    >
      {char}
    </button>
  );
};

export default Char;

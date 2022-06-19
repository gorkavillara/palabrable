import React from "react";
import { IoSend, IoBackspaceOutline, IoRefresh } from "react-icons/io5";

const keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
  ["send", "z", "x", "c", "v", "b", "n", "m", "back"],
];


const Keyboard = ({
  type,
  successKeys = [],
  misplacedKeys = [],
  failedKeys = [],
  reset,
  status = "",
}) => {
  return (
    <div className={`flex flex-col items-center gap-1`}>
      {keys.map((row, i) => (
        <div className="flex justify-evenly items-center gap-1" key={i}>
          {row.map((key, j) => (
            <React.Fragment key={j}>
              {key === "back" && (
                <button
                  className="bg-slate-300 border-b-4 border-slate-400 w-12 h-12 rounded-lg uppercase text-2xl flex justify-center items-center"
                  onClick={() => type(key)}
                >
                  <span>
                    <IoBackspaceOutline />
                  </span>
                </button>
              )}
              {key === "send" && (
                <button
                  key={j}
                  className="bg-blue-600 text-white w-14 h-12 rounded-lg uppercase text-2xl flex justify-center items-center border-b-4 border-blue-800"
                  onClick={() => (status === "" ? type(key) : reset())}
                >
                  <span>{status === "" ? <IoSend /> : <IoRefresh />}</span>
                </button>
              )}
              {key !== "back" && key !== "send" && (
                <button
                  key={j}
                  className={`bg-slate-300 border-b-4 border-slate-400
                  ${failedKeys.includes(key) && "bg-slate-800 text-white"}
                  ${misplacedKeys.includes(key) && "bg-yellow-500"}
                  ${successKeys.includes(key) && "bg-green-600 text-white"}
                  w-8 h-12 rounded-lg uppercase text-xl flex justify-center items-center`}
                  onClick={() => type(key)}
                >
                  <span>{key}</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;

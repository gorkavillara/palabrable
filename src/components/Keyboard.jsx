import React, { useEffect, useState } from "react";
import { IoSend, IoBackspaceOutline } from "react-icons/io5";

const keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
  ["z", "x", "c", "v", "b", "n", "m", "back", "send"],
];

const Keyboard = ({ type, secretWord, tries, successKeys, misplacedKeys, failedKeys }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      {keys.map((row, i) => (
        <div className="flex justify-evenly items-center gap-1" key={i}>
          {row.map((key, j) => (
            <>
              {key === "back" && (
                <button
                  key={j}
                  className="bg-slate-300 w-9 h-10 rounded-lg uppercase text-2xl flex justify-center items-center"
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
                  className="bg-blue-600 text-white w-14 h-10 rounded-lg uppercase text-2xl flex justify-center items-center"
                  onClick={() => type(key)}
                >
                  <span>
                    <IoSend />
                  </span>
                </button>
              )}
              {key !== "back" && key !== "send" && (
                <button
                  key={j}
                  className={`bg-slate-300
                  ${failedKeys.includes(key) && "bg-slate-800 text-white"}
                  ${misplacedKeys.includes(key) && "bg-yellow-500"}
                  ${successKeys.includes(key) && "bg-green-600 text-white"}
                  w-8 h-10 rounded-lg uppercase text-xl flex justify-center items-center`}
                  onClick={() => type(key)}
                >
                  <span>{key}</span>
                </button>
              )}
            </>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;

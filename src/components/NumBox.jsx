import React, { useState } from "react";

const NumBox = ({ num }) => {

  return (
    <div
      className={`border rounded-lg w-8 sm:w-12 h-8 sm:h-12 flex justify-center items-center uppercase font-bold text-4xl`}
    >
      {num}
    </div>
  );
};

export default NumBox;

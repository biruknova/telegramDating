import React, { useState } from "react";

import FemaleIcon from "./icons/Female";
import MaleIcon from "./icons/Male";

const RadioToggle = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    console.log(`Selected option: ${option}`);
  };

  return (
    <div className="flex  items-center w-full  space-x-4">
      <div
        onClick={() => handleOptionChange("Male")}
        className={`flex flex-col items-center ${
          selectedOption === "Male"
            ? "bg-blue-500 text-white font-bold"
            : "bg-transparent border border-slate-200 text-slate-200"
        } w-1/2 rounded p-5 space-y-3`}
      >
        <MaleIcon />
        <label className="text-lg">Male</label>
      </div>

      <div
        onClick={() => handleOptionChange("Female")}
        className={`flex flex-col items-center  ${
          selectedOption === "Female"
            ? "bg-blue-500 text-white font-bold"
            : "bg-transparent border border-slate-200 text-slate-200"
        } w-1/2 rounded p-5 space-y-3`}
      >
        <FemaleIcon />
        <label className="text-lg">Female</label>
      </div>
    </div>
  );
};

export default RadioToggle;

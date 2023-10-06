import React, { useState } from "react";

import FemaleIcon from "./icons/Female";
import MaleIcon from "./icons/Male";

const RadioToggle = () => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    console.log(`Selected option: ${option}`);
  };

  const colors = window.Telegram.WebApp.themeParams;

  const { button_color: btnColor, button_text_color: btnTxtColor } = colors;

  return (
    <div className="flex  items-center w-full  space-x-4">
      <div
        onClick={() => handleOptionChange(1)}
        style={{
          backgroundColor: selectedOption === 1 ? btnColor : "transparent",
          color: selectedOption === 1 ? btnTxtColor : btnColor,
          border: `1px solid ${btnColor}`,
          fontWeight: selectedOption === 1 ? "bold" : "normal",
        }}
        className={`flex flex-col items-center  w-1/2 rounded p-5 space-y-3`}
      >
        <MaleIcon styles="w-7 h-7" />
        <label className="text-lg">Male</label>
      </div>

      <div
        onClick={() => handleOptionChange(2)}
        style={{
          backgroundColor: selectedOption === 2 ? btnColor : "transparent",
          color: selectedOption === 2 ? btnTxtColor : btnColor,
          border: `1px solid ${btnColor}`,
          fontWeight: selectedOption === 2 ? "bold" : "normal",
        }}
        className={`flex flex-col items-center  w-1/2 rounded p-5 space-y-3`}
      >
        <FemaleIcon styles="w-7 h-7" />
        <label className="text-lg">Female</label>
      </div>
    </div>
  );
};

export default RadioToggle;

import React, { useState } from "react";

import FemaleIcon from "./icons/Female";
import MaleIcon from "./icons/Male";

const RadioToggle = ({ onToggle }) => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onToggle(option);
    console.log(`Selected option: ${option}`);
  };

  const colors = window.Telegram.WebApp.themeParams;

  const {
    button_color: btnColor,
    button_text_color: btnTxtColor,
    secondary_bg_color: secondaryBgColor,
  } = colors;

  return (
    <div className="flex  items-center w-full  space-x-4">
      <button
        onClick={() => handleOptionChange(1)}
        style={{
          backgroundColor: selectedOption === 1 ? btnColor : secondaryBgColor,
          color: btnTxtColor,

          fontWeight: selectedOption === 1 ? "500" : "normal",
        }}
        className={`flex  items-center  w-1/2 rounded p-2 space-x-2 rounded-lg`}
      >
        <MaleIcon styles="w-6 h-6" />
        <label className="">Male</label>
      </button>

      <button
        onClick={() => handleOptionChange(2)}
        style={{
          backgroundColor: selectedOption === 2 ? btnColor : secondaryBgColor,
          color: btnTxtColor,
          fontWeight: selectedOption === 2 ? "500" : "normal",
        }}
        className={`flex items-center  w-1/2 rounded p-2 space-x-2 rounded-lg`}
      >
        <FemaleIcon styles="w-6 h-6" />
        <label className="">Female</label>
      </button>
    </div>
  );
};

export default RadioToggle;

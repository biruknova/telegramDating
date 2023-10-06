import { useState } from "react";

import RadioToggle from "../components/Radios";

const SignupPage = () => {
  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [ageIsFocused, setAgeIsFocused] = useState(false);

  const focusHandler = (lable) => {
    if (lable === "name") {
      setNameIsFocused(true);
    } else {
      setAgeIsFocused(true);
    }
  };

  const blurHandler = (lable) => {
    if (lable === "name") {
      setNameIsFocused(false);
    } else {
      setAgeIsFocused(false);
    }
  };

  window.Telegram.WebApp.MainButton.show();

  const colors = window.Telegram.WebApp.themeParams;

  const {
    bg_color: bgColor,
    text_color: txtColor,
    hint_color: hintColor,
    button_color: btnColor,
    button_text_color: btnTxtColor,
    secondary_bg_color: secondaryBgColor,
  } = colors;

  console.log("colors", txtColor, hintColor, btnTxtColor);
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="bg-slate-700 flex flex-col justify-center min-h-screen p-3"
    >
      <div className="w-full flex flex-col space-y-5">
        <div className="flex flex-col">
          <label
            style={{
              color: nameIsFocused ? btnColor : secondaryBgColor,
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            style={{
              borderBottom: nameIsFocused ? btnColor : secondaryBgColor,
            }}
            className={`outline-none py-1 bg-transparent transition-colors duration-200`}
            onFocus={() => {
              focusHandler("name");
            }}
            onBlur={() => {
              blurHandler("name");
            }}
          ></input>
        </div>
        <div className="flex flex-col">
          <label style={{ color: ageIsFocused ? btnColor : secondaryBgColor }}>
            Age
          </label>
          <input
            type="number"
            style={{ borderBottom: ageIsFocused ? btnColor : secondaryBgColor }}
            className={`outline-none py-1 b bg-transparent transition-colors duration-200`}
            onFocus={() => {
              focusHandler("name");
            }}
            onBlur={() => {
              blurHandler("name");
            }}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Gender</label>

          <RadioToggle />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

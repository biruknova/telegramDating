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
  } = colors;

  console.log("colors here", txtColor, hintColor, btnTxtColor);
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="bg-slate-700 flex flex-col justify-center min-h-screen p-3"
    >
      <div className="w-full flex flex-col space-y-5">
        <div className="flex flex-col">
          <label style={{ color: ageIsFocused ? btnColor : hintColor }}>
            Age
          </label>
          <input
            type="number"
            style={{
              borderBottom: `1px solid ${ageIsFocused ? btnColor : hintColor}`,
              color: txtColor,
            }}
            className={`outline-none py-1 b bg-transparent transition-colors duration-200`}
            onFocus={() => {
              focusHandler("age");
            }}
            onBlur={() => {
              blurHandler("age");
            }}
          ></input>
        </div>
        <div className="relative">
          <input
            type="text"
            id="full_name"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm  bg-transparent rounded-lg  appearance-none  outline-none ring-0  peer"
            placeholder=" "
            style={{
              border: `1px solid ${nameIsFocused ? btnColor : hintColor}`,
              color: txtColor,
            }}
          />
          <label
            htmlFor="full_name"
            style={{
              color: nameIsFocused ? btnColor : hintColor,
              backgroundColor: bgColor,
            }}
            className="absolute text-sm  duration-200 transform -translate-y-4 scale-75 top-1.5 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Full Name
          </label>
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

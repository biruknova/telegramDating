import { useState } from "react";

import RadioToggle from "../components/Radios";

import RegistrationAnime from "../components/animatedIcons/Registration";

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
  } = colors;

  const [formData, setFormData] = useState({
    fullName: "adsf",
    age: "",
    gender_id: "",
    tg_data: "asdfasdf",
  });

  const getGenderId = (val) => {
    setFormData({
      ...formData,
      gender_id: val.toString(),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(formData);
  };

  const areAllValuesFilled = () => {
    console.log(Object.values(formData).every((value) => value.trim() !== ""));

    return Object.values(formData).every((value) => value.trim() !== "");
  };

  console.log(areAllValuesFilled());
  const hello = window.Telegram.WebApp.initDataUnsafe;
  const queryString = window.Telegram.WebApp.initDataUnsafe.user;
  alert(JSON.parse(hello));
  alert(JSON.parse(queryString));

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="bg-slate-700 flex flex-col  min-h-screen p-5"
    >
      <div className="flex flex-col items-center py-8 space-y-3">
        <RegistrationAnime />
        <div className="flex flex-col space-y-1.5 items-center text-center w-[85%]">
          <h1 style={{ color: txtColor }} className="text-2xl font-semibold">
            Sign Up
          </h1>
          <p style={{ color: hintColor }} className="text-sm">
            Engage with people around your area and spend the time of your life.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-6">
        <div className="relative">
          <input
            type="text"
            id="full_name"
            name="fullName"
            value={formData.fullName}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm  bg-transparent rounded-lg  appearance-none  outline-none ring-0  peer"
            placeholder=" "
            style={{
              border: `1px solid ${nameIsFocused ? btnColor : hintColor}`,
              color: txtColor,
            }}
            onChange={handleInputChange}
            onFocus={() => {
              focusHandler("name");
            }}
            onBlur={() => {
              blurHandler("name");
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
        <div className="relative">
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm  bg-transparent rounded-lg  appearance-none  outline-none ring-0  peer"
            placeholder=" "
            style={{
              border: `1px solid ${ageIsFocused ? btnColor : hintColor}`,
              color: txtColor,
            }}
            onChange={handleInputChange}
            onFocus={() => {
              focusHandler("age");
            }}
            onBlur={() => {
              blurHandler("age");
            }}
          />
          <label
            htmlFor="age"
            style={{
              color: ageIsFocused ? btnColor : hintColor,
              backgroundColor: bgColor,
            }}
            className="absolute text-sm  duration-200 transform -translate-y-4 scale-75 top-1.5 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Age
          </label>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            style={{
              color: btnColor,
            }}
            className="text-sm px-2"
          >
            Gender
          </label>

          <RadioToggle onToggle={getGenderId} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

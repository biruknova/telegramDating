import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BASE_URL from "../config";

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

  const colors = window.Telegram.WebApp.themeParams;

  const {
    bg_color: bgColor,
    text_color: txtColor,
    hint_color: hintColor,
    button_color: btnColor,
  } = colors;

  const MainButton = window.Telegram.WebApp.MainButton;

  const queryString = window.Telegram.WebApp.initData;

  const unsafeUserData = window.Telegram.WebApp.initDataUnsafe.user;

  const unsafeFirstName = unsafeUserData.first_name;
  const unsafeLastName = unsafeUserData.last_name;

  const unsafeFullName = unsafeFirstName + " " + unsafeLastName;

  const [formData, setFormData] = useState({
    name: unsafeFullName,
    gender_id: "",
    age: "",
    tg_data: queryString,
  });

  const getGenderId = (val) => {
    console.log("gender_id", val);
    setFormData({
      ...formData,
      gender_id: val,
    });
  };

  const handleInputChange = (e) => {
    console.log("event", e);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const areAllValuesFilled = () => {
    const fieldsAreFilled = Object.values(formData).every((value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      } else if (typeof value === "number") {
        return !isNaN(value);
      } else {
        return false;
      }
    });

    if (fieldsAreFilled) {
      MainButton.show();
    } else {
      MainButton.hide();
    }
  };

  areAllValuesFilled();

  const navigate = useNavigate();

  const registerUser = () => {
    MainButton.offClick(registerUser);
    MainButton.showProgress();
    var newHeader = new Headers();
    newHeader.append("Content-Type", "application/json");

    var raw = JSON.stringify({ ...formData });

    var requestOptions = {
      method: "POST",
      headers: newHeader,
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + "/api/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result.success);
        alert(result.message);
        MainButton.hideProgress();
        console.log("data to be sent", formData);
        console.log(result);

        if (result.success) {
          navigate("/home");
          MainButton.hide();
        }
      })
      .catch((error) => {
        MainButton.onClick(registerUser);
        MainButton.hideProgress();
        console.log("error", error);
      });
  };

  useEffect(() => {
    MainButton.onClick(registerUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            name="name"
            value={formData.name}
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

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import BASE_URL from "../config";
import context from "../store/context";

import RadioToggle from "../components/Radios";

import RegistrationAnime from "../components/animatedIcons/Registration";

const SignupPage = () => {
  const { setTokenValue, setTokenIsSet } = useContext(context);
  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [ageIsFocused, setAgeIsFocused] = useState(false);
  const [belowAgeLimit, setBelowAgeLimit] = useState(false);

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

  let [formData, setFormData] = useState({
    name: unsafeFullName,
    gender_id: "",
    age: "",
    tg_data: queryString,
  });

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
      if (formData.age !== "" && formData.age < 16) {
        setBelowAgeLimit(true);
      } else {
        setBelowAgeLimit(false);
      }
      setAgeIsFocused(false);
    }
  };

  const getGenderId = (val) => {
    setFormData({
      ...formData,
      gender_id: val,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "age") {
      if (value !== "" && value.substr(0, 2) < 16) {
        setBelowAgeLimit(true);
      } else {
        setBelowAgeLimit(false);
      }
      if (value.length > 2) {
        setFormData({
          ...formData,
          [name]: value.substr(0, 2),
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const areAllValuesFilled = () => {
    const nameIsValid = formData.name !== "";
    const genderIsValid = formData.gender_id !== "";
    const ageIsValid = formData.age >= 16;
    const dataIsValid = formData.tg_data !== "";

    const fieldsAreFilled =
      nameIsValid && genderIsValid && ageIsValid && dataIsValid;

    if (fieldsAreFilled) {
      MainButton.show();
    } else {
      MainButton.hide();
    }
  };

  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    buttonRef.current.click();
  };

  useEffect(() => {
    areAllValuesFilled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    MainButton.onClick(handleButtonClick);

    return () => {
      MainButton.offClick(handleButtonClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const registerUser = () => {
    MainButton.showProgress();
    var newHeader = new Headers();
    newHeader.append("Content-Type", "application/json");

    var raw = JSON.stringify({ ...formData, age: Number(formData.age) });

    var requestOptions = {
      method: "POST",
      headers: newHeader,
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + "/api/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        MainButton.hideProgress();
        if (result.success) {
          navigate("/home");
          sessionStorage.setItem("dateUserToken", result.token);
          setTokenValue(result.token);
          setTokenIsSet(true);
          MainButton.hide();
        }
      })
      .catch((error) => {
        MainButton.hideProgress();
        console.log("error", error);
      });
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="bg-slate-700 flex flex-col  min-h-screen p-5"
    >
      <div onClick={registerUser} ref={buttonRef}></div>
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
              border: `1px solid ${
                nameIsFocused || formData.name !== "" ? btnColor : hintColor
              }`,
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
              color:
                nameIsFocused || formData.name !== "" ? btnColor : hintColor,
              backgroundColor: bgColor,
            }}
            className="absolute text-sm  transform -translate-y-4 scale-75 top-1.5 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Full Name
          </label>
        </div>
        <div className="flex flex-col w-full items-end space-y-1">
          <div className="relative w-full">
            <input
              type="number"
              id="age"
              name="age"
              min="0"
              value={formData.age}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm  bg-transparent rounded-lg  appearance-none  outline-none ring-0  peer"
              placeholder=" "
              style={{
                border: `1px solid ${
                  belowAgeLimit
                    ? "#ef4444"
                    : ageIsFocused || formData.age !== ""
                    ? btnColor
                    : hintColor
                }`,
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
                color: belowAgeLimit
                  ? "#ef4444"
                  : ageIsFocused || formData.age !== ""
                  ? btnColor
                  : hintColor,
                backgroundColor: bgColor,
              }}
              className="absolute text-sm   transform -translate-y-4 scale-75 top-1.5 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Age
            </label>
          </div>
          {belowAgeLimit ? (
            <span className="text-xs text-red-500 px-2">
              Can't be below 16.
            </span>
          ) : (
            <div className="w-2 h-4"></div>
          )}
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const BackButton = window.Telegram.WebApp.BackButton;

  BackButton.show();

  useEffect(() => {
    const handleBack = () => {
      navigate("/profile");
    };

    BackButton.onClick(handleBack);

    // Clean up the event listener when the component unmounts
    return () => {
      BackButton.offClick(handleBack);
      BackButton.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colors = window.Telegram.WebApp.themeParams;

  const {
    bg_color: bgColor,
    text_color: txtColor,
    hint_color: hintColor,
    button_color: btnColor,
    secondary_bg_color: secondaryBgColor,
    // button_text_color: btnTxtColor,
  } = colors;

  const [formData, setFormData] = useState({
    name: "Hello",
    age: "23",
    bio: "",
  });

  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [ageIsFocused, setAgeIsFocused] = useState(false);
  const [bioisFocused, setBioIsFocused] = useState(false);

  const [belowAgeLimit, setBelowAgeLimit] = useState(false);
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

  const focusHandler = (lable) => {
    if (lable === "name") {
      setNameIsFocused(true);
    } else if (lable === "age") {
      setAgeIsFocused(true);
    } else {
      setBioIsFocused(true);
    }
  };

  const blurHandler = (lable) => {
    if (lable === "name") {
      setNameIsFocused(false);
    } else if (lable === "age") {
      if (formData.age !== "" && formData.age < 16) {
        setBelowAgeLimit(true);
      } else {
        setBelowAgeLimit(false);
      }
      setAgeIsFocused(false);
    } else {
      setBioIsFocused(false);
    }
  };

  return (
    <div
      style={{ color: txtColor, backgroundColor: bgColor }}
      className="w-full min-h-screen flex flex-col w-full z-40"
    >
      <div className="w-full text-center px-10 py-16 space-y-4">
        <h1 style={{ color: txtColor }} className="text-2xl font-bold">
          Edit Profile
        </h1>
        <p style={{ color: hintColor }} className="text-sm">
          You Can edit your profile information below. Click the save changes
          button to save the changes.
        </p>
      </div>
      <div
        style={{ backgroundColor: secondaryBgColor }}
        className="h-[15px] w-full"
      />
      <div className="w-full flex flex-col flex-grow p-5 space-y-5">
        <div className="flex flex-col w-full">
          <lable className="text-sm" style={{ color: hintColor }}>
            Full Name
          </lable>
          <input
            type="text"
            className="bg-transparent  outline-none ring-0 pt-2 pb-1 transition-colors duration-100"
            value={formData.name}
            style={{
              borderBottom: `2px solid ${
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
        </div>
        <div className="flex flex-col w-full">
          <lable className="text-sm" style={{ color: hintColor }}>
            Bio
          </lable>
          <input
            type="text"
            className="bg-transparent  outline-none ring-0 pt-2 pb-1  transition-colors duration-100"
            value={formData.bio}
            style={{
              borderBottom: `2px solid ${
                bioisFocused || formData.bio !== "" ? btnColor : hintColor
              }`,
              color: txtColor,
            }}
            onChange={handleInputChange}
            onFocus={() => {
              focusHandler("bio");
            }}
            onBlur={() => {
              blurHandler("bio");
            }}
          />
        </div>
        <div className="flex flex-col w-full">
          <lable className="text-sm" style={{ color: hintColor }}>
            Age
          </lable>
          <input
            type="number"
            className="bg-transparent  outline-none ring-0 pt-2 pb-1  transition-colors duration-100"
            value={formData.age}
            style={{
              borderBottom: `2px solid ${
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
        </div>
      </div>
    </div>
  );
};
export default EditProfile;

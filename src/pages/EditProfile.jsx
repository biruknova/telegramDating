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
    // bg_color: bgColor,
    text_color: txtColor,
    hint_color: hintColor,
    button_color: btnColor,
    // button_text_color: btnTxtColor,
  } = colors;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bio: "",
  });

  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [ageIsFocused, setAgeIsFocused] = useState(false);
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

  return (
    <div className="w-full min-h-screen flex flex-col w-full bg-gray-700 z-40">
      <div className="w-full text-center px-10 py-16 bg-red-500 space-y-4">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-sm">
          You Can edit your profile information below. Click the save changes
          button to save the changes.
        </p>
      </div>
      <div
        // style={{ backgroundColor: secondaryBgColor }}
        className="h-[15px] w-full bg-white"
      />
      <div className="w-full flex flex-col flex-grow p-5 space-y-5">
        <div className="flex flex-col w-full">
          <lable>Full Name</lable>
          <input
            type="text"
            className="bg-transparent outline-none ring-0 pt-2.5 pb-1 transition-colors duration-100"
          />
        </div>
        <div className="flex flex-col w-full">
          <lable>Bio</lable>
          <input
            type="text"
            className="bg-transparent  outline-none ring-0 pt-2.5 pb-1  transition-colors duration-100"
            style={{
              borderBottom: `5px solid ${
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
          <lable>Age</lable>
          <input
            type="number"
            className="bg-transparent  outline-none ring-0 pt-2.5 pb-1  transition-colors duration-100"
            style={{
              borderBottom: `5px solid ${
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

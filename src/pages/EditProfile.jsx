import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  // Create a ref to store a reference to the input element
  const inputRef = useRef(null);

  // Function to focus the input element
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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

  const [characters, setCharacters] = useState(
    formData.bio ? 120 - formData.bio.length : 120
  );

  // Function to resize the textarea to fit its content
  const resizeTextarea = () => {
    const textarea = inputRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset the height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scrollHeight
    }
  };

  // Attach an event listener to resize the textarea when content changes
  useEffect(() => {
    resizeTextarea();
  }, []);
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
      if (name === "bio") {
        setCharacters(120 - value.length);
        resizeTextarea();
      }
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

  useEffect(() => {
    if (formData.bio === "") {
      focusInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className="flex flex-col w-full space-y-1">
          <input
            type="text"
            name="name"
            className="bg-transparent  outline-none ring-0 pt-2 pb-1 transition-colors duration-100"
            value={formData.name}
            style={{
              borderBottom: `1px solid ${nameIsFocused ? btnColor : hintColor}`,
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
          <lable
            className="text-xs"
            style={{
              color: nameIsFocused ? btnColor : hintColor,
            }}
          >
            Full Name
          </lable>
        </div>
        <div className="flex flex-col w-full space-y-1">
          <textarea
            rows={1}
            type="text"
            name="bio"
            maxLength="120"
            className="bg-transparent  outline-none ring-0 pt-2 pb-1  transition-colors duration-100"
            ref={inputRef}
            value={formData.bio}
            style={{
              borderBottom: `1px solid ${bioisFocused ? btnColor : hintColor}`,
              color: txtColor,
              resize: "none",
              overflowY: "hidden",
            }}
            onChange={handleInputChange}
            onFocus={() => {
              focusHandler("bio");
            }}
            onBlur={() => {
              blurHandler("bio");
            }}
          />
          <div className="flex items-center w-full justify-between">
            <lable
              className="text-xs"
              style={{
                color: bioisFocused ? btnColor : hintColor,
              }}
            >
              Bio
            </lable>
            <span style={{ color: hintColor }} className="text-xs">
              {characters}
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full space-y-1">
          <input
            type="number"
            name="age"
            className="bg-transparent  outline-none ring-0 pt-2 pb-1  transition-colors duration-100"
            value={formData.age}
            style={{
              borderBottom: `1px solid ${
                belowAgeLimit ? "#ef4444" : ageIsFocused ? btnColor : hintColor
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
          <lable
            className="text-xs"
            style={{
              color: belowAgeLimit
                ? "#ef4444"
                : ageIsFocused
                ? btnColor
                : hintColor,
            }}
          >
            Age
          </lable>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;

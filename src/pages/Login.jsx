import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import BASE_URL from "../config";
import context from "../store/context";

import HeartIcon from "../components/icons/Heart";

const LoginPage = () => {
  const { setTokenValue } = useContext(context);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const navigate = useNavigate();

  const viewPortHeight = window.Telegram.WebApp.viewportHeight;

  const autoLogin = () => {
    const queryString = window.Telegram.WebApp.initData;

    var newHeader = new Headers();
    newHeader.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      check_value: queryString,
    });

    var requestOptions = {
      method: "POST",
      headers: newHeader,
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + "/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsLoggingIn(false);
        if (result.success) {
          navigate("/home");
          setTokenValue(result.token);
          localStorage.setItem("token", result.token);
        } else {
          navigate("/signup");
        }
        window.Telegram.WebApp.expand();
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{ height: viewPortHeight }}
      className="text-white flex items-center justify-center relative"
    >
      <div className="fixed top-0 left-0 min-h-screen flex flex-col w-full bg-gray-700 z-40">
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
              className="bg-transparent border-b-2 border-white focus:border-blue-500 outline-none ring-0 pt-2.5 pb-1 transition-colors duration-100"
            />
          </div>
          <div className="flex flex-col w-full">
            <lable>Bio</lable>
            <input
              type="text"
              className="bg-transparent border-b-2 border-white focus:border-blue-500 outline-none ring-0 pt-2.5 pb-1  transition-colors duration-100"
            />
          </div>
          <div className="flex flex-col w-full">
            <lable>Age</lable>
            <input
              type="number"
              className="bg-transparent border-b-2 border-white focus:border-blue-500 outline-none ring-0 pt-2.5 pb-1  transition-colors duration-100"
            />
          </div>
        </div>
      </div>
      {isLoggingIn && <HeartIcon styles="w-9 h-9 animate-ping text-red-600" />}
    </div>
  );
};

export default LoginPage;

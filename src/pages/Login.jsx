import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import BASE_URL from "../config";
import context from "../store/context";

import HeartIcon from "../components/icons/Heart";

const LoginPage = () => {
  const { setToken } = useContext(context);
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
          setToken(result.token);
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
      {/* <div className="fixed w-full min-h-screen top-0 left-0 bg-gray-800 flex flex-grow pt-[130px] z-50">
        <div className="w-full flex flex-col flex-grow bg-gray-700  rounded-t-xl">
          <div className="-mt-[50px] flex flex-col items-center space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <div
                // style={{ backgroundColor: secondaryBgColor }}
                className="rounded-full w-[130px] h-[130px] rounded-full bg-blue-500 "
              ></div>
              <div className="flex flex-col space-y-1.5 items-center text-center w-[85%]">
                <h1 className="text-2xl font-semibold">Biruk K.</h1>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex flex-col items-center w-1/2">
                <HeartIcon styles="w-7 h-7" />
                <h1>Message</h1>
              </div>
              <div className="flex flex-col items-center w-1/2">
                <HeartIcon styles="w-7 h-7" />
                <h1>Message</h1>
              </div>
            </div>
            <div className="w-full flex flex-col divide-y divide-gray-800 pl-5">
              <div className="pr-5 py-3 space-y-1 text-start">
                <h1>this is a test text for ui observation</h1>
                <p className="text-xs">Bio</p>
              </div>
              <div className="pr-5 py-3 space-y-1 text-start">
                <h1>this is a test text for ui observation</h1>
                <p className="text-xs">Bio</p>
              </div>
              <div className="pr-5 py-3 space-y-1 text-start">
                <h1>this is a test text for ui observation</h1>
                <p className="text-xs">Bio</p>
              </div>
              <div className="pr-5 py-3 space-y-1 text-start">
                <h1>this is a test text for ui observation</h1>
                <p className="text-xs">Bio</p>
              </div>
              <div className="pr-5 py-3 space-y-1 text-start">
                <h1>this is a test text for ui observation</h1>
                <p className="text-xs">Bio</p>
              </div>
              <div className="pr-5 py-3 space-y-1 text-start">
                <h1>this is a test text for ui observation</h1>
                <p className="text-xs">Bio</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {isLoggingIn && <HeartIcon styles="w-9 h-9 animate-ping text-red-600" />}
    </div>
  );
};

export default LoginPage;

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import HeartIcon from "../components/icons/Heart";

const LoginPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const navigate = useNavigate();

  const viewPortHeight = window.Telegram.WebApp.viewportHeight;

  const autoLogin = () => {
    const queryString = window.Telegram.WebApp.initData;
    const unsafe = window.Telegram.WebApp.initDataUnsafe.user.first_name;
    console.log("unsafe", unsafe);

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

    fetch("https://telegram-date.bytemela.com/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsLoggingIn(false);
        if (result.success) {
          navigate("/home");
        } else {
          navigate("/signup");
        }
        window.Telegram.WebApp.expand();
        // console.log(result);
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
      className="text-white flex items-center justify-center"
    >
      {isLoggingIn && <HeartIcon styles="w-7 h-7 animate-ping text-red-600" />}
    </div>
  );
};

export default LoginPage;

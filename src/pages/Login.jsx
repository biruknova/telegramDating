import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const autoLogin = () => {
    setIsLoggingIn(true);
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

    fetch("https://telegram-date.bytemela.com/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsLoggingIn(false);
        if (result.success) {
          navigate("/home");
          window.Telegram.WebApp.expand();
        }
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-white">
      {isLoggingIn ? "Loging In ..." : "Logged In"}
    </div>
  );
};

export default LoginPage;

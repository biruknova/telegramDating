import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

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

    fetch("https://telegram-date.bytemela.com/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          navigate("/home");
        }
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    autoLogin();
  }, []);

  return <div>This is login page</div>;
};

export default LoginPage;

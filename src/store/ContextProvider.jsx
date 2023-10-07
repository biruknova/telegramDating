import { useState, useEffect } from "react";
import context from "./context";

import BASE_URL from "../config";

const DatingContextProvider = (props) => {
  const [token, setToken] = useState("");

  const [users, setUsers] = useState([]);
  const [isGettingUsers, setIsGettingUsers] = useState(true);

  const getUsers = () => {
    setIsGettingUsers(true);
    var newHeader = new Headers();
    newHeader.append("Accept", "application/json");
    newHeader.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: newHeader,
      redirect: "follow",
    };

    fetch(BASE_URL + "/api/fetch-users?page=1", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsGettingUsers(false);
        console.log(result);
        setUsers(result.users);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (token !== "") {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // // // // // // // // // // // // //
  const value = {
    token,
    setToken,
    isGettingUsers,
    users,
    setUsers,
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export default DatingContextProvider;

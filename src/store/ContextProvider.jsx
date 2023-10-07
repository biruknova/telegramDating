import { useState, useEffect } from "react";
import context from "./context";

import BASE_URL from "../config";

const DatingContextProvider = (props) => {
  const [token, setToken] = useState("");

  const [users, setUsers] = useState([]);
  const [isGettingUsers, setIsGettingUsers] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageCount, setPageCount] = useState(1);

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

    fetch(BASE_URL + "/api/fetch-users?page=" + pageCount, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsGettingUsers(false);
        console.log(result);
        setHasNextPage(result.has_next_page);
        if (result.has_next_page) {
          setPageCount((prevCount) => {
            return prevCount + 1;
          });
        }
        setUsers((prevUsers) => {
          return [...prevUsers, ...result.users];
        });
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (token) {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (token && users.length === 6 && hasNextPage) {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const [matches, setMatches] = useState([]);
  const [gettingMatches, setGettingMatches] = useState(false);

  const getMatches = () => {
    setGettingMatches(true);
    var newHeader = new Headers();
    newHeader.append("Accept", "application/json");
    newHeader.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: newHeader,
      redirect: "follow",
    };

    fetch(BASE_URL + "/api/matches", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setGettingMatches(false);
        if (result.success) {
          setMatches(result.matches);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (token) {
      getMatches();
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
    gettingMatches,
    matches,
    setMatches,
    getMatches,
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export default DatingContextProvider;

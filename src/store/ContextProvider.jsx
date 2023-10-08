import { useState, useEffect } from "react";
import context from "./context";

import BASE_URL from "../config";

const DatingContextProvider = (props) => {
  const token = sessionStorage.getItem("dateUserToken");
  const [tokenValue, setTokenValue] = useState(token || "");

  const [users, setUsers] = useState([]);
  const [isGettingUsers, setIsGettingUsers] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const getUsers = () => {
    setIsGettingUsers(true);
    var newHeader = new Headers();
    newHeader.append("Accept", "application/json");
    newHeader.append("Authorization", `Bearer ${tokenValue}`);

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
    if (tokenValue) {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenValue]);

  useEffect(() => {
    if (tokenValue && users.length === 6 && hasNextPage) {
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
    newHeader.append("Authorization", `Bearer ${tokenValue}`);

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
    if (tokenValue) {
      getMatches();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenValue]);

  const [profile, setProfile] = useState({});
  const [isGettingProfile, setIsGettingProfile] = useState(false);

  const getProfile = () => {
    setIsGettingProfile(true);
    var newHeader = new Headers();
    newHeader.append("Accept", "application/json");
    newHeader.append("Authorization", `Bearer ${tokenValue}`);

    var requestOptions = {
      method: "GET",
      headers: newHeader,
      redirect: "follow",
    };

    fetch(BASE_URL + "/api/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsGettingProfile(false);
        setProfile(result.user);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (tokenValue) {
      getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenValue]);

  const unmatchUser = (confirmation, id) => {
    console.log(confirmation, "confirmed");
    if (confirmation) {
      var newHeader = new Headers();
      newHeader.append("Accept", "application/json");
      newHeader.append("Content-Type", "application/json");
      newHeader.append("Authorization", `Bearer ${tokenValue}`);

      var raw = JSON.stringify({
        match_id: id,
      });

      var requestOptions = {
        method: "POST",
        headers: newHeader,
        body: raw,
        redirect: "follow",
      };

      fetch(BASE_URL + "/api/unmatch", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    }
  };

  // // // // // // // // // // // // //
  const value = {
    tokenValue,
    setTokenValue,
    isGettingUsers,
    users,
    setUsers,
    gettingMatches,
    matches,
    setMatches,
    getMatches,
    isGettingProfile,
    profile,
    setProfile,
    unmatchUser,
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export default DatingContextProvider;

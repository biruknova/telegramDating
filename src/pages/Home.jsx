import { useContext, useState } from "react";

import context from "../store/context";
import BASE_URL from "../config";

import ImagePreloader from "../components/ImagePreloader";
import ProfileCard from "../components/cards/profileCard";
import MatchPopUp from "../components/MatchPopUp";

import BadgeIcon from "../components/animatedIcons/Badge";

import SearchAnime from "../components/animatedIcons/SearchAnime";

const HomePage = () => {
  const { isGettingUsers, users, setUsers, token, matches, setMatches } =
    useContext(context);
  const index = 0;

  const [isMatched, setIsMatched] = useState(false);

  const showNext = () => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.slice(1);
      return updatedUsers;
    });
  };

  const closeMatchPopUp = () => {
    setIsMatched(false);
    showNext();
  };

  const like = (id, match) => {
    likeUser(id);

    if (match) {
      const matched = users.find((match) => match.id === id);
      setMatches(matched, ...matches);
      setIsMatched(true);
    } else {
      showNext();
    }
  };
  const dislike = (id) => {
    dislikeUser(id);
    showNext();
  };

  const allImageUrls = users.reduce((imageUrls, user) => {
    // Concatenate the user's photo URLs to the accumulator array
    return imageUrls.concat(user.photos);
  }, []);

  const colors = window.Telegram.WebApp.themeParams;

  const {
    secondary_bg_color: secondaryBgColor,
    text_color: txtColor,
    hint_color: hintColor,
    // button_color: btnColor,
  } = colors;

  const likeUser = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
      user_id: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + "/api/like", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const dislikeUser = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
      user_id: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + "/api/dislike", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {isMatched && (
        <MatchPopUp
          onShowProfile={closeMatchPopUp}
          onClose={closeMatchPopUp}
          matchImg={
            users[index].photos
              ? users[index].photos[index]
              : "https://picsum.photos/100"
          }
          matchName={users[index].name}
        />
      )}
      <ImagePreloader imageUrls={allImageUrls} />
      {isGettingUsers && users.length === 0 ? (
        <h1>getting users</h1>
      ) : users.length !== 0 ? (
        <ProfileCard
          name={users[index].name}
          age={users[index].age}
          bio={users[index].bio}
          imgs={
            users[index].photos
              ? users[index].photos
              : ["https://picsum.photos/200"]
          }
          id={users[index].id}
          likedYou={users[index].liked_you}
          onLike={like}
          onDislike={dislike}
          imgIndex={index}
          badge={<BadgeIcon />}
        />
      ) : (
        <div className="w-full flex flex-col items-center justify-center p-5">
          <div
            style={{ backgroundColor: secondaryBgColor }}
            className="w-full max-w-[400px] mx-auto my-auto rounded-lg flex flex-col items-center space-y-8 p-6 text-center shadow mt-16"
          >
            <div className="flex flex-col text-center space-y-1.5">
              <h1 style={{ color: txtColor }} className="text-xl font-bold">
                No One Is Avaliable
              </h1>
            </div>
            <SearchAnime />
            <p
              style={{ color: hintColor }}
              className="dark:drop-shadow text-sm"
            >
              No one is avaliable at the moment. please try again later
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;

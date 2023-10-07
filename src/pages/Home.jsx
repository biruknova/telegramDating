import { useContext } from "react";

import context from "../store/context";

import ProfileCard from "../components/cards/profileCard";
import ImagePreloader from "../components/ImagePreloader";

import BadgeIcon from "../components/animatedIcons/Badge";

import SearchAnime from "../components/animatedIcons/SearchAnime";

const HomePage = () => {
  const { isGettingUsers, users, setUsers } = useContext(context);
  const index = 0;

  const changePerson = () => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.slice(1);
      return updatedUsers;
    });
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

  return (
    <>
      <ImagePreloader imageUrls={allImageUrls} />
      {isGettingUsers && users.length === 0 ? (
        <h1>getting users</h1>
      ) : users.length !== 0 ? (
        <ProfileCard
          name={users[index].name}
          age={users[index].age}
          bio={users[index].bio}
          imgs={users[index].photos}
          onClick={changePerson}
          imgIndex={index}
          badge={<BadgeIcon />}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-5">
          <div
            style={{ backgroundColor: secondaryBgColor }}
            className="w-full mx-auto my-auto rounded-lg flex flex-col items-center space-y-6 p-6 text-center shadow"
          >
            <div className="flex flex-col text-center space-y-1.5">
              <h1 style={{ color: txtColor }} className="text-xl font-bold">
                No One Is Avaliable
              </h1>
              <p style={{ color: hintColor }} className="text-sm">
                No one is avaliable at the moment. please try again later
              </p>
            </div>
            <SearchAnime />
            <p style={{ color: hintColor }} className="font-medium text-sm">
              No one is avaliable at the moment. please try again later
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;

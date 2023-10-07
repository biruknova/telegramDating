import { useContext } from "react";

import context from "../store/context";

import ProfileCard from "../components/cards/profileCard";
import ImagePreloader from "../components/ImagePreloader";

import BadgeIcon from "../components/animatedIcons/Badge";

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

  return (
    <>
      <ImagePreloader imageUrls={allImageUrls} />
      {isGettingUsers ? (
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
        <h1>No Feed</h1>
      )}
    </>
  );
};

export default HomePage;

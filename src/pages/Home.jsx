import { useState, useContext } from "react";

import context from "../store/context";

import ProfileCard from "../components/cards/profileCard";

import BadgeIcon from "../components/animatedIcons/Badge";

const HomePage = () => {
  const { isGettingUsers, users } = useContext(context);
  const [index, setIndex] = useState(0);

  const changePerson = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      {isGettingUsers ? (
        <h1>getting users</h1>
      ) : users.length !== 0 ? (
        <ProfileCard
          name={users[index].name}
          age={users[index].age}
          bio={users[index].bio}
          imgs={users[index].photos}
          onClick={changePerson}
          badge={<BadgeIcon />}
        />
      ) : (
        <h1>No Feed</h1>
      )}
    </>
  );
};

export default HomePage;

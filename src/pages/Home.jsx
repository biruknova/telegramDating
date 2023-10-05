import { useState, useEffect } from "react";

import ProfileCard from "../components/cards/profileCard";

import dummyData from "../dummy";

import BadgeIcon from "../components/animatedIcons/Badge";

const HomePage = () => {
  const [index, setIndex] = useState(0);

  const changePerson = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      window.Telegram.WebApp.expand();
    }, 4000);
  }, []);
  return (
    <>
      <ProfileCard
        name={dummyData[index].name}
        age={dummyData[index].age}
        bio={dummyData[index].bio}
        img={dummyData[index].img}
        onClick={changePerson}
        badge={<BadgeIcon />}
      />
    </>
  );
};

export default HomePage;

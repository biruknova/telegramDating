import { useState } from "react";

import ProfileCard from "../components/cards/profileCard";

import dummyData from "../dummy";

const HomePage = () => {
  alert(window.Telegram.WebApp.colorScheme);
  const [index, setIndex] = useState(0);

  const changePerson = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };
  return (
    <>
      <ProfileCard
        name={dummyData[index].name}
        age={dummyData[index].age}
        bio={dummyData[index].bio}
        img={dummyData[index].img}
        onClick={changePerson}
      />
    </>
  );
};

export default HomePage;

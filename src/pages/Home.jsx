import { useState } from "react";

import ProfileCard from "../components/cards/profileCard";

import dummyData from "../dummy";

const HomePage = () => {
  const textColor = window.Telegram.WebApp.text_color;
  const hintColor = window.Telegram.WebApp.hint_color;

  alert(textColor, hintColor);
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
        textColor={textColor}
        hintColor={hintColor}
      />
    </>
  );
};

export default HomePage;

import { useState, useEffect } from "react";
import Lottie from "react-lottie-player";

import badgeJson from "../../assets/starBadge.json";

const BadgeIcon = () => {
  const [playAnime, setPlayAnime] = useState(false);

  const handleAnime = () => {
    setPlayAnime(true);
    setTimeout(() => {
      setPlayAnime(false);
    }, 1500);
  };

  useEffect(() => {
    setPlayAnime(true);
    setTimeout(() => {
      setPlayAnime(false);
    }, 1500);
  }, []);

  return (
    <div onClick={handleAnime}>
      <Lottie
        loop={playAnime}
        animationData={badgeJson}
        play
        style={{ width: 30, height: 30 }}
      />
    </div>
  );
};

export default BadgeIcon;

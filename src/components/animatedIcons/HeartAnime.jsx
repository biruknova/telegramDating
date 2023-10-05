import Lottie from "react-lottie-player";

import heartTgs from "../../assets/telegram-animoji.json";

const HeartAnime = () => {
  return (
    <Lottie
      loop
      animationData={heartTgs}
      play
      style={{ width: 60, height: 60 }}
    />
  );
};

export default HeartAnime;

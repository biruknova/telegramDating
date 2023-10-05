import Lottie from "react-lottie-player";

import heartTgs from "../../assets/telegram-animoji.json";

const HeartAnime = () => {
  return (
    <Lottie
      loop
      animationData={heartTgs}
      play
      style={{ width: 70, height: 70 }}
    />
  );
};

export default HeartAnime;

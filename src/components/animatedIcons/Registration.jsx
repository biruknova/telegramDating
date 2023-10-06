import Lottie from "react-lottie-player";

import signupJson from "../../assets/signup.json";

const RegistrationAnime = () => {
  return (
    <Lottie
      loop
      animationData={signupJson}
      play
      style={{ width: 80, height: 80 }}
    />
  );
};

export default RegistrationAnime;

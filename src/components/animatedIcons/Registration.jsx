import Lottie from "react-lottie-player";

import signupJson from "../../assets/signup.json";

const RegistrationAnime = () => {
  return (
    <Lottie
      loop
      animationData={signupJson}
      play
      style={{ width: 60, height: 60 }}
    />
  );
};

export default RegistrationAnime;

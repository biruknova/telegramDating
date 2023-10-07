import Lottie from "react-lottie-player";

import searchJson from "../../assets/search.json";

const SearchAnime = () => {
  return (
    <Lottie
      loop
      animationData={searchJson}
      play
      style={{ width: 100, height: 100 }}
    />
  );
};

export default SearchAnime;

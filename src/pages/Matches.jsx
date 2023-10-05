import MatchCard from "../components/cards/MatchCard";
import dummyData from "../dummy";

import HeartAnime from "../components/animatedIcons/HeartAnime";

const MatchesPage = () => {
  const colors = window.Telegram.WebApp.themeParams;

  const {
    secondary_bg_color: secondaryBgColor,
    text_color: txtColor,
    hint_color: hintColor,
  } = colors;
  return (
    <div className="flex flex-col w-full pb-3 ">
      <div className="w-full flex flex-col justify-center items-center py-5 space-y-5">
        <div
          style={{ backgroundColor: secondaryBgColor }}
          className="rounded-full p-4"
        >
          <HeartAnime />
        </div>
        <div className="flex flex-col space-y-2 items-center text-center w-[80%]">
          <h1 style={{ color: txtColor }} className="text-2xl font-semibold">
            People You've Matched
          </h1>
          <p style={{ color: hintColor }} className="text-sm">
            This are people that you have matched with. Reach out and connect
            with them.
          </p>
        </div>
      </div>
      {dummyData.map((match, index) => {
        return (
          <MatchCard
            key={match.id}
            name={match.name}
            age={match.age}
            img={match.img}
            style={
              index === dummyData.length - 1
                ? ""
                : "border-b border-slate-100 dark:border-black/20"
            }
          />
        );
      })}
    </div>
  );
};

export default MatchesPage;

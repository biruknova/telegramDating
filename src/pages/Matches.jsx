import { useContext, useEffect } from "react";
import context from "../store/context";

import MatchCard from "../components/cards/MatchCard";

import HeartAnime from "../components/animatedIcons/HeartAnime";

const MatchesPage = () => {
  const { gettingMatches, matches, getMatches } = useContext(context);

  const colors = window.Telegram.WebApp.themeParams;

  const {
    secondary_bg_color: secondaryBgColor,
    text_color: txtColor,
    hint_color: hintColor,
    button_color: btnColor,
  } = colors;

  useEffect(() => {
    if (matches.length === 0) {
      getMatches();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col w-full pb-3">
      <div className="w-full flex flex-col justify-center items-center pt-10 pb-5 space-y-6">
        <div
          style={{ backgroundColor: secondaryBgColor }}
          className="rounded-full p-5"
        >
          <HeartAnime />
        </div>
        <div className="flex flex-col space-y-1.5 items-center text-center w-[85%]">
          <h1 style={{ color: txtColor }} className="text-2xl font-semibold">
            People You've Matched
          </h1>
          <p style={{ color: hintColor }} className="text-sm">
            This are people that you have matched with. Reach out and connect
            with them.
          </p>
        </div>
      </div>

      <div
        style={{ backgroundColor: secondaryBgColor }}
        className="h-[15px] w-full mt-6"
      />

      {gettingMatches && matches.length === 0 ? (
        <div className="w-full flex justify-center mt-16">
          <div
            style={{ borderTop: `2px solid ${btnColor}` }}
            className="w-[40px] h-[40px] rounded-full animate-spin"
          ></div>
        </div>
      ) : matches.length !== 0 ? (
        matches.map((match, index) => {
          return (
            <MatchCard
              key={match.id}
              name={match.name}
              age={match.age}
              img={match.photos ? match.photos[0] : "https://picsum.photos/200"}
              id={match.id}
              isPremium={match.has_telegram_premium}
              style={
                index === matches.length - 1
                  ? ""
                  : "border-b border-slate-100 dark:border-black/20"
              }
            />
          );
        })
      ) : (
        <div
          style={{ color: hintColor }}
          className="mt-12 w-full flex justify-center text-lg "
        >
          No Matches !
        </div>
      )}
    </div>
  );
};

export default MatchesPage;

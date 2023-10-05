import MatchCard from "../components/cards/MatchCard";
import dummyData from "../dummy";

import HeartAnime from "../components/animatedIcons/HeartAnime";

const MatchesPage = () => {
  const colors = window.Telegram.WebApp.themeParams;

  const { secondary_bg_color: secondaryBgColor } = colors;
  return (
    <div className="flex flex-col w-full pb-3 ">
      <div className="w-full flex justify-center items-center py-5">
        <div
          style={{ backgroundColor: secondaryBgColor }}
          className="rounded-full p-4"
        >
          <HeartAnime />
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

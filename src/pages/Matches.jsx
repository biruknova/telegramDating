import MatchCard from "../components/cards/MatchCard";
import dummyData from "../dummy";

const MatchesPage = () => {
  return (
    <div className="flex flex-col w-full pb-3">
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

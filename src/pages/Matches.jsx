import MatchCard from "../components/cards/MatchCard";

const MatchesPage = () => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <MatchCard name="Biruk K." age="25" />
      <MatchCard name="Biruk K." age="25" />
      <MatchCard name="Biruk K." age="25" />
    </div>
  );
};

export default MatchesPage;

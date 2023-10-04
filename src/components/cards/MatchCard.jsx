const MatchCard = ({ name, age }) => {
  return (
    <div className="w-full rounded-md flex items-center shadow py-2 space-x-5 ">
      <div className="w-[60px] h-[60px] bg-white rounded-full"></div>
      <div className="text-white">
        <h1 className=" text-lg font-medium">{name}</h1>
        <p className="text-sm">Age: {age}</p>
      </div>
    </div>
  );
};

export default MatchCard;

const MatchCard = ({ name, age, img, style }) => {
  return (
    <div className="w-full flex items-center space-x-5">
      <div className="w-[60px] h-[60px] bg-black rounded-full ml-3 overflow-hidden">
        <img src={img} alt="matched person" />
      </div>
      <div
        className={`text-white flex flex-grow flex-col  py-2 justify-center ${style} pr-3`}
      >
        <div className=" h-[60px] w-full">
          <h1 className=" text-lg font-medium">{name}</h1>
          <p className="text-sm">Age: {age}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;

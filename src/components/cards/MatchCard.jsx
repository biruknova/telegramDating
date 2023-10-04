const MatchCard = ({ name, age }) => {
  return (
    <div className="w-full rounded-md flex items-center  bg-[#273552] shadow p-3 space-x-5 ">
      <div className="w-[80px] h-[80px] bg-white rounded-full"></div>
      <div className="text-white">
        <h1 className=" text-xl font-medium">{name}</h1>
        <p>Age: {age}</p>
      </div>
    </div>
  );
};

export default MatchCard;

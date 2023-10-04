import CloseIcon from "../icons/Close";
import HeartIcon from "../icons/Heart";

const ProfileCard = ({ name, age, bio, img, onClick }) => {
  return (
    <section className="w-full max-w-[500px]   mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center  rounded-md overflow-hidden bg-white dark:bg-[#273552]">
        <div className="w-full flex flex-col space-y-5">
          <div className="w-full rounded overflow-hidden relative">
            <img src={img} alt="profile" className="w-full" />
            <div className="flex flex-col items-start text-white absolute bottom-0 left-0 p-4 bg-gradient-to-b from-transparent via-black/40 to-black/60 w-full">
              <h1 className="text-2xl font-medium drop-shadow">{name}</h1>
              <h2 className="drop-shadow font-semibold">Age: {age}</h2>
            </div>
          </div>
          <div className="px-4 flex flex-col w-full space-y-1">
            <p className="text-white">{bio}</p>
            <h1 className="text-gray-500">Bio</h1>
          </div>
        </div>

        <div className="flex space-x-4 mt-6 p-5 w-full">
          <button
            onClick={onClick}
            className="w-1/2 h-[50px] rounded bg-[#D70240] flex justify-center items-center"
          >
            <CloseIcon styles="w-7 h-7 text-white" />
          </button>
          <button
            onClick={onClick}
            className="w-1/2 h-[50px] rounded bg-[#02BF96] flex justify-center items-center"
          >
            <HeartIcon styles="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;

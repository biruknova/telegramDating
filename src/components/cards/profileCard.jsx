import { useState } from "react";

import CloseIcon from "../icons/Close";
import HeartIcon from "../icons/Heart";

// Function to add IDs to elements
function addIdsToElements(elements) {
  return elements.map((element) => ({
    id: generateUniqueId(),
    value: element,
  }));
}

// Function to generate a unique ID (You can use any method you prefer)
function generateUniqueId() {
  return Math.random().toString(36).substring(2);
}

const ProfileCard = ({ name, age, bio, imgs, onClick, badge, imgIndex }) => {
  const images = addIdsToElements(imgs);

  const [indicatorPosition, setIndicatorPosition] = useState(imgIndex);

  const leftClick = () => {
    setIndicatorPosition((prevPos) => {
      if (prevPos === 0) {
        return images.length - 1;
      } else {
        return prevPos - 1;
      }
    });
  };

  const rightClick = () => {
    setIndicatorPosition((prevPos) => {
      if (prevPos === images.length - 1) {
        return 0;
      } else {
        return prevPos + 1;
      }
    });
  };
  return (
    <section className="w-full mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center  rounded-md overflow-hidden space-y-4 w-full">
        <div className="w-full flex flex-col space-y-5">
          <div
            style={{ height: "100vw" }}
            className="w-full relative max-h-[600px]"
          >
            {images.length > 1 && (
              <div className="absolute top-0 left-0 h-[50px] bg-gradient-to-t from-transparent via-black/20 to-black/40 w-full"></div>
            )}
            <div className="absolute top-3 w-full flex space-x-1 px-2">
              {images.length > 1 &&
                images.map((item) => {
                  return (
                    <div
                      key={item.id}
                      id={item.id}
                      style={{
                        width: `${100 / images.length}%`,
                        backgroundColor:
                          images[indicatorPosition].id === item.id
                            ? "#ffffff"
                            : "#ffffff61",
                      }}
                      className="h-[2.5px] rounded-full transition-colors duration-200"
                    ></div>
                  );
                })}
            </div>
            {images.length > 1 && (
              <div className="w-full h-full absolute top-0 left-0 grid grid-cols-2">
                <div onClick={leftClick} className="bg-transparent"></div>
                <div onClick={rightClick} className="bg-transparent"></div>
              </div>
            )}
            <img
              src={images[indicatorPosition].value}
              alt="profile"
              className="w-full"
            />
            <div className="flex flex-col items-start text-white absolute bottom-0 left-0 p-4 bg-gradient-to-b from-transparent via-black/40 to-black/60 w-full">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-medium drop-shadow">{name}</h1>
                {badge}
              </div>
              <h2 className="drop-shadow font-semibold">Age: {age}</h2>
            </div>
          </div>
          <div className="px-4 flex flex-col w-full space-y-1 text-sm">
            <p className={`text-gray-700 dark:text-white`}>{bio}</p>
            <h1 className={`text-gray-400 text-xs`}>Bio</h1>
          </div>
        </div>
        <div className="px-4 w-full">
          <hr className="border-t border-slate-100 dark:border-black/20 w-full" />
        </div>

        <div className="flex space-x-4 px-4 w-full">
          <button
            onClick={onClick}
            className="w-1/2 h-[45px] rounded bg-[#D70240] flex justify-center items-center"
          >
            <CloseIcon styles="w-7 h-7 text-white" />
          </button>
          <button
            onClick={onClick}
            className="w-1/2 h-[45px] rounded bg-[#02BF96] flex justify-center items-center"
          >
            <HeartIcon styles="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;

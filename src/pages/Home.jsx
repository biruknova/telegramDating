import { useContext } from "react";

import context from "../store/context";

import ProfileCard from "../components/cards/profileCard";
import ImagePreloader from "../components/ImagePreloader";

import BadgeIcon from "../components/animatedIcons/Badge";

const HomePage = () => {
  const { isGettingUsers, users, setUsers } = useContext(context);
  const index = 0;

  const changePerson = () => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.slice(1);
      return updatedUsers;
    });
  };

  const allImageUrls = users.reduce((imageUrls, user) => {
    // Concatenate the user's photo URLs to the accumulator array
    return imageUrls.concat(user.photos);
  }, []);

  return (
    <>
      <ImagePreloader imageUrls={allImageUrls} />
      {isGettingUsers ? (
        <h1>getting users</h1>
      ) : users.length !== 0 ? (
        <ProfileCard
          name={users[index].name}
          age={users[index].age}
          bio={users[index].bio}
          imgs={users[index].photos}
          onClick={changePerson}
          imgIndex={index}
          badge={<BadgeIcon />}
        />
      ) : (
        <div className="w-full mx-auto my-auto bg-gray-900  rounded-lg flex flex-col items-center space-y-6 p-5 text-center">
          <h1 className="text-xl font-bold">No One Is Avaliable</h1>
          <p>No one is avaliable at the moment. please try again later</p>
        </div>
      )}
    </>
  );
};

export default HomePage;

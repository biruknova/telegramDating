import { useContext } from "react";

import context from "../store/context";

import ProfileCard from "../components/cards/profileCard";

import BadgeIcon from "../components/animatedIcons/Badge";

const HomePage = () => {
  const { isGettingUsers, users, setUsers } = useContext(context);
  const index = 0;

  const changePerson = () => {
    if (users.length > 0) {
      setUsers((prevUsers) => {
        // Create a new array without the first item
        const updatedUsers = prevUsers.slice(1);
        // Update the users state with the new array
        return updatedUsers;
      });
    }
  };

  return (
    <>
      {isGettingUsers ? (
        <h1>getting users</h1>
      ) : users.length !== 0 ? (
        <ProfileCard
          name={users[index].name}
          age={users[index].age}
          bio={users[index].bio}
          imgs={users[index].photos}
          onClick={changePerson}
          badge={<BadgeIcon />}
        />
      ) : (
        <h1>No Feed</h1>
      )}
    </>
  );
};

export default HomePage;

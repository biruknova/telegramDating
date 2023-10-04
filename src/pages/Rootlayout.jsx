import { Outlet, NavLink } from "react-router-dom";

import HomeIcon from "../components/icons/Home";
import HeartIcon from "../components/icons/Heart";
import PersonIcon from "../components/icons/Person";

const Rootlayout = () => {
  const bgColor = window.Telegram.WebApp.bg_color;

  const data = window.Telegram.WebApp;
  console.log("initData", data.initData);
  console.log("initDataUnsafe", data.initDataUnsafe);

  const queryString = window.Telegram.WebApp.initData;
  console.log(queryString);
  const decoded = decodeURIComponent(queryString);
  console.log(decoded);

  const activeClass =
    "flex flex-col items-center space-y-1.5 w-1/3 text-black dark:text-red-500";
  const inActiveClass =
    "flex flex-col items-center space-y-1.5 w-1/3 text-gray-500 dark:text-white";

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[600px] mx-auto">
      <div className={`flex-grow bg-[${bgColor}]`}>
        <Outlet />
      </div>

      <div
        className={`w-full py-2 text-gray-500 dark:text-white text-xs bg-white/50 dark:bg-black/5 backdrop-blur-md w-full flex items-center sticky bottom-0 `}
      >
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending || isActive ? activeClass : inActiveClass
          }
          end
        >
          <HomeIcon styles="w-5 h-5" />
          <h1>Home</h1>
        </NavLink>
        <NavLink
          to="/matches"
          className={({ isActive, isPending }) =>
            isPending || isActive ? activeClass : inActiveClass
          }
          end
        >
          <HeartIcon styles="w-5 h-5" />
          <h1>Matches</h1>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive, isPending }) =>
            isPending || isActive ? activeClass : inActiveClass
          }
          end
        >
          <PersonIcon styles="w-5 h-5" />
          <h1>Profile</h1>
        </NavLink>
      </div>
    </div>
  );
};

export default Rootlayout;

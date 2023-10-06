import { Outlet, NavLink, useLocation } from "react-router-dom";

import HomeIcon from "../components/icons/Home";
import HeartIcon from "../components/icons/Heart";
import PersonIcon from "../components/icons/Person";

const Rootlayout = () => {
  const colors = window.Telegram.WebApp.themeParams;

  const {
    bg_color: bgColor,
    text_color: txtColor,
    hint_color: hintColor,
    button_color: btnColor,
    button_text_color: btnTxtColor,
  } = colors;

  console.log("colors", txtColor, hintColor, btnTxtColor);

  const location = useLocation();
  const hideBottomNav =
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/login");

  console.log(
    location.pathname.startsWith("/signup"),
    location.pathname.startsWith("/login"),
    window.location.pathname
  );

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[600px] mx-auto">
      <div
        style={{ backgroundColor: bgColor }}
        className={`flex-grow bg-[${bgColor}]`}
      >
        <Outlet />
      </div>

      {hideBottomNav && (
        <div
          style={{ backgroundColor: bgColor }}
          className={`w-full py-2 text-gray-500 dark:text-white text-xs bg-[${bgColor}] border-t dark:border-black/10 border-slate-100 w-full flex items-center sticky bottom-0 `}
        >
          <NavLink
            to="/home"
            className="flex flex-col items-center space-y-1.5 w-1/3"
            style={({ isActive }) => ({
              color: isActive ? btnColor : hintColor,
            })}
            end
          >
            <HomeIcon styles="w-5 h-5" />
            <h1>Home</h1>
          </NavLink>
          <NavLink
            to="/matches"
            className="flex flex-col items-center space-y-1.5 w-1/3"
            style={({ isActive }) => ({
              color: isActive ? btnColor : hintColor,
            })}
            end
          >
            <HeartIcon styles="w-5 h-5" />
            <h1>Matches</h1>
          </NavLink>
          <NavLink
            to="/profile"
            className="flex flex-col items-center space-y-1.5 w-1/3"
            style={({ isActive }) => ({
              color: isActive ? btnColor : hintColor,
            })}
            end
          >
            <PersonIcon styles="w-5 h-5" />
            <h1>Profile</h1>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Rootlayout;

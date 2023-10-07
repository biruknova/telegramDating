import { useContext } from "react";

import context from "../store/context";

const ProfilePage = () => {
  const colors = window.Telegram.WebApp.themeParams;

  const {
    bg_color: bgColor,
    text_color: txtColor,
    hint_color: hintColor,
    // button_color: btnColor,
    secondary_bg_color: secondaryBgColor,
  } = colors;

  const { isGettingProfile, profile } = useContext(context);

  return (
    <div
      style={{ backgroundColor: secondaryBgColor }}
      className=" w-full min-h-screen flex flex-grow pt-[130px] z-50"
    >
      <div
        style={{ backgroundColor: bgColor }}
        className="w-full flex flex-col flex-grow rounded-t-xl"
      >
        {!isGettingProfile && (
          <div className="-mt-[50px] flex flex-col items-center space-y-6 w-full">
            <div className="flex flex-col items-center space-y-2 w-full">
              <div
                style={{ border: `5px solid ${secondaryBgColor}` }}
                className="rounded-full w-[130px] h-[130px] rounded-full bg-red-200 overflow-hidden"
              >
                <img
                  src={
                    profile && profile.photos
                      ? profile.photos[0]
                      : "https://picsum.photos/200"
                  }
                  alt="profile profile"
                />
              </div>
              <div className="flex flex-col space-y-1.5 items-center text-center w-[85%]">
                <h1
                  style={{ color: txtColor }}
                  className="text-xl font-semibold min-w-max"
                >
                  {profile ? profile.name : ""}
                </h1>
              </div>
            </div>
            <div
              style={{ color: txtColor }}
              className="w-full flex flex-col divide-y dark:divide-black/30 divid-slate-100 pl-5 text-sm mt-3"
            >
              {profile && profile.tg_username && (
                <div className="pr-5 py-3 space-y-1 text-start">
                  <h1>@{profile.tg_username}</h1>
                  <p style={{ color: hintColor }} className="text-xs">
                    Username
                  </p>
                </div>
              )}
              {profile && profile.bio && (
                <div className="pr-5 py-3 space-y-1 text-start">
                  <h1>{profile.bio}</h1>
                  <p style={{ color: hintColor }} className="text-xs">
                    Bio
                  </p>
                </div>
              )}
              {profile && profile.age && (
                <div className="pr-5 py-3 space-y-1 text-start">
                  <h1>{profile.age}</h1>
                  <p style={{ color: hintColor }} className="text-xs">
                    Age
                  </p>
                </div>
              )}
              {profile && profile.gender && (
                <div className="pr-5 py-3 space-y-1 text-start">
                  <h1>{profile.gender.name} </h1>
                  <p style={{ color: hintColor }} className="text-xs">
                    Gender
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilePage;

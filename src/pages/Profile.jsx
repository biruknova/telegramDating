import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import context from "../store/context";
import BASE_URL from "../config";

import BadgeIcon from "../components/animatedIcons/Badge";
import PenIcon from "../components/icons/Pen";

import manPlaceHolderImg from "../assets/man_placeholder.jpg";
import womanPlaceHolderImg from "../assets/woman_placeholder.jpg";

const ProfilePage = () => {
  const colors = window.Telegram.WebApp.themeParams;

  const {
    bg_color: bgColor,
    text_color: txtColor,
    hint_color: hintColor,
    button_color: btnColor,
    secondary_bg_color: secondaryBgColor,
  } = colors;

  const { isGettingProfile, profile, tokenValue } = useContext(context);

  const [isFetching, setIsFetching] = useState(false);
  const [isProUser, setIsProUser] = useState(profile.is_pro_user);

  const UpgradeToPro = () => {
    setIsFetching(true);
    var newHeader = new Headers();
    newHeader.append("Accept", "application/json");
    newHeader.append("Authorization", `Bearer ${tokenValue}`);

    var requestOptions = {
      method: "POST",
      headers: newHeader,
      redirect: "follow",
    };

    fetch(BASE_URL + "/api/generate-invoice", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsFetching(false);
        if (result.success) {
          window.Telegram.WebApp.openInvoice(result.payment_url, (res) => {
            console.log(res);

            if (res === "paid") {
              setIsProUser(true);
              window.Telegram.WebApp.showPopup({
                title: "Welcome to Pro",
                message:
                  "You have upgraded to dating pro. your payment has been received",
                buttons: [{ type: "close", text: "Close" }],
              });
            } else if (res === "cancelled") {
              window.Telegram.WebApp.showPopup({
                title: "Not Paid",
                message: "You have aborted the payment process",
                buttons: [{ type: "close", text: "Close" }],
              });
            }
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div
      style={{ backgroundColor: secondaryBgColor }}
      className="w-full flex flex-grow  pt-[130px] z-50"
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
                className=" relative rounded-full w-[130px] h-[130px] rounded-full bg-slate-100"
              >
                <img
                  src={
                    profile
                      ? profile.photos
                        ? profile.photos[0]
                        : profile.gender.id === 1
                        ? manPlaceHolderImg
                        : womanPlaceHolderImg
                      : ""
                  }
                  alt="profile profile"
                  className="rounded-full"
                />

                <Link
                  to="/edit-profile"
                  style={{
                    border: `3px solid ${secondaryBgColor}`,
                    backgroundColor: bgColor,
                    color: btnColor,
                  }}
                  className="w-[30px] h-[30px] rounded-full absolute z-[999] top-1 right-1  flex items-center justify-center"
                >
                  <PenIcon styles="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-col space-y-1.5 items-center text-center w-[85%]">
                <div className="flex items-center space-x-1">
                  <h1
                    style={{ color: txtColor }}
                    className="text-xl font-semibold min-w-max"
                  >
                    {profile ? profile.name : ""}
                  </h1>
                  {profile.has_telegram_premium && <BadgeIcon />}
                  {isProUser && (
                    <div className="px-3 bg-yellow-500 text-black text-xs py-0.5 rounded-full">
                      Pro
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{ color: txtColor }}
              className="w-full flex flex-col divide-y dark:divide-black/30 divid-slate-100 pl-5 text-base mt-3"
            >
              {profile && profile.tg_username && (
                <div className="pr-5 py-3 space-y-1 text-start">
                  <h1>@{profile.tg_username}</h1>
                  <p style={{ color: hintColor }} className="text-xs">
                    Username
                  </p>
                </div>
              )}

              {profile.bio ? (
                <div className="pr-5 py-3 space-y-1 text-start">
                  <h1>Bio</h1>
                  <p style={{ color: hintColor }} className="text-xs">
                    {profile.bio}
                  </p>
                </div>
              ) : (
                <Link
                  to="/edit-profile"
                  className="pr-5 py-3 space-y-1 text-start"
                >
                  <h1>Bio</h1>
                  <p style={{ color: hintColor }} className="text-xs">
                    {profile.bio
                      ? profile.bio
                      : "Add a few words about yourself."}
                  </p>
                </Link>
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
            {!isProUser && (
              <div className="w-full px-3">
                <button
                  onClick={UpgradeToPro}
                  disabled={isFetching}
                  className="bg-blue-500 text-white p-2 w-full"
                >
                  {isFetching ? "wait ..." : "Upgrade"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilePage;

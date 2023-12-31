import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import context from "../store/context";

import ChatIcon from "../components/icons/Chat";
import UnmatchIcon from "../components/icons/Unmatch";
import BadgeIcon from "../components/animatedIcons/Badge";

import manPlaceHolderImg from "../assets/man_placeholder.jpg";
import womanPlaceHolderImg from "../assets/woman_placeholder.jpg";

const MatchProfile = () => {
  const navigate = useNavigate();

  const BackButton = window.Telegram.WebApp.BackButton;

  BackButton.show();

  useEffect(() => {
    const handleBack = () => {
      navigate("/matches");
    };

    BackButton.onClick(handleBack);

    // Clean up the event listener when the component unmounts
    return () => {
      BackButton.offClick(handleBack);
      BackButton.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colors = window.Telegram.WebApp.themeParams;

  const {
    bg_color: bgColor,
    text_color: txtColor,
    hint_color: hintColor,
    button_color: btnColor,
    secondary_bg_color: secondaryBgColor,
  } = colors;

  const { matches, setMatches, unmatchUser } = useContext(context);

  const params = useParams();
  const matchId = params.matchId;

  const match = matches.find((match) => match.id === Number(matchId));

  const ShowConfirmation = () => {
    window.Telegram.WebApp.showConfirm(
      "Unmatch with " + match.name,
      (confirmation) => {
        if (confirmation) {
          const updatedMatches = matches.filter(
            (m) => m.id !== Number(match.id)
          );
          setMatches(updatedMatches);
          navigate("/matches");
        }
        unmatchUser(confirmation, match.match_id);
      }
    );
  };

  const placeHolderImg =
    match.gender.id === 1 ? manPlaceHolderImg : womanPlaceHolderImg;

  const [showSnackBar, setShowSnackBar] = useState(false);

  const showNoUsername = () => {
    setShowSnackBar(true);
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
    setTimeout(() => {
      setShowSnackBar(false);
    }, 1500);
  };

  return (
    <div
      style={{ backgroundColor: secondaryBgColor }}
      className=" w-full min-h-screen flex flex-grow pt-[80px] z-50"
    >
      <div
        style={{ backgroundColor: bgColor }}
        className="w-full flex flex-col flex-grow rounded-t-xl "
      >
        <div className="-mt-[50px] flex flex-col items-center space-y-6 w-full">
          <div className="flex flex-col items-center space-y-2 w-full">
            <div
              style={{ border: `5px solid ${secondaryBgColor}` }}
              className="rounded-full w-[130px] h-[130px] rounded-full bg-red-200 overflow-hidden"
            >
              <img
                src={match && match.photos ? match.photos[0] : placeHolderImg}
                alt="match profile"
              />
            </div>
            <div className="flex flex-col space-y-1.5 items-center text-center w-[85%]">
              <div className="flex items-center space-x-2">
                <h1
                  style={{ color: txtColor }}
                  className="text-xl font-semibold min-w-max"
                >
                  {match ? match.name : ""}
                </h1>{" "}
                {match.has_telegram_premium && <BadgeIcon />}
              </div>
            </div>
          </div>
          <div className="w-full flex text-sm font-medium">
            {match.tg_username ? (
              <a
                href={`tg://resolve?domain=${match.tg_username}`}
                target="_blank"
                rel="noopener noreferrer"
                class="text-entity-link"
                dir="auto"
                data-entity-type="MessageEntityUrl"
                style={{ color: btnColor }}
                className="flex flex-col items-center w-1/2"
              >
                <ChatIcon styles="w-6 h-6" />
                <h1>Message</h1>
              </a>
            ) : (
              <div
                style={{ color: btnColor }}
                onClick={showNoUsername}
                className="flex flex-col items-center w-1/2 relative"
              >
                <ChatIcon styles="w-6 h-6" />
                <h1>Message</h1>
              </div>
            )}
            <div
              onClick={ShowConfirmation}
              className="flex flex-col items-center w-1/2 text-red-500"
            >
              <UnmatchIcon styles="w-6 h-6" />
              <h1>Unmatch</h1>
            </div>
          </div>
          <div
            style={{ color: txtColor }}
            className="w-full flex flex-col divide-y dark:divide-black/30 divid-slate-100 pl-5 text-base mt-3"
          >
            {match && match.tg_username ? (
              <div className="pr-5 py-3 space-y-1 text-start">
                <h1>@{match.tg_username}</h1>
                <p style={{ color: hintColor }} className="text-sm">
                  Username
                </p>
              </div>
            ) : (
              <div className="pr-5 py-3 space-y-1 text-start">
                <h1>Username</h1>
                <p style={{ color: hintColor }} className="text-sm">
                  This account does not have a username.
                </p>
              </div>
            )}
            {match && match.bio && (
              <div className="pr-5 py-3 space-y-1 text-start">
                <h1>{match.bio}</h1>
                <p style={{ color: hintColor }} className="text-sm">
                  Bio
                </p>
              </div>
            )}
            {match && match.age && (
              <div className="pr-5 py-3 space-y-1 text-start">
                <h1>{match.age}</h1>
                <p style={{ color: hintColor }} className="text-sm">
                  Age
                </p>
              </div>
            )}
            {match && match.gender && (
              <div className="pr-5 py-3 space-y-1 text-start">
                <h1>{match.gender.name} </h1>
                <p style={{ color: hintColor }} className="text-sm">
                  Gender
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showSnackBar && (
        <div className="w-full px-1.5 absolute bottom-1.5 transition-all duration-200">
          <div
            style={{ backgroundColor: btnColor }}
            className="w-full p-3 text-sm rounded text-white"
          >
            This account doesn't have a username.
          </div>
        </div>
      )}
    </div>
  );
};
export default MatchProfile;

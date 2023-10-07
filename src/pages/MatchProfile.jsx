import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ChatIcon from "../components/icons/Chat";
import UnmatchIcon from "../components/icons/Unmatch";

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
    // button_text_color: btnTxtColor,
    secondary_bg_color: secondaryBgColor,
  } = colors;
  return (
    <div
      style={{ backgroundColor: secondaryBgColor }}
      className=" w-full min-h-screen flex flex-grow pt-[130px] z-50"
    >
      <div
        style={{ backgroundColor: bgColor }}
        className="w-full flex flex-col flex-grow rounded-t-xl"
      >
        <div className="-mt-[50px] flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div
              style={{ border: `5px solid ${secondaryBgColor}` }}
              className="rounded-full w-[130px] h-[130px] rounded-full bg-red-200"
            ></div>
            <div className="flex flex-col space-y-1.5 items-center text-center w-[85%]">
              <h1
                style={{ color: txtColor }}
                className="text-2xl font-semibold"
              >
                Biruk K.
              </h1>
            </div>
          </div>
          <div className="w-full flex text-sm font-medium">
            <div
              style={{ color: btnColor }}
              className="flex flex-col items-center w-1/2"
            >
              <ChatIcon styles="w-6 h-6" />
              <h1>Message</h1>
            </div>
            <div
              style={{ color: btnColor }}
              className="flex flex-col items-center w-1/2"
            >
              <UnmatchIcon styles="w-6 h-6" />
              <h1>Unmatch</h1>
            </div>
          </div>
          <div
            style={{ color: txtColor }}
            className="w-full flex flex-col divide-y dark:divide-black/30 divid-slate-100 pl-5 text-sm mt-3"
          >
            <div className="pr-5 py-3 space-y-1 text-start">
              <h1>this is a test text for ui observation</h1>
              <p style={{ color: hintColor }} className="text-xs">
                Bio
              </p>
            </div>
            <div className="pr-5 py-3 space-y-1 text-start">
              <h1>this is a test text for ui observation</h1>
              <p style={{ color: hintColor }} className="text-xs">
                Bio
              </p>
            </div>
            <div className="pr-5 py-3 space-y-1 text-start">
              <h1>this is a test text for ui observation</h1>
              <p style={{ color: hintColor }} className="text-xs">
                Bio
              </p>
            </div>
            <div className="pr-5 py-3 space-y-1 text-start">
              <h1>this is a test text for ui observation</h1>
              <p style={{ color: hintColor }} className="text-xs">
                Bio
              </p>
            </div>
            <div className="pr-5 py-3 space-y-1 text-start">
              <h1>this is a test text for ui observation</h1>
              <p style={{ color: hintColor }} className="text-xs">
                Bio
              </p>
            </div>
            <div className="pr-5 py-3 space-y-1 text-start">
              <h1>this is a test text for ui observation</h1>
              <p style={{ color: hintColor }} className="text-xs">
                Bio
              </p>
            </div>
            <div className="pr-5 py-3 space-y-1 text-start">
              <h1>this is a test text for ui observation</h1>
              <p style={{ color: hintColor }} className="text-xs">
                Bio
              </p>
            </div>
            <div className="pr-5 py-3 space-y-1 text-start">
              <h1>this is a test text for ui observation</h1>
              <p style={{ color: hintColor }} className="text-xs">
                Bio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MatchProfile;

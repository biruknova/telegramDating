const MatchPopUp = ({ matchImg, matchName, onShowProfile, onClose }) => {
  const colors = window.Telegram.WebApp.themeParams;

  const {
    bg_color: bgColor,
    text_color: txtColor,
    hint_color: hintColor,
    button_color: btnColor,
    button_text_color: btnTxtColor,
    secondary_bg_color: secondaryBgColor,
  } = colors;

  return (
    <div className="fixed w-full flex items-center justify-center min-h-screen top-0 left-0 backdrop-blur-sm bg-black/10 flex flex-grow  p-5 z-50">
      <div
        onClick={onClose}
        className="absolute top-0 left-0 min-h-screen w-full bg-transparent z-0"
      ></div>
      <div
        style={{ backgroundColor: secondaryBgColor }}
        className="rounded-lg  w-full max-w-[400px] flex flex-col items-center p-10 space-y-12 z-10 shadow"
      >
        <div className="text-center space-y-2">
          <h1 style={{ color: txtColor }} className="text-2xl font-medium ">
            It's a Match !
          </h1>
          <p style={{ color: hintColor }} className="text-sm">
            You and {matchName} are a match. Click on 'profile' to chat .
          </p>
        </div>
        <div className="flex ">
          <div className="w-[100px] h-[100px] rounded-full border-2 border-gray-900 overflow-hidden shadow-md">
            <img src="https://picsum.photos/200" alt="user" />
          </div>
          <div className="w-[100px] h-[100px] rounded-full -ml-[20px] border-2 border-gray-900 overflow-hidden shadow-md">
            <img src={matchImg} alt="match" />
          </div>
        </div>
        <div className="w-full flex space-x-4">
          <button
            style={{ backgroundColor: btnColor, color: txtColor }}
            onClick={onShowProfile}
            className=" w-1/2 p-2 rounded shadow"
          >
            Profle
          </button>
          <button
            style={{ backgroundColor: bgColor, color: btnTxtColor }}
            onClick={onClose}
            className=" w-1/2 rounded shadow"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchPopUp;

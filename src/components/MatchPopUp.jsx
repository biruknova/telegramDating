const MatchPopUp = ({ matchImg, matchName, onShowProfile, onClose }) => {
  return (
    <div className="fixed w-full flex items-center justify-center min-h-screen top-0 left-0 backdrop-blur-sm dark:bg-black/30 bg-white/30 flex flex-grow  p-5 z-50">
      <div
        onClick={onClose}
        className="absolute top-0 left-0 min-h-screen w-full bg-transparent z-0"
      ></div>
      <div className="rounded-lg bg-gray-900 w-full max-w-[400px] flex flex-col items-center p-10 space-y-12 z-10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-medium ">It's a Match !</h1>
          <p className="text-sm">
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
            onClick={onShowProfile}
            className="bg-blue-500 w-1/2 p-2 rounded"
          >
            Profle
          </button>
          <button onClick={onClose} className="bg-red-500 w-1/2 rounded">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchPopUp;

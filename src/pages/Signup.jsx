import RadioToggle from "../components/Radios";

const SignupPage = () => {
  window.Telegram.WebApp.MainButton.show();

  return (
    <div className="bg-bgColor flex flex-col justify-center min-h-screen p-3">
      <div className="w-full flex flex-col space-y-5">
        <div className="flex flex-col">
          <label>Full Name</label>
          <input
            type="text"
            className={`outline-none py-1 border-b border-black bg-transparent focus:border-btnColor  transition-colors duration-200`}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Age</label>
          <input
            type="number"
            className={`outline-none py-1 border-b border-black bg-transparent focus:border-btnColor  transition-colors duration-200`}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Gender</label>

          <RadioToggle />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

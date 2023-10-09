import "../../shimmer.css";

const ProfileCardShimmer = () => {
  const colorMode = window.Telegram.WebApp.colorScheme;

  const mode = colorMode === "dark";

  return (
    <section className="w-full mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center  rounded-md overflow-hidden space-y-4 w-full">
        <div className="w-full flex flex-col space-y-5">
          <div
            style={{ height: "100vw" }}
            className={`w-full relative ${
              mode ? "bg-white/10" : "bg-slate-100"
            } `}
          >
            <div className="flex flex-col items-start text-white absolute bottom-0 left-0 p-4 w-full">
              <div className="flex items-center space-x- w-full">
                <div
                  className={`h-3.5 w-1/2 ${
                    mode ? "animate-waiter-dark" : "animate-waiter-light"
                  }  rounded-full`}
                ></div>
              </div>
              <div
                className={`h-2.5 w-1/4 dark:animate-waiter-dark animate-waiter-ligh${
                  mode ? "animate-waiter-dark" : "animate-waiter-light"
                }  rounded-full mt-2`}
              ></div>
            </div>
          </div>
          <div className="px-4 flex flex-col w-full space-y-2 text-sm min-h-[80px]">
            <div
              className={`h-2.5 w-full ${
                mode ? "animate-waiter-dark" : "animate-waiter-light"
              }  rounded-full`}
            ></div>
            <div
              className={`h-2.5 w-full ${
                mode ? "animate-waiter-dark" : "animate-waiter-light"
              } rounded-full`}
            ></div>
            <div
              className={`h-2.5 w-1/2 ${
                mode ? "animate-waiter-dark" : "animate-waiter-light"
              }  rounded-full`}
            ></div>
          </div>
        </div>
        <div className="px-4 w-full">
          <hr className="border-t border-[#2c2c2c] dark:border-black/20 w-full" />
        </div>

        <div className="flex space-x-4 px-4 w-full pb-5">
          <button
            className={`w-1/2 h-[45px] rounded  flex justify-center items-center ${
              mode ? "animate-waiter-dark" : "animate-waiter-light"
            }  `}
          ></button>
          <button
            className={`w-1/2 h-[45px] rounded  flex justify-center items-center ${
              mode ? "animate-waiter-dark" : "animate-waiter-light"
            }  `}
          ></button>
        </div>
      </div>
    </section>
  );
};

export default ProfileCardShimmer;

import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } =
    useStateContext();

  const themeColors = [
    {
      name: "purple-theme",
      color: "#7c3aed",
    },
    {
      name: "red-theme",
      color: "#FF5C8E",
    },
    {
      name: "blue-theme",
      color: "#06b6d4",
    },
    {
      name: "green-theme",
      color: "#03C9D7",
    },

    {
      name: "TealSea-theme",
      color: "#14b8a6",
    },
    {
      color: "#FB9678",
      name: "orange-theme",
    },
  ];

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200  bg-white dark:bg-[#484B52] w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Settings</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray hover:transition ease-out duration-700"
          >
            <MdOutlineCancel />
          </button>
        </div>

        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl ">Theme Option</p>

          <div className="mt-4 flex relative">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Light"}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Light
            </label>
            <div
              // style={{ borderColor: `${currentColor}` }}
              className="border z-10 border-color h-8 ml-8 absolute left-10 -top-1  "
            ></div>
            <MdOutlineLightMode className="text-2xl  ml-7 mt-0.5" />
          </div>

          <div className="mt-6 relative flex">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Dark"}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark
            </label>
            <div
              // style={{ borderColor: `${currentColor}` }}
              className="border z-10 border-color h-8 ml-8 absolute left-10 -top-1  "
            ></div>
            <MdOutlineDarkMode className="text-2xl  ml-7 mt-0.5" />
          </div>
        </div>

        <div className="p-4 border-t-1 border-color ml-4">
          <p className="font-semibold text-xl ">Theme Colors</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <div
                className="relative mt-2 cursor-pointer flex gap-5 items-center"
                key={item.name}
              >
                <button
                  type="button"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  onClick={() => setColor(item.color)}
                >
                  <BsCheck
                    className={`ml-2 text-2xl text-white ${
                      item.color === currentColor ? "block" : "hidden"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;

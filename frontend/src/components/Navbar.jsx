import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsChevronLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import avatar from "../assets/images/avatar3.jpg";
import { UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { useLocation, useNavigate } from "react-router-dom";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title}>
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      ></span>
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    screenSize,
    setScreenSize,
    course_name,
  } = useStateContext();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 1400) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const userInfo = useSelector((state) => state.auth);
  console.log(userInfo);
  const course_Name = localStorage.getItem("course_name", course_name);
  console.log(course_Name);

  return (
    <div className="flex justify-between p-2  relative">
      <div className="flex">
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
        {pathname == "/courseName" && (
          <>
            <Tooltip title="Back">
              <span
                // style={{ color: `${currentColor}` }}
                className="md:mt-4 mt-5 text-xl md:text-2xl dark:text-gray-200 text-gray-500 hover:text-gray-400 dark:hover:text-gray-500 hover:transition ease-out duration-700"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <BsChevronLeft />
              </span>
            </Tooltip>
          </>
        )}

        <p className=" dark:text-white text-gray-500 mt-4 md:mt-3 ld:mt-2 ml-1">
          {pathname != "/courseName" && (
            <span className="text-xl md:text-2xl ">Welcome</span>
          )}
          <span className="font-bold ml-2.5 text-xl md:text-2xl ">
            {pathname == "/courseName" ? (
              <>
                <span
                  style={{ color: `${currentColor}` }}
                  className="text-xl md:text-2xl"
                >
                  {course_Name}
                </span>
              </>
            ) : (
              userInfo.userInfo.name
            )}
            {pathname != "/courseName" && " !"}
          </span>
        </p>
      </div>

      <div className="flex items-center flex-grow mx-2">
        <div className="border-b border-gray-500 w-full"></div>
      </div>

      <div className="flex">
        <NavButton
          title="Chat"
          customFunc={() => handleClick("chat")}
          dotColor="#03C9D7"
          color={currentColor}
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notification"
          customFunc={() => handleClick("notification")}
          dotColor="rgb(254, 201, 15)"
          color={currentColor}
          icon={<RiNotification3Line />}
        />

        <Tooltip title="Profile">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
            <img
              className="rounded-full w-12 h-12"
              src={avatar}
              alt="profile"
            />
          </div>
        </Tooltip>
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;

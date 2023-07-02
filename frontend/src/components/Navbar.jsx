import React, { useState, useEffect, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
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

const NavButton = ({ title, customFunc, icon, color, dotColor, isActive }) => (
  <Tooltip title={title}>
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className={`relative text-xl rounded-full p-3 hover:bg-light-gray transition ease-out duration-500 ${
        isActive ? "active" : ""
      }`}
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

  const [profileClicked, setProfileClicked] = useState(false);
  const userRef = useRef();
  const userImageRef = useRef();
  const [isClosing, setIsClosing] = useState(false);

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

  const handleActiveMenu = () => {
    if (activeMenu) {
      setIsClosing(true);
      setTimeout(() => {
        setActiveMenu(false);
        setIsClosing(false);
      }, 500); // Adjust the duration of the transition here
    } else {
      setActiveMenu(true);
    }
  };

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveMenu(false);
      setIsClosing(false);
    }, 500); // Adjust the duration of the transition here
  };

  const handleOpenMenu = () => {
    setActiveMenu(true);
  };

  const userInfo = useSelector((state) => state.auth);
  console.log(userInfo);
  const course_Name = localStorage.getItem("course_name", course_name);
  console.log("course_Name: ", course_Name);

  return (
    <div className="flex justify-between p-2 relative">
      <div className="flex">
        {activeMenu ? (
          <NavButton
            title="Close Menu"
            customFunc={handleCloseMenu}
            color={currentColor}
            icon={
              <TfiClose
                className={` ${isClosing ? "rotate-45 text-gray-900" : ""}`}
                style={{ transition: "transform 0.3s ease" }}
              />
            }
            isActive={!isClosing}
          />
        ) : (
          <NavButton
            title="Menu"
            customFunc={handleOpenMenu}
            color={currentColor}
            icon={<AiOutlineMenu />}
            isActive={false}
          />
        )}

        {pathname === "/Main" && (
          <Tooltip title="Back">
            <span
              className="md:mt-4 cursor-pointer mt-5 text-xl md:text-2xl dark:text-gray-200 text-gray-500 hover:text-gray-400 dark:hover:text-gray-500 hover:transition ease-out duration-700"
              onClick={() => {
                navigate(-1);
              }}
            >
              <BsChevronLeft />
            </span>
          </Tooltip>
        )}

        {pathname === "/quizCreator" ||
          (pathname === "/messages" && (
            <Tooltip title="Back">
              <span
                className="md:mt-4 cursor-pointer mt-5 text-xl md:text-2xl dark:text-gray-200 text-gray-500 hover:text-gray-400 dark:hover:text-gray-500 hover:transition ease-out duration-700"
                onClick={() => {
                  navigate("/Main");
                }}
              >
                <BsChevronLeft />
              </span>
            </Tooltip>
          ))}

        <p className="dark:text-white text-gray-500 mt-4 md:mt-3 ld:mt-2 ml-1">
          {pathname !== "/courseName" && (
            <span className="text-xl md:text-2xl">Welcome</span>
          )}
          <span className="font-bold ml-2.5 text-xl md:text-2xl">
            {pathname === "/courseName" ? (
              <span
                style={{ color: `${currentColor}` }}
                className="text-xl md:text-2xl"
              >
                {course_Name}
              </span>
            ) : (
              userInfo.userInfo.name
            )}
            {pathname !== "/courseName" && " !"}
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
            onClick={() => {
              setProfileClicked(!profileClicked);
              console.log(!profileClicked);
            }}
            ref={userRef}
          >
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
            <img
              className="rounded-full w-12 h-12"
              src={avatar}
              alt="profile"
              onClick={() => {
                setProfileClicked(!profileClicked);
              }}
              ref={userImageRef}
            />
          </div>
        </Tooltip>
        {profileClicked && (
          <UserProfile
            setProfileClicked={setProfileClicked}
            userRef={userRef}
            userImageRef={userImageRef}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

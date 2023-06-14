import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import avatar from "../assets/images/avatar3.jpg";
import { Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    ></span>
    {icon}
  </button>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color="#3B82F6"
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        <NavButton
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          color="#3B82F6"
          icon={<BsChatLeft />}
        />
        <NavButton
          dotColor="#03C9D7"
          customFunc={() => handleClick("notification")}
          color="#3B82F6"
          icon={<RiNotification3Line />}
        />
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => handleClick("userProfile")}
        >
          <img className="rounded-full w-12 h-12" src={avatar} alt="profile" />
          <p>
            <span className="text-gray-400 text-14">Hi, </span>
            <span className="text-gray-400 font-bold ml-1 text-14">Ali</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div>
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;

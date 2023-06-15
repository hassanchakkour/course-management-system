import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
// <<<<<<< ali
import { Tooltip } from "@mui/material";

// =======
// import {toast} from 'react-toastify'
// >>>>>>> master
import avatar from "../assets/images/avatar3.jpg";
import { useStateContext } from "../contexts/ContextProvider";

// <<<<<<< ali
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
// =======
// import {useSelector, useDispatch} from 'react-redux'
// import { useLogoutMutation } from "../slices/usersApiSlice";
// import { logout } from "../slices/authSlice";

// const NavButton = ({ customFunc, icon, color, dotColor }) => (
//   <button
//     type="button"
//     onClick={customFunc}
//     style={{ color }}
//     className="relative text-xl rounded-full p-3 hover:bg-light-gray"
//   >
//     <span
//       style={{ background: dotColor }}
//       className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
//     ></span>
//     {icon}
//   </button>
// >>>>>>> master
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
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

// <<<<<<< ali
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
// =======
//   const userInfo = useSelector((state) => state.auth)
//   console.log(userInfo)

//   const dispatch = useDispatch();

//   const [logoutApiCall] = useLogoutMutation()

//   const handleLogout = async () => { 
//     try{
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       toast.success('Logged Out Successfully !!')
//     }catch(error){ 
//       console.log(error)
//     }
//   }
// >>>>>>> master

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

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
// <<<<<<< ali
        <Tooltip title="Profile">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-12 h-12"
              src={avatar}
              alt="profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi, </span>
              <span className="text-gray-400 font-bold ml-1 text-14">Ali</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </Tooltip>
        {/* {isClicked.chat && <Chat />}
// =======
//         <div
//           className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
//           onClick={() => handleClick("userProfile")}
//         >
//           <img className="rounded-full w-12 h-12" src={avatar} alt="profile" />
//           <p>
//             <span className="text-gray-400 text-14">Hi, </span>
//             <span className="text-gray-400 font-bold ml-1 text-14">{userInfo.userInfo != null ? userInfo.userInfo.name : ''}</span>
//           </p>
//           <MdKeyboardArrowDown className="text-gray-400 text-14" />
//           {userInfo.userInfo != null ? <button onClick={handleLogout} className="p-1 rounded bg-red-500 text-white">Logout</button> : 
//           <button  className="p-1 rounded bg-green-500 text-white">sign</button>}
//         </div>
//         {isClicked.chat && <Chat />}
// >>>>>>> master
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />} */}
      </div>
    </div>
  );
};

export default Navbar;

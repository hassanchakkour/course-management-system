import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from "@mui/material";

import { RiDashboardFill } from "react-icons/ri";

import {
  FaCalendar,
  FaChalkboardTeacher,
  FaUserFriends,
  FaEnvelope,
} from "react-icons/fa";

import logo from "../../public/aub-logo1.png";
import logoLight from "../../public/aub-logoLight.png";
import logoZidyia from "../../public/zidyia-logo.png";

// import links from "../constants/links";
const links = [
  {
    title: "dashboard",
    icon: <RiDashboardFill />,
  },
  {
    title: "courses",
    icon: <FaChalkboardTeacher />,
  },
  {
    title: "students",
    icon: <FaUserFriends />,
  },
  {
    title: "calendar",
    icon: <FaCalendar />,
  },
  {
    title: "messages",
    icon: <FaEnvelope />,
  },
];

import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize, currentMode } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  console.log(currentColor);
  const navigate = useNavigate();
  // useEffect(() => {
  //   // navigate("/dashboard");
  // }, []);

  // text-2xl flex flex-col justify-center align-middle
  const activeLink = "rounded-lg m-2";
  const normalLink =
    " rounded-lg text-gray-700 dark:text-white dark:hover:text-black hover:text-gray-200 m-2";

  return (
    <div className="sm:pt-3 md:pt-6 sm:mt-0 mt-5 flex flex-col justify-center align-middle md:overflow-hidden overflow-y-auto md:hover:overflow-auto ">
      {activeMenu && (
        <>
          <div className="flex flex-col justify-between align-middle">
            <div className="mb-3">
              <Link
                to="/"
                onClick={handleCloseSideBar}
                className="items-center ml-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
              >
                <div>
                  <img
                    className="ml-1"
                    width={80}
                    height={80}
                    src={currentMode == "Dark" ? logo : logoLight}
                    alt="logo"
                  />
                </div>
              </Link>
            </div>

            <div className=" text-2xl my-2 mb-6 mx-auto">
              {links.map((item) => (
                <Tooltip key={item.title} title={item.title} placement="right">
                  <div className="hover:bg-[#5BD0B0] hover:transition ease-out -my-2 duration-700 rounded-lg  px-8">
                    <NavLink
                      to={`/${item.title}`}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        color: isActive ? currentColor : "",
                      })}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {item.icon}
                    </NavLink>
                  </div>
                </Tooltip>
              ))}
            </div>
            <div>
              <Link
                to="/"
                onClick={handleCloseSideBar}
                className="items-center  ml-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
              >
                <div>
                  <img
                    className="ml-1.5"
                    width={70}
                    height={70}
                    src={logoZidyia}
                    alt="logo"
                  />
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;

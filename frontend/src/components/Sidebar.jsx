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

import logo from "../../public/zidyia-logo.png";

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
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
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
  const activeLink = `rounded-lg m-2 text-[${currentColor}]`;
  const normalLink =
    " rounded-lg  text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="pt-5 sm:mt-0 mt-5 flex flex-col justify-center align-middle md:overflow-hidden overflow-auto md:hover:overflow-auto ">
      {activeMenu && (
        <>
          <div>
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center ml-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <div>
                <img width={70} height={70} src={logo} alt="logo" />
              </div>
            </Link>
          </div>

          <div className="mt-10 text-2xl mx-auto">
            {links.map((item) => (
              // <Tooltip title={item.title} placement="right">
              <NavLink
                to={`/${item.title}`}
                key={item.title}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {item.icon}
              </NavLink>
              // </Tooltip>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;

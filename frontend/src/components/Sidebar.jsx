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

  const navigate = useNavigate();
  useEffect(() => {
    // navigate("/dashboard");
  }, []);

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <FaBookOpen /> <span>LMS</span>
            </Link>

            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10">
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
                <span className="capitalize">{item.title}</span>
              </NavLink>
              // </Tooltip>
            ))}
          </div>
          {/* <div className="mx-2 bg-logo-zidyia w-20 h-20"></div> */}
        </>
      )}
    </div>
  );
};

export default Sidebar;

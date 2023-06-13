import { Link, NavLink } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Tooltip } from "@mui/material";

import { RiDashboardFill } from "react-icons/ri";
import { AiFillBook } from "react-icons/ai";
import { FaCalendar, FaUserFriends, FaEnvelope } from "react-icons/fa";

const links = [
  {
    title: "dashboard",
    icon: <RiDashboardFill />,
  },
  {
    title: "courses",
    icon: <AiFillBook />,
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

const Sidebar = () => {
  const activeMenu = true;

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 bg-blue-500 text-white";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={() => {}}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <FaBookOpen /> <span>LMS</span>
            </Link>

            <div className="p-3 mt-4 block md:hidden">
              <IconButton onClick={() => {}}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <NavLink
                to={`/${item.title}`}
                key={item.title}
                onClick={() => {}}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {item.icon}
                <span className="capitalize">{item.title}</span>
                {/* <p className="text-gray-400 m-3 mt-4">{item.title}</p> */}
              </NavLink>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;

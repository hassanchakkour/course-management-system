import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const { currentColor, currentBgColor } = useStateContext();
  const userInfo = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  console.log(userInfo.userInfo._id);

  const [numberOfCourses, setNumberOfCourses] = useState(0);
  const getNumberOfCourses = async () => {
    try {
      let teacherId = userInfo.userInfo._id;
      const response = await axios.post("http://localhost:5000/api/courses", {
        teacherId,
      });
      setNumberOfCourses(response.data.length);
    } catch (error) {
      // Handle error
      console.error("Error retrieving number of courses:", error);
      return 0;
    }
  };

  useEffect(() => {
    getNumberOfCourses();
  }, []);

  console.log("Number of courses:", numberOfCourses);

  const dynamicClass = `bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-72 rounded-xl w-5/6 p-8 pt-9 m-3 ${currentBgColor} bg-no-repeat bg-cover lg:bg-auto bg-right-top`;

  return (
    <div className="mt-24 sm:mt-18 md:mt-11">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className={dynamicClass}>
          <div className="flex justify-between p-6">
            <p className="text-xl text-gray-500 dark:text-gray-400 lg:dark:text-white mt-16 md:mt-14 ">
              <span className="font-bold">Academic</span> Session
            </p>
            <p className="text-base md:text-xl text-gray-400 font-bold -mt-9 ">
              <span
                style={{
                  backgroundColor: currentColor,
                  borderRadius: "50%",
                  filter: `drop-shadow(0px 0px 6px ${currentColor})`,
                }}
                className="text-xl opacity-0.9 text-white rounded-full mr-1 p-2 md:p-3"
              >
                {numberOfCourses}
              </span>
              {"  "}
              <NavLink
                className="hover:text-gray-500 dark:hover:text-white hover:transition ease-out duration-700 "
                to={"/courses"}
              >
                My Classes
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { Tooltip } from "@mui/material";

const Courses = () => {
  const { currentColor } = useStateContext();
  const userInfo = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    try {
      let teacherId = userInfo.userInfo._id;
      const response = await axios.post("http://localhost:5000/api/courses", {
        teacherId,
      });
      setCourses(response.data);
    } catch (error) {
      // Handle error
      console.error("Error retrieving of courses:", error);
      return null;
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  console.log("Courses:", courses);

  return (
    <div className="mt-24 sm:mt-18 md:mt-11">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-10 items-center">
          {courses.map((course) => (
            <div
              key={course._id}
              style={{ filter: `drop-shadow(0px 0px 3px ${currentColor})` }}
              className=" bg-white h-48 dark:text-gray-200 dark:bg-secondary-dark-bg w-52 md:w-80 p-4 pt-9 rounded-2xl "
            >
              <div className="flex justify-between">
                <button
                  type="button"
                  style={{ backgroundColor: currentColor }}
                  className="md:text-lg text-base text-gray-700 dark:text-white opacity-0.9 rounded-full -ml-8 py-2 px-4 hover:drop-shadow-xl hover:transition ease-out duration-700"
                >
                  {/* Codeof The Course */}
                  CODE
                </button>
                <Tooltip arrow title="Edit">
                  <button
                    type="button"
                    style={{
                      backgroundColor: currentColor,
                      borderRadius: "50%",
                    }}
                    className="md:text-2xl text-base text-white dark:text-gray-700 opacity-0.9 rounded-full p-3 hover:drop-shadow-xl hover:transition hover:text-gray-700 dark:hover:text-white ease-out duration-700"
                  >
                    <FiEdit2 />
                  </button>
                </Tooltip>
              </div>
              <p className="mt-3">
                <span
                  style={{ color: currentColor }}
                  className={`text-base font-semibold md:text-lg text-gray-400`}
                >
                  {course.title}
                </span>
              </p>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
                {course.duration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

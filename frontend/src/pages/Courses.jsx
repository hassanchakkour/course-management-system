import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { Tooltip } from "@mui/material";

const Courses = () => {
  const { currentColor, courseID, setCourse_ID, course_Name } =
    useStateContext();
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

  // console.log("Courses:", courseID);

  return (
    <div className="mt-24 sm:mt-18 md:mt-11">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-10 items-center">
          {courses.map((course) => (
            <div
              key={course._id}
              style={{ filter: `drop-shadow(0px 0px 3px ${currentColor})` }}
              className=" bg-white h-40 dark:text-gray-200 dark:bg-secondary-dark-bg w-72 md:w-96 p-4 rounded-3xl "
            >
              <p className="mb-3">
                <span
                  className={`text-base font-semibold md:text-lg text-gray-700 dark:text-white`}
                >
                  {course.title}
                </span>
              </p>
              <button
                type="button"
                style={{ backgroundColor: currentColor }}
                className="md:text-lg text-base text-gray-700 dark:text-white opacity-0.9 rounded-2xl -ml-8 py-2 px-4 hover:drop-shadow-xl hover:transition ease-out duration-700  md:w-36 "
              >
                {/* Codeof The Course */}
                <span className="ml-4 md:ml-1">{course.courseSKU}</span>
              </button>

              <div className="flex justify-between">
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
                  {course.duration}
                </p>
                <Tooltip arrow title="Edit" placement="top">
                  <NavLink to="/courseName">
                    <button
                      type="button"
                      onClick={() => setCourse_ID(course._id, course.title)}
                      style={{
                        color: currentColor,
                        borderRadius: "50%",
                      }}
                      className="md:text-xl hover:bg-light-gray dark:hover:bg-gray-700 text-lg rounded-full p-3 hover:drop-shadow-xl hover:transition ease-out duration-700"
                    >
                      <FiEdit2 />
                    </button>
                  </NavLink>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

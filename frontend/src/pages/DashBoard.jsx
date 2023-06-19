import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { Tooltip } from "@mui/material";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const DashBoard = () => {
  const { currentColor, courseID, setCourse_ID, course_Name } =
    useStateContext();
  const userInfo = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  console.log(userInfo.userInfo._id);

  const [numberOfCourses, setNumberOfCourses] = useState(0);
  const [courses, setCourses] = useState([]);

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
    getNumberOfCourses();
    getCourses();
  }, []);

  console.log("Number of courses:", numberOfCourses);

  return (
    <div className="mt-20 md:mt-3">
      <div className="flex flex-col ">
        <div className="mx-auto bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-24 rounded-3xl w-11/12 p-8 ">
          <div className="flex justify-between">
            <p className="text-xl text-gray-500 dark:text-gray-400 lg:dark:text-white ">
              <span>Academic</span> <span className="font-bold">Session</span>
            </p>
            <p className="text-base md:text-xl text-gray-400 font-bold  ">
              <span
                style={{
                  backgroundColor: currentColor,
                  borderRadius: "50%",
                  filter: `drop-shadow(0px 0px 10px ${currentColor})`,
                  outline: `2px solid ${currentColor}`,
                  outlineOffset: "5px",
                }}
                className="text-xl opacity-0.9 text-white rounded-full mr-1 p-2 md:p-3"
              >
                {numberOfCourses}
              </span>
              {"  "}
              <NavLink
                className="ml-2 hover:text-gray-500 dark:hover:text-white hover:transition ease-out duration-700 "
                to={"/courses"}
              >
                My Classes
              </NavLink>
            </p>
          </div>
        </div>

        <div className="flex m-4 mt-14 justify-center">
          <BsChevronLeft
            className="opacity-20 mr-1 dark:text-white text-gray-900 cursor-pointer  hover:opacity-80 mt-14 hover:transition ease-out duration-700"
            // onClick={slideLeft}
            size={40}
          />
          <div className="flex gap-10 justify-center mx-1">
            {courses.map((course) => (
              <div
                key={course._id}
                style={{ filter: `drop-shadow(0px 0px 3px ${currentColor})` }}
                className=" bg-white h-40 dark:text-gray-200 dark:bg-secondary-dark-bg  w-96 p-4 rounded-3xl "
              >
                <p className="mb-3">
                  <span
                    className={` font-semibold text-lg text-gray-700 dark:text-white`}
                  >
                    {course.title}
                  </span>
                </p>
                <button
                  type="button"
                  style={{ backgroundColor: currentColor }}
                  className="text-lg  text-gray-700 dark:text-white opacity-0.9 rounded-2xl -ml-8 py-2 px-4 hover:drop-shadow-xl hover:transition ease-out duration-700  w-36 "
                >
                  <span className="ml-4 md:ml-1">{course.courseSKU}</span>
                </button>

                <div className="flex justify-between">
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
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
                        className="text-xl hover:bg-light-gray dark:hover:bg-gray-700  rounded-full p-3 hover:drop-shadow-xl hover:transition ease-out duration-700"
                      >
                        <FiEdit2 />
                      </button>
                    </NavLink>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
          <BsChevronRight
            className="opacity-20 dark:text-white text-gray-900 cursor-pointer  hover:opacity-80 mt-14 hover:transition ease-out duration-700"
            // onClick={slideLeft}
            size={40}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

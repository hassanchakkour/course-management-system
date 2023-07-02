import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { Tooltip } from "@mui/material";

import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import Calendar from "react-calendar";

const DashBoard = () => {
  const { currentColor, currentMode, courseID, setCourse_ID, course_Name } =
    useStateContext();
  const userInfo = useSelector((state) => state.auth);
  const [numberOfCourses, setNumberOfCourses] = useState(0);
  const [courses, setCourses] = useState([]);

  const carouselRef = useRef(null);
  const [isSliding, setIsSliding] = useState(false);
  const slideWidth = 384; // Width of each slide
  const slidesToScroll = 1; // Number of slides to scroll

  const handleSlideLeft = () => {
    if (!isSliding) {
      setIsSliding(true);
      const currentScrollPosition = carouselRef.current.scrollLeft;
      const newScrollPosition =
        currentScrollPosition - slideWidth * slidesToScroll;

      animateScroll(
        carouselRef.current,
        currentScrollPosition,
        newScrollPosition
      );
    }
  };

  useEffect(() => {
    carouselRef.current.scrollLeft = 0; // Set scroll position to beginning on mount
  }, []);

  const handleSlideRight = () => {
    if (!isSliding) {
      setIsSliding(true);
      const currentScrollPosition = carouselRef.current.scrollLeft;
      const newScrollPosition =
        currentScrollPosition + slideWidth * slidesToScroll;

      animateScroll(
        carouselRef.current,
        currentScrollPosition,
        newScrollPosition
      );
    }
  };

  const animateScroll = (element, start, end) => {
    const duration = 200; // Duration of the scroll animation in milliseconds
    const startTime = performance.now();

    const scroll = (timestamp) => {
      const currentTime = timestamp - startTime;
      const progress = Math.min(currentTime / duration, 1); // Calculate the progress of the animation

      const newPosition = start + (end - start) * progress;
      element.scrollTo({
        left: newPosition,
        behavior: "smooth", // Use smooth scroll behavior
      });

      if (currentTime < duration) {
        // Continue the animation until the duration is reached
        requestAnimationFrame(scroll);
      } else {
        setIsSliding(false); // Animation completed, reset the sliding state
      }
    };

    requestAnimationFrame(scroll);
  };

  const handleTransitionEnd = () => {
    setTimeout(() => {
      setIsSliding(false);
    }, 100); // Adjust the delay time as needed
  };

  const getNumberOfCourses = async () => {
    try {
      let teacherId = userInfo.userInfo._id;
      const response = await axios.post("http://localhost:5000/api/courses", {
        teacherId,
      });
      setNumberOfCourses(response.data.length);
    } catch (error) {
      console.error("Error retrieving number of courses:", error);
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
      console.error("Error retrieving courses:", error);
    }
  };

  useEffect(() => {
    getNumberOfCourses();
    getCourses();
  }, []);

  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };

  const iconStyles = {
    pointerEvents: "none",
  };

  return (
    <div className="mt-24 lg:-ml-2 md:mt-3">
      <div className="flex flex-col">
        <div className="mx-auto bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-24 rounded-3xl w-11/12 p-8">
          <div className="flex justify-between">
            <p className="text-xl text-gray-500 dark:text-gray-400 lg:dark:text-white">
              <span>Academic</span> <span className="font-bold">Session</span>
            </p>
            <p className="text-base md:text-xl text-gray-400 font-bold">
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
                className="ml-2 hover:text-gray-500 dark:hover:text-white hover:transition ease-out duration-700"
                to={"/courses"}
              >
                My Classes
              </NavLink>
            </p>
          </div>
        </div>

        {courses.length === 0 && (
          <p className="flex justify-center mx-auto text-2xl text-gray-700 dark:text-white mt-5 -mb-10">
            No Registered Classes Yet
          </p>
        )}

        <div className="flex justify-center align-middle mx-auto m-4 h-48 mt-12 w-11/12 ">
          <BsChevronLeft
            className="opacity-20 mr-1 dark:text-white text-gray-900 cursor-pointer hover:opacity-80 mt-14 hover:transition ease-out duration-700"
            onClick={handleSlideLeft}
            size={50}
          />
          <div
            className="flex gap-10  mx-1 overflow-y-auto overflow-x-scroll scrollbar-hide"
            ref={carouselRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
            }}
          >
            {courses.map((course) => (
              <div
                key={course._id}
                style={{
                  filter: `drop-shadow(0px 0px 3px ${currentColor})`,
                  scrollSnapAlign: "start",
                }}
                className={`bg-white dark:text-gray-200 dark:bg-secondary-dark-bg w-96 h-40 p-4 rounded-3xl flex-none scroll-snap-align-start`}
              >
                <p className="mb-3">
                  <span
                    className={`font-semibold text-lg text-gray-700 dark:text-white`}
                  >
                    {course.title}
                  </span>
                </p>
                <button
                  type="button"
                  style={{ backgroundColor: currentColor }}
                  className="text-lg text-gray-700 dark:text-white opacity-0.9 rounded-2xl -ml-8 py-2 px-4 hover:drop-shadow-xl hover:transition ease-out duration-700 w-36"
                >
                  <span className="ml-4 md:ml-1">{course.courseSKU}</span>
                </button>

                <div className="flex justify-between mt-2">
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    {course.duration}
                  </p>
                  <Tooltip arrow title="Edit" placement="top">
                    <NavLink to="/Main">
                      <button
                        type="button"
                        onClick={() => setCourse_ID(course._id, course.title)}
                        style={{
                          color: currentColor,
                          borderRadius: "50%",
                        }}
                        className="text-xl hover:bg-light-gray dark:hover:bg-gray-700 rounded-full p-3 hover:drop-shadow-xl hover:transition ease-out duration-700"
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
            className="opacity-20 dark:text-white text-gray-900 cursor-pointer hover:opacity-80 mt-14 hover:transition ease-out duration-700"
            onClick={handleSlideRight}
            size={50}
          />
        </div>
        <div
          style={{ filter: `drop-shadow(0px 0px 3px ${currentColor})` }}
          className="-ml-48 max-w-5xl"
        >
          <Calendar
            className={`${
              currentMode === "Dark" ? "dark:bg-secondary-dark-bg" : "bg-white"
            } rounded-3xl p-4 mx-auto ml-[30%] max-[850px]:ml-[40%] w-6/12 ${
              currentMode === "Dark" ? "text-white" : "text-gray-700"
            } border`}
            onChange={onChange}
            value={date}
            tileClassName={({ date, view }) => {
              if (view === "month") {
                const dayOfWeek = date.getDay();
                const isSunday = dayOfWeek === 0;
                const isSaturday = dayOfWeek === 6;

                let classNames = "rounded";

                if ((isSunday || isSaturday) && currentMode !== "Dark") {
                  classNames += " text-red-400";
                }

                if ((isSunday || isSaturday) && currentMode === "Dark") {
                  classNames += " text-red-400";
                }

                return classNames;
              }

              return "";
            }}
            prevLabel={
              <div
                className={`rounded ${
                  currentMode === "Dark" ? "bg-secondary-dark-bg" : "bg-white"
                }`}
                style={iconStyles}
              >
                <BsChevronLeft size={20} color={currentColor} />
              </div>
            }
            nextLabel={
              <div
                className={`rounded ${
                  currentMode === "Dark" ? "bg-secondary-dark-bg" : "bg-white"
                }`}
                style={iconStyles}
              >
                <BsChevronRight size={20} color={currentColor} />
              </div>
            }
            prev2Label={
              <div
                className={`rounded ${
                  currentMode === "Dark" ? "bg-secondary-dark-bg" : "bg-white"
                }`}
                style={iconStyles}
              >
                <RxDoubleArrowLeft size={20} color={currentColor} />
              </div>
            }
            next2Label={
              <div
                className={`rounded ${
                  currentMode === "Dark" ? "bg-secondary-dark-bg" : "bg-white"
                }`}
                style={iconStyles}
              >
                <RxDoubleArrowRight size={20} color={currentColor} />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

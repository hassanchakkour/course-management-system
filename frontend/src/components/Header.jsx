import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { MdAddCircle } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiSave } from "react-icons/fi";

import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";

import { RiCheckDoubleFill, RiDeleteBin3Line } from "react-icons/ri";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { TfiList } from "react-icons/tfi";
import { BiCommentMinus } from "react-icons/bi";
import { BsCalculator } from "react-icons/bs";
import { LuFileText } from "react-icons/lu";

const Header = (course) => {
  const {
    courseID,
    course_name,
    currentColor,
    activityID,
    activeMenu,
    activityTitle,
  } = useStateContext();

  const activityId = localStorage.getItem("activity_id", activityID);

  //   const course_Title = localStorage.getItem("course_name", activityTitle);

  const { userInfo } = useSelector((state) => state.auth);

  const [module, setModule] = useState();
  const getModuleData = async () => {
    let sendData = {
      courseId: course.course,
    };
    const res = await axios.post(
      "http://localhost:5000/api/modules/course",
      sendData
    );
    setModule(res.data);
  };
  const handleRemoveModule = async (id) => {
    try {
      let sendData = {
        _id: id,
      };
      const res = await axios.post(
        "http://localhost:5000/api/modules/delete",
        sendData
      );
    } catch (error) {
      console.log(error);
    } finally {
      await getModuleData();
    }
  };

  useEffect(() => {
    getModuleData();
  }, []);
  let iconsClass = "";
  if (activeMenu) {
    iconsClass =
      "mx-[70%] max-[850px]:mt-0 max-[850px]:mx-[60%] absolute mt-12";
  } else {
    iconsClass =
      "mx-[80%] max-[850px]:mt-0 max-[850px]:mx-[60%] absolute mt-12";
  }
  const [openItemId, setOpenItemId] = useState(null);
  const handleDropdownToggle = (itemId) => {
    setOpenItemId((prevOpenItemId) =>
      prevOpenItemId === itemId ? null : itemId
    );
  };
  const [openItemsubId, setOpenItemsubId] = useState(null);
  const handleDropdownToggleSub = (itemId) => {
    setOpenItemsubId((prevopenItemsubId) =>
      prevopenItemsubId === itemId ? null : itemId
    );
  };
  const [openItemactId, setOpenItemactId] = useState(null);
  const handleDropdownToggleAct = (itemId) => {
    setOpenItemactId((prevopenItemsubId) =>
      prevopenItemsubId === itemId ? null : itemId
    );
  };

  return (
    <>
      {/* Main Container */}
      <div className="mt-24  sm:mt-18 md:mt-5">
        {/* Question Container */}
        <div className="flex justify-between h-full m-3 mt-10 md:px-3 xl:mx-12 md:mx-2">
          {/* First Container */}
          <div className="h-[60vh] border-solid border-2 border-gray-400 rounded-3xl w-full md:mr-5 mr-2 relative">
            {/* Icons Top Bar Clickable */}
            <div className="flex justify-end dark:text-white text-gray-800">
              <MdAddCircle className="m-6 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl" />
              <MdOutlineModeEdit className="m-6 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl " />
              <FiSave className="m-6 mr-10 md:mr-16 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl" />
            </div>
            <div className="flex w-full">
              {/* Icons Side Bar Drag N Drop */}
              <div className="absolute min-w-max bg-white dark:bg-secondary-dark-bg dark:text-white text-gray-800 text-2xl flex flex-col justify-center align-middle border-solid border-2 border-gray-400 rounded-2xl rounded-tl-none rounded-bl-none h-2/3 p-3">
                <RiCheckDoubleFill className="mb-5 mx-auto" />
                <RiCheckboxMultipleFill className="mb-5 mx-auto" />
                <TfiList className="mb-5 mx-auto" />
                <BiCommentMinus className="mb-5 mx-auto" />
                <BsCalculator className="mb-5 mx-auto" />
                <LuFileText className=" mx-auto" />
              </div>
              {/* Sub Container 1 */}
              <div className="bg-white flex flex-wrap ml-14 sm:ml-16 lg:ml-14 text-white  dark:bg-[#20232A] rounded-lg  w-6/6 ">
                {/* insert mods here  */}
                {module &&
                  module.map((mods) => {
                    // console.log("res", mods.submoduleId);
                    return (
                      <div
                        key={mods._id}
                        className="ml-10 mb-5  bg-gradient-to-b from-[#242830] to-[#33373E]  p-5 rounded-3xl text-xl  w-[400px]  "
                      >
                        <div className=" mt-2 flex text-xl mb-2 justify-between">
                          <p> {mods.title}</p>
                          <div className="flex items-center flex-grow mx-2">
                            <div className="border-b border-gray-500 w-full"></div>
                          </div>
                          <button
                            onClick={() => handleDropdownToggle(mods._id)}
                          >
                            <BsThreeDots className="text-l mt-1 " />
                          </button>
                        </div>

                        {openItemId === mods._id && (
                          <p
                            onClick={() => handleRemoveModule(mods._id)}
                            className="z-1 cursor-pointer  flex ml-[17%] absolute bg-red-500 p-2 rounded-lg text-sm"
                          >
                            <RiDeleteBin3Line className="mt-0.5" />{" "}
                            <span>Delete</span>
                          </p>
                        )}
                        {mods.submoduleId.map((submodule, index) => {
                          // console.log(submodule.activityId);
                          return (
                            <div
                              key={submodule._id}
                              className="border mb-2 border-gray-500 text-2xl ml-2 mr-2 text-center"
                            >
                              <p className="ml-2 font-bold text-xl flex justify-center">
                                <p className="text-center ">
                                  {submodule.title}
                                </p>
                                <BsThreeDotsVertical
                                  className="text-2xl mb-1 right-0 mt-1"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    // Handle the click event logic here
                                    handleDropdownToggleSub(submodule._id);
                                  }}
                                />
                              </p>
                              {openItemsubId === submodule._id && (
                                <p
                                  // onClick={() => handleRemoveModule(submodule._id)}
                                  className="z-1 cursor-pointer max-[850px]:ml-[40%]  flex ml-[10%] absolute bg-red-500 p-2 rounded-lg text-sm"
                                >
                                  <RiDeleteBin3Line className="mt-0.5 mr-2" />{" "}
                                  <span>Delete</span>
                                </p>
                              )}
                              {submodule.activityId.map((activity) => {
                                // console.log(activity.type);
                                return (
                                  <div
                                    key={activity._id}
                                    // className="border border-orange-500   text-left"
                                    className={
                                      activity.type === "Assignment"
                                        ? "border  border-orange-500 mb-1 "
                                        : activity.type === "Quiz"
                                        ? "border   border-purple-500 mb-1"
                                        : activity.type === "online session"
                                        ? "border  border-blue-400 mb-1"
                                        : activity.type === "Recorded Session"
                                        ? "border  border-blue-400 mb-1"
                                        : "border  border-gray-400 "
                                    }
                                  >
                                    {/* className="ml-5 flex justify-between" */}
                                    <p
                                      className={
                                        activity.type === "Assignment"
                                          ? "ml-5 flex justify-between text-orange-500 "
                                          : activity.type === "Quiz"
                                          ? "ml-5 flex justify-between text-purple-500"
                                          : activity.type === "online session"
                                          ? "ml-5 flex justify-between text-blue-400"
                                          : activity.type === "Recorded Session"
                                          ? "ml-5 flex justify-between text-blue-400"
                                          : "ml-5 flex justify-between text-gray-400"
                                      }
                                    >
                                      {activity.title}
                                      <BsThreeDotsVertical
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          // Handle the click event logic here
                                          handleDropdownToggleAct(activity._id);
                                        }}
                                        className="text-l text-white mt-1 "
                                      />
                                    </p>
                                    {openItemactId === activity._id && (
                                      <p
                                        // onClick={() => handleRemoveModule(submodule._id)}
                                        className="z-1 cursor-pointer max-[850px]:ml-[62%]  flex ml-[16%] absolute bg-red-500 p-2 rounded-lg text-sm"
                                      >
                                        <RiDeleteBin3Line className="mt-0.5 mr-2" />{" "}
                                        <span> Delete</span>
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

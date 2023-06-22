import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { MdAddCircle, MdQuiz } from "react-icons/md";
import { MdOutlineModeEdit, MdMoveDown } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { RiCheckDoubleFill, RiDeleteBin3Line } from "react-icons/ri";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { SlMicrophone } from "react-icons/sl";
import { TfiList } from "react-icons/tfi";
import { BiCommentMinus, BiEdit } from "react-icons/bi";
import { AiOutlineSubnode } from "react-icons/ai";
import { BsCalculator } from "react-icons/bs";
import { LuFileText, LuPcCase } from "react-icons/lu";
import { Tooltip } from "@mui/material";
import ButtonMove from "./ModuleComps/ButtonMove";
import ButtonMoveSub from "./ModuleComps/ButtonMoveSub";
import EditBtn from "./ModuleComps/editBtn/EditBtn";
import EditBtnSub from "./ModuleComps/editBtn/EditBtnSub";
const Header = ({ course, onDataFromChild }) => {
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
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const [ismoduleId, setIsmoduleId] = useState("");
  const [isSubmoduleId, setIsSubmoduleId] = useState("");
  const [isActivityId, setIsActivityId] = useState("");
  const [btnIsOpen, setBtnIsOpen] = useState(false);
  const [btnIsSubOpen, setBtnIsSubOpen] = useState(false);
  const [btnEditOpen, setBtnEditOpen] = useState(false);
  const [activTitle, setActivTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [modsTitle, setModsTitle] = useState("");
  const [btnEditSubOpen, setBtnEditSubOpen] = useState(false);
  const handleMoveButtonClick = (data) => {
    const moveActivity = async () => {
      if (isActivityId != "" && isSubmoduleId != "" && data.subId != "") {
        try {
          let sendData = {
            id: isActivityId,
            oldsubsId: isSubmoduleId,
            newsubsId: data.subId,
          };
          const res = await axios.post(
            "http://localhost:5000/api/activities/update",
            sendData
          );
          console.log(res.data);
          setMessageClass("absolute top-5 ml-[45%] text-green-500");
          setMessage(res.data.message);
          setOpenItemactId("");
          setTimeout(() => {
            setMessage("");
          }, 2000);
        } catch (error) {
          console.log(error);
        } finally {
          await getModuleData();
        }
      } else {
        setMessageClass("absolute top-5 ml-[45%] text-red-500");
        setMessage("Something went wrong Please Try Again!");

        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    };

    moveActivity();
  };
  const handleMoveSubs = (data) => {
    console.log("sub", isSubmoduleId);
    console.log("mod", ismoduleId);
    console.log("newmod", data.moduleId);
    const moveSubmodules = async () => {
      if (isSubmoduleId != "" && data.moduleId != "") {
        try {
          let sendData = {
            id: isSubmoduleId,
            newmodsId: data.moduleId,
            oldmodsId: ismoduleId,
          };
          const res = await axios.post(
            "http://localhost:5000/api/submodules/update",
            sendData
          );
          console.log(res.data);
          setMessageClass("absolute top-5 ml-[45%] text-green-500");
          setMessage(res.data.message);
          setOpenItemactId("");
          setTimeout(() => {
            setMessage("");
          }, 2000);
        } catch (error) {
          console.log(error);
        } finally {
          await getModuleData();
          setOpenItemsubId("");
        }
      } else {
        setMessageClass("absolute top-5 ml-[45%] text-red-500");
        setMessage("Something went wrong Please Try Again!");

        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    };

    moveSubmodules();
  };
  const handleEditSubs = async (data) => {
    if (data.subModId != "" && data.submoduleTitle != "") {
      console.log(data);
      try {
        let sendData = {
          id: data.subModId,
          title: data.submoduleTitle,
        };
        const res = await axios.post(
          `http://localhost:5000/api/submodules/update`,
          sendData
        );
        console.log(res);
        setMessageClass("absolute top-5 ml-[45%] text-green-500");
        setMessage(res.data.message);
        setOpenItemsubId("");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } catch (error) {
        console.log(error);
      } finally {
        await getModuleData();
      }
    } else {
      setMessageClass("absolute top-5 ml-[45%] text-red-500");
      setMessage("Something Went Wrong !!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };
  const handleEditModule = async (data) => {
    console.log("this from edit", data);
    if (data.moduleTitle != "") {
      try {
        let sendData = {
          title: data.moduleTitle,
        };
        const res = await axios.put(
          `http://localhost:5000/api/modules/${data.modsId}`,
          sendData
        );
        console.log(res);
        setMessageClass("absolute top-5 ml-[45%] text-green-500");
        setMessage(res.data.message);
        setOpenItemId("");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } catch (error) {
        console.log(error);
      } finally {
        await getModuleData();
      }
    }
  };

  const getModuleData = async () => {
    let sendData = {
      courseId: course,
    };
    const res = await axios.post(
      "http://localhost:5000/api/modules/course",
      sendData
    );
    setModule(res.data);
    // const dataMod = res.data;
    await onDataFromChild(res.data);
  };
  const handleRemoveModule = async (id) => {
    try {
      // let sendData = {
      //   _id: id,
      // };
      const res = await axios.post(
        `http://localhost:5000/api/modules/delete/${id}`
      );
      setMessageClass("absolute top-5 ml-[45%] text-red-500");
      setMessage(res.data.message);

      setTimeout(() => {
        setMessage("");
      }, 2000);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      await getModuleData();
    }
  };
  const handleRemoveSubModule = async (id) => {
    try {
      let sendData = {
        _id: id,
      };
      const res = await axios.post(
        "http://localhost:5000/api/submodules/delete",
        sendData
      );
      setMessageClass("absolute top-5 ml-[45%] text-red-500");
      setMessage(res.data.message);

      setTimeout(() => {
        setMessage("");
      }, 2000);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      await getModuleData();
      setIsmoduleId("");
    }
  };
  const handleRemoveActivity = async (id) => {
    try {
      let sendData = {
        _id: id,
      };
      const res = await axios.post(
        "http://localhost:5000/api/activities/delete",
        sendData
      );
      setMessageClass("absolute top-5 ml-[45%] text-green-500");
      setMessage(res.data.message);

      setTimeout(() => {
        setMessage("");
      }, 2000);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      await getModuleData();
    }
  };
  const CreateNewModule = async () => {
    try {
      let sendData = {
        courseId: course,
        title: "Module",
      };
      const res = await axios.post(
        "http://localhost:5000/api/modules",
        sendData
      );
      setMessageClass("absolute top-5 ml-[45%] text-green-500");
      setMessage("Module Created Successfully!!");

      setTimeout(() => {
        setMessage("");
      }, 2000);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      await getModuleData();
    }
  };
  const CreateNewSubModule = async () => {
    if (ismoduleId) {
      try {
        let sendData = {
          moduleId: ismoduleId,
          title: "Topic",
        };
        const res = await axios.post(
          "http://localhost:5000/api/submodules",
          sendData
        );
        setMessageClass("absolute top-5 ml-[45%] text-green-500");
        setMessage("Submodule Created Successfully!!");

        setTimeout(() => {
          setMessage("");
        }, 2000);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        await getModuleData();
        setIsmoduleId("");
      }
    } else {
      setMessageClass("absolute top-5 ml-[45%] text-red-500");
      setMessage("Please Select a Module");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };
  const CreateNewActivity = async (type) => {
    if (isSubmoduleId) {
      console.log("inside", userInfo._id);
      try {
        let sendData = {
          title: type,
          teacherId: userInfo._id,
          type: type,
          submoduleId: isSubmoduleId,
          courseId: course,
        };
        const res = await axios.post(
          "http://localhost:5000/api/activities/create",
          sendData
        );
        setMessageClass("absolute top-5 ml-[45%] text-green-500");
        setMessage(`${type} Created Successfully!!`);

        setTimeout(() => {
          setMessage("");
        }, 2000);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        await getModuleData();
        setIsmoduleId("");
        setIsSubmoduleId("");
      }
    } else {
      setMessageClass("absolute top-5 ml-[45%] text-red-500");
      setMessage("Please Select a SubModule");

      setTimeout(() => {
        setMessage("");
      }, 2000);
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
    setOpenItemsubId("");
    setOpenItemactId("");
  };
  const [openItemsubId, setOpenItemsubId] = useState(null);
  const handleDropdownToggleSub = (itemId) => {
    setOpenItemsubId((prevopenItemsubId) =>
      prevopenItemsubId === itemId ? null : itemId
    );
    setOpenItemId("");
    setOpenItemactId("");
  };
  const [openItemactId, setOpenItemactId] = useState(null);
  const handleDropdownToggleAct = (itemId) => {
    setOpenItemactId((prevopenItemsubId) =>
      prevopenItemsubId === itemId ? null : itemId
    );
    setOpenItemId("");
    setOpenItemsubId("");
  };

  return (
    <>
      {/* Main Container */}
      <div className="mt-24  sm:mt-18 md:mt-5">
        {/* Question Container */}
        <div className="flex justify-between h-full m-3 mt-10 md:px-3 xl:mx-12 md:mx-2">
          {/* First Container */}
          <div className=" border-solid border-2 border-gray-400 rounded-3xl w-full md:mr-5 mr-2 relative">
            {/* Icons Top Bar Clickable */}
            <div className="flex justify-end dark:text-white text-gray-800">
              <Tooltip title="Create New Module" placement="top">
                <span>
                  <MdAddCircle
                    onClick={CreateNewModule}
                    className="m-6 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl"
                  />
                </span>
              </Tooltip>
              <Tooltip title="Create New SubModule" placement="top">
                <span>
                  <AiOutlineSubnode
                    onClick={CreateNewSubModule}
                    className="m-6 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl "
                  />
                </span>
              </Tooltip>
              <FiSave className="m-6 invisible mr-10 md:mr-16 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl" />
            </div>
            <div className={messageClass}>{message}</div>
            <div className="flex w-full">
              {/* Icons Side Bar Drag N Drop */}

              <div className="absolute min-w-max bg-white dark:bg-secondary-dark-bg dark:text-white text-gray-800 text-2xl flex flex-col justify-center align-middle border-solid border-2 border-gray-400 rounded-2xl rounded-tl-none rounded-bl-none h-4/4 p-3">
                <Tooltip title="Assignment" placement="right">
                  <span>
                    <LuPcCase
                      onClick={() => CreateNewActivity("Assignment")}
                      className="mb-5 mx-auto cursor-pointer hover:opacity-75 text-orange-500"
                    />
                  </span>
                </Tooltip>
                <Tooltip title="Quiz" placement="right">
                  <span>
                    <MdQuiz
                      onClick={() => CreateNewActivity("Quiz")}
                      className="mb-5 mx-auto cursor-pointer text-purple-500 hover:opacity-75"
                    />
                  </span>
                </Tooltip>
                <Tooltip title="Online Session" placement="right">
                  <span>
                    <SlMicrophone
                      onClick={() => CreateNewActivity("online session")}
                      className="mb-5 mx-auto cursor-pointer text-blue-400 hover:opacity-75"
                    />
                  </span>
                </Tooltip>

                <BiCommentMinus className="mb-5 mx-auto" />
                <BsCalculator className="mb-5 mx-auto" />
                <LuFileText className=" mx-auto" />
              </div>

              {/* Sub Container 1 */}

              <div className="bg-white flex flex-wrap min-h-[50vh]   max-[850px]:ml-5 ml-14 sm:ml-16 lg:ml-14 text-white  dark:bg-[#20232A] rounded-lg  w-6/6 ">
                {/* insert mods here  */}
                {module &&
                  module.map((mods) => {
                    const isActive = mods._id === ismoduleId;
                    return (
                      <div key={mods._id}>
                        <div
                          onClick={() => {
                            setIsmoduleId(mods._id);
                          }}
                          className={`ml-10 mb-5 bg-gradient-to-b from-[#242830] to-[#33373E]  p-5 rounded-3xl text-xl  w-[400px] 
                        ${isActive ? "border-green-500 border" : ""}`}
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
                            <div className="absolute max-[850px]:w-[200px] max-[850px]:ml-[40%] ml-[17%]">
                              <p
                                onClick={() => handleRemoveModule(mods._id)}
                                className="z-1 cursor-pointer max-[850px]:ml-[62%] rounded-t-2xl  flex hover:opacity-80  bg-red-500 p-2  text-sm"
                              >
                                <RiDeleteBin3Line className="mt-0.5 mr-2" />{" "}
                                <span> Delete</span>
                              </p>
                              <p
                                onClick={() => {
                                  setBtnEditOpen(true);
                                  setModsTitle(mods.title);
                                }}
                                className="z-1 cursor-pointer max-[850px]:ml-[62%] rounded-b-2xl  flex  hover:opacity-75  bg-yellow-500 p-2  text-sm"
                              >
                                <BiEdit className="mt-0.5 mr-2" />{" "}
                                <span> Edit</span>
                              </p>
                              {btnEditOpen && (
                                <EditBtn
                                  setBtnEditOpen={setBtnEditOpen}
                                  modulehead={modsTitle}
                                  course={course}
                                  modsId={ismoduleId}
                                  onMoveButtonClick={handleEditModule}
                                />
                              )}
                            </div>
                          )}
                          {mods.submoduleId.map((submodule, index) => {
                            // console.log(submodule.activityId);
                            const isActive = submodule._id === isSubmoduleId;
                            return (
                              <div
                                key={submodule._id}
                                onClick={() => setIsSubmoduleId(submodule._id)}
                                className={`border mb-2 bg-[#33373E] border-gray-500 text-2xl ml-2 mr-2 text-center ${
                                  isActive ? "border-green-500" : ""
                                }`}
                              >
                                <p className="ml-2 font-bold text-xl flex justify-center">
                                  <span className="text-center ">
                                    {submodule.title}
                                  </span>
                                  <BsThreeDotsVertical
                                    className="text-2xl mb-1 cursor-pointer right-0 mt-1"
                                    onClick={(event) => {
                                      // event.stopPropagation();
                                      // Handle the click event logic here
                                      handleDropdownToggleSub(submodule._id);
                                    }}
                                  />
                                </p>
                                {openItemsubId === submodule._id && (
                                  <div className="absolute max-[850px]:w-[200px] max-[850px]:ml-[10%]   ml-[10%]">
                                    <p
                                      onClick={() =>
                                        handleRemoveSubModule(submodule._id)
                                      }
                                      className="z-1 cursor-pointer max-[850px]:ml-[62%] rounded-t-2xl  flex hover:opacity-80  bg-red-500 p-2  text-sm"
                                    >
                                      <RiDeleteBin3Line className="mt-0.5 mr-2" />{" "}
                                      <span> Delete</span>
                                    </p>
                                    <p
                                      onClick={() => {
                                        setBtnIsSubOpen(true);
                                        setSubTitle(submodule.title);
                                      }}
                                      className="z-1 cursor-pointer max-[850px]:ml-[62%]  flex  hover:opacity-75  bg-gray-500 p-2  text-sm"
                                    >
                                      <MdMoveDown className="mt-0.5 mr-2" />{" "}
                                      <span> Move</span>
                                    </p>
                                    <p
                                      onClick={() => {
                                        setBtnEditSubOpen(true);
                                        console.log(submodule.title);
                                        setSubTitle(submodule.title);
                                      }}
                                      className="z-1 cursor-pointer max-[850px]:ml-[62%] rounded-b-2xl  flex  hover:opacity-75  bg-yellow-500 p-2  text-sm"
                                    >
                                      <BiEdit className="mt-0.5 mr-2" />{" "}
                                      <span> Edit</span>
                                    </p>
                                    {btnIsSubOpen && (
                                      <ButtonMoveSub
                                        setBtnIsSubOpen={setBtnIsSubOpen}
                                        submoduleTitle={subTitle}
                                        course={course}
                                        modsId={ismoduleId}
                                        subId={isSubmoduleId}
                                        onMoveButtonClick={handleMoveSubs}
                                      />
                                    )}
                                    {btnEditSubOpen && (
                                      <EditBtnSub
                                        setBtnEditSubOpen={setBtnEditSubOpen}
                                        subTitle={subTitle}
                                        course={course}
                                        subId={isSubmoduleId}
                                        onMoveButtonClick={handleEditSubs}
                                      />
                                    )}
                                  </div>
                                )}

                                {submodule.activityId.map((activity) => {
                                  return (
                                    <div
                                      key={activity._id}
                                      onClick={() =>
                                        setIsActivityId(activity._id)
                                      }
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
                                      <p
                                        className={
                                          activity.type === "Assignment"
                                            ? "ml-5 flex justify-between text-orange-500 "
                                            : activity.type === "Quiz"
                                            ? "ml-5 flex justify-between text-purple-500"
                                            : activity.type === "online session"
                                            ? "ml-5 flex justify-between text-blue-400"
                                            : activity.type ===
                                              "Recorded Session"
                                            ? "ml-5 flex justify-between text-blue-400"
                                            : "ml-5 flex justify-between text-gray-400"
                                        }
                                      >
                                        {activity.title}
                                        <BsThreeDotsVertical
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            // Handle the click event logic here
                                            handleDropdownToggleAct(
                                              activity._id
                                            );
                                          }}
                                          className="text-l cursor-pointer text-white mt-1 "
                                        />
                                      </p>
                                      {openItemactId === activity._id && (
                                        <div className="absolute max-[850px]:w-[200px] max-[850px]:ml-[35%]  ml-[16%]">
                                          <p
                                            onClick={() =>
                                              handleRemoveActivity(activity._id)
                                            }
                                            className="z-1 cursor-pointer max-[850px]:ml-[62%] rounded-t-2xl  flex hover:opacity-80  bg-red-500 p-2  text-sm"
                                          >
                                            <RiDeleteBin3Line className="mt-0.5 mr-2" />{" "}
                                            <span> Delete</span>
                                          </p>
                                          <p
                                            onClick={() => {
                                              setBtnIsOpen(true);
                                              setActivTitle(activity.title);
                                            }}
                                            className="z-1 cursor-pointer max-[850px]:ml-[62%] rounded-b-2xl  flex  hover:opacity-75  bg-gray-500 p-2  text-sm"
                                          >
                                            <MdMoveDown className="mt-0.5 mr-2" />{" "}
                                            <span> Move</span>
                                          </p>
                                          {btnIsOpen && (
                                            <ButtonMove
                                              setBtnIsOpen={setBtnIsOpen}
                                              activityTitle={activTitle}
                                              course={course}
                                              subsId={isSubmoduleId}
                                              activeId={isActivityId}
                                              onMoveButtonClick={
                                                handleMoveButtonClick
                                              }
                                            />
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
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

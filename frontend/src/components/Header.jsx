import React, { useEffect, useState, useRef } from "react";
import { BsFillMicFill } from "react-icons/bs";
import { AiFillFileText, AiOutlineSubnode } from "react-icons/ai";
import { RiSurveyFill, RiDeleteBin3Line } from "react-icons/ri";
import { MdViewModule, MdDocumentScanner } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import axios from "axios";

const SaveIcons = [
  {
    icon: <IoMdAddCircleOutline />,
    onClick: () => {
      console.log("asd");
    },
  },
  {
    icon: <AiOutlineSubnode />,
    onClick: () => {},
  },
  {
    icon: <FiSave />,
    onClick: () => {
      // Handle onClick logic for FiSave
    },
  },
];

const Module = (course) => {
  const { courseID, course_name, activeMenu, activityID, setActivity_ID } =
    useStateContext();

  const activityRef = useRef();

  const [activId, setActivId] = useState();

  const [module, setModule] = useState();
  const [submodule, setSubmodule] = useState([]);
  const [activity, setActivity] = useState();

  const getModuleData = async () => {
    let sendData = {
      courseId: course.course,
    };
    const res = await axios.post(
      "http://localhost:5000/api/modules/course",
      sendData
    );
    setModule(res.data);
    // console.log("asd", res.data[0].submoduleId[0].activityId[0]);
    // setActivity(res.data[0].submoduleId[0].activityId[0]);
    await addmods(module);
  };
  const addmods = (ddd) => {
    setActivity(ddd);
    // console.log(activity);
  };

  const moveSubs = async (result) => {
    try {
      if (!result.destination) {
        return;
      }
      let sendData = {
        id: result.draggableId,
        newmodsId: result.destination.droppableId,
        oldmodsId: result.source.droppableId,
      };
      const res = await axios.post(
        " http://localhost:5000/api/submodules/update",
        sendData
      );
    } catch (error) {
      console.log(error);
    } finally {
      await getModuleData();
    }
  };
  const getActivityData = async () => {
    let sendData = {
      courseId: course.course,
    };
    const res = await axios.post(
      "http://localhost:5000/api/activities/course",
      sendData
    );

    setActivity(res.data);
  };
  const forLoop = (asd) => {};

  useEffect(() => {
    getModuleData();
    getActivityData();
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
  return (
    <>
      <div className="my-[8%]">
        <div className="ml-10 max-[850px]:ml-0 bg-secondary-dark-bg mt-10 rounded p-4 text-2xl flex">
          <ul className=" rounded">
            <li className="mb-5 text-green-500">
              <MdViewModule className="cursor-pointer" />
            </li>
            <li className="mb-5 text-green-300">
              <MdDocumentScanner className="cursor-pointer" />
            </li>
            <li className="mb-5">
              <hr />
            </li>
            <li className="mb-5 text-blue-500">
              <BsFillMicFill className="cursor-pointer" />
            </li>
            <li className="mb-5 text-white">
              <AiFillFileText className="cursor-pointer" />
            </li>
            <li className="mb-5 text-orange-500">
              <RiSurveyFill className="cursor-pointer" />
            </li>
          </ul>
        </div>
      </div>
      <DragDropContext onDragEnd={(result) => moveSubs(result)}>
        <Droppable droppableId="IconList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={iconsClass}
            >
              <ul className="flex text-white text-2xl">
                {SaveIcons.map((item, index) => (
                  <Draggable
                    key={index}
                    index={index}
                    draggableId={`iconL - ${index}`}
                  >
                    {(provided) => (
                      <li
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={`mr-10 ${
                          index === 0 ? "max-[850px]:mr-8" : ""
                        }`}
                      >
                        {React.cloneElement(item.icon, {
                          onClick: item.onClick,
                          className: "cursor-pointer",
                        })}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
        <div className="my-[5%] max-[850px]:flex-col rounded-3xl text-white flex border-gray-500 border w-full ">
          {module &&
            module.map((mods) => {
              // console.log("res", mods.submoduleId);
              return (
                <Droppable key={mods._id} droppableId={mods._id}>
                  {(provided, snapShot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="ml-10 mb-5 rounded-3xl text-xl  w-[400px] border-gray-500 border mt-10"
                    >
                      <p className="ml-5 mt-2 flex text-xl mb-2 justify-between">
                        {mods.title}
                        <button onClick={() => handleDropdownToggle(mods._id)}>
                          <BsThreeDots className="text-l mt-1 mr-4" />
                        </button>
                      </p>
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
                          <Draggable
                            draggableId={submodule._id}
                            index={index}
                            key={submodule._id}
                          >
                            {(provided, snapShot) => (
                              <div
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                className="border mb-1 border-gray-500 text-2xl ml-2 mr-2 text-center"
                              >
                                <p className="ml-2 flex justify-center">
                                  {submodule.title}
                                  <BsThreeDotsVertical
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      // Handle the click event logic here
                                      handleDropdownToggleSub(submodule._id);
                                    }}
                                    {...provided.draggableProps}
                                    style={{
                                      pointerEvents: snapShot.isDragging
                                        ? "none"
                                        : "auto",
                                    }}
                                    className="text-l mt-1"
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
                                      ref={activityRef}
                                      onClick={() => {
                                        setActivity_ID(activity._id);
                                        console.log(activId);
                                      }}
                                      className={
                                        activity.type === "Assignment"
                                          ? "border-2 border-orange-500 mb-2 "
                                          : activity.type === "Quiz"
                                          ? "border-2 border-purple-500 mb-2"
                                          : activity.type === "online session"
                                          ? "border-2 border-blue-400 mb-2"
                                          : activity.type === "Recorded Session"
                                          ? "border-2 border-blue-400 mb-2"
                                          : "border border-gray-400 "
                                      }
                                    >
                                      <p className="ml-5 flex justify-between">
                                        {activity.title}
                                        <BsThreeDotsVertical
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            // Handle the click event logic here
                                            handleDropdownToggleAct(
                                              activity._id
                                            );
                                          }}
                                          {...provided.draggableProps}
                                          style={{
                                            pointerEvents: snapShot.isDragging
                                              ? "none"
                                              : "auto",
                                          }}
                                          className="text-l mt-1 "
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
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
        </div>
      </DragDropContext>
    </>
  );
};

export default Module;

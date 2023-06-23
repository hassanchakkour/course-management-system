import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStateContext } from "../../contexts/ContextProvider";
import { Tooltip } from "@mui/material";
import axios from "axios";
import MultipleChoice from "../QuestionsModals/MultipleChoice";

import { MdAddCircle } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiSave } from "react-icons/fi";

import { BsThreeDots } from "react-icons/bs";

import { TfiList } from "react-icons/tfi";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { RiCheckDoubleFill } from "react-icons/ri";
import { BiCommentMinus } from "react-icons/bi";
import { BsCalculator } from "react-icons/bs";
import { LuFileText } from "react-icons/lu";

import { MdDelete } from "react-icons/md";

const Questions = () => {
  const { currentColor, activityID } = useStateContext();
  const [showModal, setShowModal] = useState(false);
  // walaa
  const [showTrueFalse, setShowTrueFalse] = useState(false);

  const links = [
    {
      title: "Multiple Choice",
      icon: <TfiList />,
      color: "#8e5dfd",
    },
    {
      title: "Multiple Response",
      icon: <RiCheckboxMultipleFill />,
      color: "#5d69fd",
    },
    {
      title: "True or False",
      icon: <RiCheckDoubleFill />,
      color: "#3da4fc",
    },
    {
      title: "Short Answers",
      icon: <BiCommentMinus />,
      color: "#2c8063",
    },
    {
      title: "Numerical",
      icon: <BsCalculator />,
      color: "#d07e4b",
    },
    {
      title: "Essay",
      icon: <LuFileText />,
      color: "#d04b4b",
    },
  ];
  console.log(links.icon);

  const activityId = localStorage.getItem("activity_id", activityID);

  const { userInfo } = useSelector((state) => state.auth);

  const [questionsNbr, setQuestionsNbr] = useState(0);

  const [multipleChoiceNbr, setMultipleChoiceNbr] = useState(0);
  const [multipleResponceNbr, setMultipleResponceNbr] = useState(0);
  const [trueFalseNbr, setTrueFalseNbr] = useState(0);
  const [shortAnswersNbr, setShortAnswersNbr] = useState(0);
  const [numericalNbr, setNumericalNbr] = useState(0);
  const [essayNbr, setEssayNbrNbr] = useState(0);

  const [gradeNbr, setGradeNbr] = useState(0);
  const [data, setData] = useState([]);
  const [iconType, setIconType] = useState("");

  const [showDiv, setShowDiv] = useState(false);
  const [disabledInput, setDisabledInput] = useState(true);
  const [questionTitle, setQuestionTitle] = useState("Question");

  const inputElement = useRef();
  const focusInput = () => {
    inputElement.current.focus();
  };

  const handleInputChange = (e) => {
    setQuestionTitle(e.target.value);
  };

  let sendData = { activityId: "64831840f58d735189094350" };

  const getQuestionData = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/questions/activity",
      sendData
    );
    setQuestionsNbr(res.data.length);

    let multipleChoiceTemp = 0;
    let multipleResponceTemp = 0;
    let trueFalseTemp = 0;
    let shortAnswersTemp = 0;
    let numericalTemp = 0;
    let essayTemp = 0;

    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].type === "Multiple Choice") {
        multipleChoiceTemp += 1;
      }
      if (res.data[i].type === "Multiple Response") {
        multipleResponceTemp += 1;
      }
      if (res.data[i].type === "True or False") {
        trueFalseTemp += 1;
      }
      if (res.data[i].type === "Short Answers") {
        shortAnswersTemp += 1;
      }
      if (res.data[i].type === "Numerical") {
        numericalTemp += 1;
      }
      if (res.data[i].type === "Essay") {
        essayTemp += 1;
      }
    }
    setMultipleChoiceNbr(multipleChoiceTemp);
    setMultipleResponceNbr(multipleResponceTemp);
    setTrueFalseNbr(trueFalseTemp);
    setShortAnswersNbr(shortAnswersTemp);
    setNumericalNbr(numericalTemp);
    setEssayNbrNbr(essayTemp);

    let gradeSum = 0;
    for (let i = 0; i < res.data.length; i++) {
      gradeSum += res.data[i].point;
    }
    setGradeNbr(gradeSum);
    setData(res.data);
  };

  const handleRemoveQuestion = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/questions/delete/${id}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      await getQuestionData();
    }
  };

  useEffect(() => {
    getQuestionData();
  }, []);

  const iconQuestionStyle =
    "md:text-xl dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl";
  console.log(iconType);

  const addMultipleChoice = async (data) => {
    console.log("This is from child", data);
    if (
      data.title != "" &&
      data.content != "" &&
      data.point != "" &&
      data.options != "" &&
      data.correctOption != ""
    ) {
      try {
        const res = await axios.post("http://localhost:5000/api/questions/", {
          sendData,
          data,
        });
      } catch (error) {
        console.log(error);
      } finally {
        getQuestionData();
      }
    }
  };

  return (
    <>
      {/* Main Container */}
      <div className="mt-24  sm:mt-18 md:mt-5">
        {/* Summary Container */}
        <div className="flex mx-3 md:mx-10 justify-around md:justify-between px-3">
          <p className="dark:text-white text-gray-800 uppercase font-bold text-2xl md:text-3xl ml-3 mr-6">
            summary
          </p>
          {/* Summary Container Second Part*/}
          <div className="flex">
            <div>
              <span
                style={{ textDecorationColor: `${currentColor}` }}
                className="md:text-5xl text-4xl dark:text-white text-gray-800 font-bold overline pt-2"
              >
                {questionsNbr}
              </span>
              <p className="uppercase font-bold text-base md:text-lg text-gray-800 dark:text-gray-300 md:mt-2">
                questions
              </p>
            </div>
            <div className="flex flex-wrap">
              <div className="ml-10 mb-5">
                <p className="whitespace-nowrap uppercase md:text-base text-sm dark:text-gray-400 text-gray-500">
                  multiple choice
                </p>
                <p className="whitespace-nowrap uppercase md:text-base text-sm dark:text-gray-400 text-gray-500">
                  multiple response
                </p>
                <p className="whitespace-nowrap uppercase md:text-base text-sm dark:text-gray-400 text-gray-500">
                  true - false
                </p>
              </div>
              <div className="flex flex-col">
                <span className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4">
                  {multipleChoiceNbr}
                </span>
                <span className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4">
                  {multipleResponceNbr}
                </span>
                <span className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4">
                  {trueFalseNbr}
                </span>
              </div>

              <div className="ml-10">
                <p className="whitespace-nowrap uppercase md:text-base text-sm dark:text-gray-400 text-gray-500">
                  short answers
                </p>
                <p className="whitespace-nowrap uppercase md:text-base text-sm dark:text-gray-400 text-gray-500">
                  numerical
                </p>
                <p className="whitespace-nowrap uppercase md:text-base text-sm dark:text-gray-400 text-gray-500">
                  essay
                </p>
              </div>
              <div className="flex flex-col">
                <span className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4">
                  {shortAnswersNbr}
                </span>
                <span className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4">
                  {numericalNbr}
                </span>
                <span className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4">
                  {essayNbr}
                </span>
              </div>
            </div>{" "}
            <div className="border border-gray-400 h-20 ml-7 -mt-3.5 opacity-50"></div>
            <div className="md:ml-14 ml-8 lg:mr-36 xl:mr-56">
              <span
                style={{ textDecorationColor: `${currentColor}` }}
                className="md:text-5xl text-4xl dark:text-white text-gray-800 font-bold overline pt-2"
              >
                {gradeNbr}
              </span>
              <p className="uppercase font-bold text-base md:text-lg text-gray-800 dark:text-gray-300 md:mt-2">
                grade
              </p>
            </div>
          </div>
        </div>
        {/* End of Summary Container */}

        {/* Question Container */}
        <div className="flex justify-between h-full m-3 mt-10 md:px-3 xl:mx-12 md:mx-2">
          {/* First Container */}
          <div className="h-[60vh] border-solid border-2 border-gray-400 rounded-3xl w-3/4 md:mr-5 mr-2 relative">
            {/* Icons Top Bar Clickable */}
            <div className="flex justify-end dark:text-white text-gray-800">
              <MdAddCircle
                className="m-6 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl"
                onClick={() => setShowDiv(true)}
              />
              <MdOutlineModeEdit
                onClick={() => {
                  setDisabledInput(false);
                  focusInput();
                }}
                className="m-6 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl "
              />
              <FiSave
                onClick={() => setDisabledInput(true)}
                className="m-6 mr-10 md:mr-16 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl"
              />
            </div>
            <div className="flex w-full">
              {/* Icons Side Bar Drag N Drop */}
              <div className="absolute min-w-max bg-white dark:bg-secondary-dark-bg dark:text-white text-gray-800 text-2xl flex flex-col justify-center align-middle border-solid border-2 border-gray-400 rounded-2xl rounded-tl-none rounded-bl-none h-2/3 w-1/12 p-3">
                {links.map((item) => (
                  <Tooltip
                    key={item.title}
                    title={item.title}
                    placement="right"
                  >
                    <div className="mx-auto my-auto">
                      <NavLink
                        // to={"/questionsBank"}
                        style={{ color: item.color }}
                        onClick={() => {
                          setIconType(item.title);
                          {
                            item.title == "Multiple Choice"
                              ? setShowModal(true)
                              : setShowModal(false);
                          }
                          {
                            item.title == "True or False"
                              ? setShowTrueFalse(true)
                              : setShowTrueFalse(false);
                          }
                        }}
                      >
                        {item.icon}
                      </NavLink>
                    </div>
                  </Tooltip>
                ))}
                {showModal && (
                  <MultipleChoice
                    setShowModal={setShowModal}
                    onSubmit={addMultipleChoice}
                  />
                )}
              </div>
              {/* Sub Container 1 */}
              <div className="bg-white absolute ml-14 sm:ml-16 lg:ml-28 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-lg h-2/3 w-5/6 p-4">
                <div className="flex">
                  <p className="text-lg">
                    {
                      <input
                        type="text"
                        disabled={disabledInput}
                        ref={inputElement}
                        value={questionTitle}
                        onChange={handleInputChange}
                        className="dark:bg-secondary-dark-bg bg-white dark:text-white text-gray-800 w-32 focus:outline-none focus:ring-2 focus:ring-[#5BD0B0] focus:border-transparent p-1 rounded-lg"
                      />
                    }
                  </p>
                  <div className="flex items-center flex-grow mx-2">
                    <div className="border-b border-gray-500 w-full"></div>
                  </div>
                  <BsThreeDots className="md:text-xl mt-1 cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl" />
                </div>
                {showDiv && (
                  <div className="flex justify-center  h-5/6 border-solid border-2 border-gray-400 rounded-md w-full mt-3">
                    <p className="capitalize self-center dark:text-white text-gray-800 sm:text-lg text-sm opacity-30">
                      please select the type of your question
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Question Bank */}
          <div className="h-[60vh] flex flex-col justify-start align-middle border-solid border-2 border-gray-400 rounded-3xl rounded-tr-none rounded-br-none w-1/4 md:ml-5 ml-2 overflow-y-scroll p-1 sm:p-2">
            {/* Question Container */}
            {data &&
              data.map((question) => (
                <div
                  key={question._id}
                  className="bg-white mx-auto sm:mt-2 mt-3 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-xl sm:h-2/6 h-1/6 w-5/6 sm:p-4 p-1 pt-2"
                >
                  <div className="flex justify-around">
                    {question.type === "Multiple Choice" ? (
                      <TfiList className={iconQuestionStyle} />
                    ) : null}
                    {question.type === "Multiple Response" ? (
                      <RiCheckboxMultipleFill className={iconQuestionStyle} />
                    ) : null}
                    {question.type === "True or False" ? (
                      <RiCheckDoubleFill className={iconQuestionStyle} />
                    ) : null}
                    {question.type === "Short Answers" ? (
                      <BiCommentMinus className={iconQuestionStyle} />
                    ) : null}
                    {question.type === "Numerical" ? (
                      <BsCalculator className={iconQuestionStyle} />
                    ) : null}
                    {question.type === "Essay" ? (
                      <LuFileText className={iconQuestionStyle} />
                    ) : null}

                    <p className="lg:-mt-1 capitalize text-center dark:text-white text-gray-800 lg:text-lg text-xs ">
                      {question.title}
                    </p>
                    <MdDelete
                      className="md:text-xl cursor-pointer dark:hover:text-red-400 hover:text-red-400 dark:hover:drop-shadow-xl hover:drop-shadow-xl"
                      onClick={() => {
                        handleRemoveQuestion(question._id);
                        // console.log(question._id);
                      }}
                    />
                  </div>
                  <div className="flex items-center flex-grow my-2">
                    <div className="border-b border-gray-500 w-full"></div>
                  </div>
                  <p
                    style={{ color: `${currentColor}` }}
                    className="lg:text-lg text-xs"
                  >
                    {question.point}
                    {" points"}
                  </p>
                </div>
              ))}
            {/* End Of Question Container */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;

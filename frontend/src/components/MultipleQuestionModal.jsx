import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";
import axios from "axios";
import "./multipleQuestionModal.css";
import { BiMessageError } from "react-icons/bi";

import { TfiList } from "react-icons/tfi";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { RiCheckDoubleFill } from "react-icons/ri";
import { BiCommentMinus } from "react-icons/bi";
import { BsCalculator } from "react-icons/bs";
import { LuFileText } from "react-icons/lu";

import { SiHelpscout } from "react-icons/si";

const MultipleQuestionModal = ({
  setShowMutipleQuestionModal,
  handleSuccessMultipleQuestionMessage,
}) => {
  const { activityID } = useStateContext();
  const [showWelcome, setShowWelcome] = useState(false);
  const [showText, setShowText] = useState(false);
  const [iconType, setIconType] = useState("");
  const [questionNum, setQuestionNum] = useState(0);

  const [multipleChoice_Nbr, setMultipleChoiceNbr] = useState(0);
  const [multipleResponce_Nbr, setMultipleResponceNbr] = useState(0);
  const [trueFalse_Nbr, setTrueFalseNbr] = useState(0);
  const [shortAnswers_Nbr, setShortAnswersNbr] = useState(0);
  const [numerical_Nbr, setNumericalNbr] = useState(0);
  const [essay_Nbr, setEssayNbr] = useState(0);

  const [isMultipleChoiceSelected, setIsMultipleChoiceSelected] =
    useState(false);
  const [isMultipleResponceSelected, setIsMultipleResponceSelected] =
    useState(false);
  const [isTrueFalseSelected, setIsTrueFalseSelected] = useState(false);
  const [isShortAnswersSelected, setIsShortAnswersSelected] = useState(false);
  const [isNumericalSelected, setIsNumericalSelected] = useState(false);
  const [isEssaySelected, setIsEssaySelected] = useState(false);

  const [isIconActive, setIsIconActive] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);
  const [errorConfirmMessage, setErrorConfirmMessage] = useState(false);
  const [questionsArray, setQuestionsArray] = useState([]);

  const activityId = localStorage.getItem("activity_id", activityID);
  const overAll = localStorage.getItem("overAllPoints");

  const links = [
    {
      title: "Multiple Choice",
      icon: <TfiList />,
      color: "#8e5dfd",
      state: isMultipleChoiceSelected,
      stateNbr: multipleChoice_Nbr,
    },
    {
      title: "Multiple Response",
      icon: <RiCheckboxMultipleFill />,
      color: "#5d69fd",
      state: isMultipleResponceSelected,
      stateNbr: multipleResponce_Nbr,
    },
    {
      title: "True or False",
      icon: <RiCheckDoubleFill />,
      color: "#3da4fc",
      state: isTrueFalseSelected,
      stateNbr: trueFalse_Nbr,
    },
    {
      title: "Short Answers",
      icon: <BiCommentMinus />,
      color: "#2c8063",
      state: isShortAnswersSelected,
      stateNbr: shortAnswers_Nbr,
    },
    {
      title: "Numerical",
      icon: <BsCalculator />,
      color: "#d07e4b",
      state: isNumericalSelected,
      stateNbr: numerical_Nbr,
    },
    {
      title: "Essay",
      icon: <LuFileText />,
      color: "#d04b4b",
      state: isEssaySelected,
      stateNbr: essay_Nbr,
    },
  ];

  let totalQuestion_Nbr = 0;
  for (let i = 0; i < links.length; i++) {
    totalQuestion_Nbr += parseInt(links[i].stateNbr);
  }

  const singleQuestionPoint = Math.floor(overAll / totalQuestion_Nbr);

  useEffect(() => {
    const typingDelay = 50; // Delay between each character typing
    const welcomeMessage =
      "Welcome to our professionally curated quiz questions!";
    let currentIndex = 0;
    let tempWelcome = "";

    const typingInterval = setInterval(() => {
      tempWelcome += welcomeMessage[currentIndex];
      setShowWelcome(tempWelcome);
      currentIndex++;

      if (currentIndex === welcomeMessage.length) {
        clearInterval(typingInterval);
      }
    }, typingDelay);
    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  // *********** Add Multiple Questions ************
  const addMultipleQuestions = () => {
    const submit = async () => {
      for (let i = 0; i < questionsArray.length; i++) {
        let sendData = {
          activityId: activityId,
          type: questionsArray[i],
          title: `Question ${i + 1}`,
          point: singleQuestionPoint,
        };
        try {
          const res = await axios.post(
            "http://localhost:5000/api/questions/multiple",
            sendData
          );
          console.log(res.data);
          handleSuccessMultipleQuestionMessage(true);
          // setSuccessMessage("Question Created Successfully");
          // setTimeout(() => setSuccessMessage(""), 2500);
        } catch (error) {
          console.log(error);
        }
        // finally {
        //   await getQuestionData();
        // }
      }
    };
    submit();
  };

  useEffect(() => {
    setTimeout(() => setShowText(true), 3500);
  }, []);

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative  -mt-12  my-6 mx-auto w-5/6 max-w-2xl ">
          {/*content*/}
          <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-gradient-to-b from-[#33373E] to-[#242830] outline-none focus:outline-none">
            {/*header*/}
            <div className=" w-full p-5  border-slate-200 rounded-t">
              <div>
                {showWelcome && (
                  <p className="font-mono text-2xl text-teal-200  mb-8">
                    {showWelcome}
                  </p>
                )}
              </div>

              <div className="relative bg-gradient-to-r from-gray-700 to-transparent  text-white  text-2xl flex  justify-between align-middle border-solid rounded-lg border-t-2  border-gray-600 filter drop-shadow-md  h-1/5 w-full py-2 ">
                {links.map((item) => {
                  const isActive = item.title == iconType;
                  return (
                    <Tooltip
                      key={item.title}
                      title={item.title}
                      placement="top"
                    >
                      <div
                        className={` mx-auto my-auto p-2.5 ${
                          isActive && isIconActive
                            ? "border  text-3xl fadeIn bg-gradient-to-b from-slate-700 to-slate-800 rounded-md   border-gray-500  ease-in-out transition-all duration-100"
                            : "hover:bg-gradient-to-r from-teal-700 to-teal-500 rounded  ease-linear transition-all duration-200"
                        }`}
                      >
                        <NavLink
                          className={"relative"}
                          style={{
                            color: isActive ? item.color : "#d1d5db",
                          }}
                          onClick={() => {
                            setIconType(item.title);
                            setIsIconActive(true);

                            {
                              iconType === "Multiple Choice"
                                ? setIsMultipleChoiceSelected(true)
                                : iconType === "True or False"
                                ? setIsTrueFalseSelected(true)
                                : iconType === "Multiple Response"
                                ? setIsMultipleResponceSelected(true)
                                : iconType === "Short Answers"
                                ? setIsShortAnswersSelected(true)
                                : iconType === "Numerical"
                                ? setIsNumericalSelected(true)
                                : iconType === "Essay"
                                ? setIsEssaySelected(true)
                                : 0;
                            }
                          }}
                        >
                          {item.icon}

                          {item.stateNbr != 0 && (
                            <div
                              className={`absolute p-2.5 text-gray-700 inline-flex items-center justify-center w-5 h-5 text-xs font-bold  bg-teal-400 border-1 border-gray-200 rounded-full -top-5 -right-5 `}
                            >
                              {item.stateNbr != 0 && item.stateNbr}
                            </div>
                          )}
                          <span className=" whitespace-nowrap tracking-wider fadeIn absolute font-mono text-white inline-flex items-center justify-center w-[120%] h-10 text-xs  top-11 -right-1  ">
                            {isActive & isIconActive ? item.title : ""}
                          </span>
                        </NavLink>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>

              <div className="mb-3 mt-8 pt-0">
                <input
                  type="number"
                  required
                  onChange={(e) => setQuestionNum(e.target.value)}
                  min="0"
                  value={questionNum}
                  placeholder="Add Number Of Questions"
                  className="px-3 mb-1 py-3 placeholder-slate-400 text-white relative bg-transparent rounded text-sm border-1 shadow outline-none focus:outline-none  w-full"
                />
              </div>
              <div>
                {showText && (
                  <div className="flex mt-8">
                    <SiHelpscout className="mr-2 text-teal-500 fadeIn" />
                    <p
                      className={`text-xl text-gray-200 font-semibold mb-3 fadeIn`}
                    >
                      Kindly make your selection of the{" "}
                      <span className="italic font-bold text-teal-500">
                        question type
                      </span>{" "}
                      and provide the{" "}
                      <span className="italic font-bold text-teal-500">
                        respective number
                      </span>{" "}
                      .
                    </p>
                  </div>
                )}
                <button
                  style={{ filter: `drop-shadow(0px 0px 3px #6ee7b7)` }}
                  className="bg-gradient-to-r from-teal-700 to-teal-500 mt-1 mb-2 ml-5 hover:bg-gradient-to-b text-sm text-white py-2 px-4 rounded-full ease-linear hover:transition-colors duration-300"
                  type="button"
                  onClick={() => {
                    if (isIconActive) {
                      iconType === "Multiple Choice"
                        ? setMultipleChoiceNbr(questionNum)
                        : iconType === "True or False"
                        ? setTrueFalseNbr(questionNum)
                        : iconType === "Multiple Response"
                        ? setMultipleResponceNbr(questionNum)
                        : iconType === "Short Answers"
                        ? setShortAnswersNbr(questionNum)
                        : iconType === "Numerical"
                        ? setNumericalNbr(questionNum)
                        : iconType === "Essay"
                        ? setEssayNbr(questionNum)
                        : 0;
                    } else if (!isIconActive) {
                      setErrorMessage(true);
                      setTimeout(() => {
                        setErrorMessage(false);
                      }, 2500);
                    }
                    {
                      const updatedQuestionsArray = [...questionsArray]; // Create a copy of the original questionsArray
                      const existingCount = updatedQuestionsArray.filter(
                        (element) => element === iconType
                      ).length;

                      if (!updatedQuestionsArray.includes(iconType)) {
                        // If the iconType doesn't exist, add it with the specified number of occurrences
                        for (let j = 0; j < questionNum; j++) {
                          updatedQuestionsArray.push(iconType);
                        }
                      } else {
                        // If the iconType already exists, update the number of occurrences
                        const diff = questionNum - existingCount;

                        if (diff > 0) {
                          // Add additional occurrences
                          for (let j = 0; j < diff; j++) {
                            updatedQuestionsArray.push(iconType);
                          }
                        } else if (diff < 0) {
                          // Remove excess occurrences
                          for (let j = 0; j < Math.abs(diff); j++) {
                            const index =
                              updatedQuestionsArray.lastIndexOf(iconType);
                            updatedQuestionsArray.splice(index, 1);
                          }
                        }
                      }

                      // Update the questionsArray state with the updatedQuestionsArray
                      setQuestionsArray(updatedQuestionsArray);
                    }
                    console.log(questionsArray);
                    setIsIconActive(false);
                    setQuestionNum(0);
                  }}
                >
                  Add Question
                </button>
                {errorMessage && (
                  <div className="flex fadeIn text-red-500">
                    <BiMessageError className="text-2xl mt-0.5" />
                    <p className="capitalize font-semibold text-lg ml-2">
                      Please select your question type before add
                    </p>
                  </div>
                )}
                {errorConfirmMessage && (
                  <div className="flex fadeIn text-red-500">
                    <BiMessageError className="text-2xl mt-0.5" />
                    <p className="capitalize font-semibold text-lg ml-2">
                      Please add your question type before confirm
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center flex-grow -mt-5 ">
              <div
                style={{ filter: `drop-shadow(0px 0px 2px #6ee7b7)` }}
                className={`border-b border-solid border-teal-500  w-full mt-3`}
              ></div>
            </div>
            {/*footer*/}
            <div className="flex items-center  justify-center p-6 ">
              <button
                className="px-4 py-2 text-teal-500 hover:text-white hover:bg-teal-500 border rounded-full mr-2  border-teal-500  font-semibold capitalize  text-sm ease-linear transition-all duration-150 "
                type="button"
                onClick={() => setShowMutipleQuestionModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-teal-500  hover:bg-teal-600 text-sm text-white py-2 px-4 rounded-full ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  if (questionsArray.length == 0) {
                    setErrorConfirmMessage(true);
                    setTimeout(() => {
                      setErrorConfirmMessage(false);
                    }, 2500);
                  } else {
                    addMultipleQuestions();
                    setShowMutipleQuestionModal(false);
                  }
                  // console.log(questionsArray);
                  // console.log(singleQuestionPoint);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default MultipleQuestionModal;

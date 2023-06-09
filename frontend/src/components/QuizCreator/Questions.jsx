import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStateContext } from "../../contexts/ContextProvider";
import { Tooltip } from "@mui/material";
import axios from "axios";
import MultipleChoice from "../QuestionsModals/MultipleChoice";
import TrueOrFalse from "../QuestionsModals/TrueOrFalse";
import MultipleResponse from "../QuestionsModals/MultipleResponse";
import ShortAnswers from "../QuestionsModals/ShortAnswers";
import QuestionEssay from "../QuestionsModals/QuestionEssay";
import Numerical from "../QuestionsModals/Numerical";
import { MdAddCircle } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiSave } from "react-icons/fi";

import "./scrollStyle.css";

import { BsThreeDots } from "react-icons/bs";

import { TfiList } from "react-icons/tfi";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { RiCheckDoubleFill } from "react-icons/ri";
import { BiCommentMinus } from "react-icons/bi";
import { BsCalculator } from "react-icons/bs";
import { LuFileText } from "react-icons/lu";

import { BsQuestionOctagonFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const Questions = () => {
  const { currentColor, activityID } = useStateContext();
  const [showModal, setShowModal] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const [showTrueFalse, setShowTrueFalse] = useState(false);

  const [showMutlipleResponse, setShowMultipleResponse] = useState(false);
  const [showShortAnswer, setShowShortAnswer] = useState(false);
  const [showNumerical, setShownumerical] = useState(false);
  const [showEssay, setShowEssay] = useState(false);

  const [questionId, setQuestionId] = useState("");
  const [questionOptions, setQuestionOptions] = useState("");

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

  const activityId = localStorage.getItem("activity_id", activityID);
  console.log("activityId: ", activityId);

  const { userInfo } = useSelector((state) => state.auth);

  const [questionsNbr, setQuestionsNbr] = useState(0);

  const [multipleChoiceNbr, setMultipleChoiceNbr] = useState(0);
  const [multipleResponceNbr, setMultipleResponceNbr] = useState(0);
  const [trueFalseNbr, setTrueFalseNbr] = useState(0);
  const [shortAnswersNbr, setShortAnswersNbr] = useState(0);
  const [numericalNbr, setNumericalNbr] = useState(0);
  const [essayNbr, setEssayNbr] = useState(0);

  const [gradeNbr, setGradeNbr] = useState(0);
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [iconType, setIconType] = useState("");

  // const [disabledInput, setDisabledInput] = useState(true);
  const [disabledInputText, setDisabledInputText] = useState(true);
  const [disabledInputNum, setDisabledInputNum] = useState(true);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionPoints, setQuestionPoints] = useState("");

  const inputElement = useRef();
  const inputPoints = useRef();

  const handleInputChange = (e) => {
    setQuestionTitle(e.target.value);
    singleData.title = questionTitle;
  };

  const handlePointsChange = (e) => {
    setQuestionPoints(e.target.value);
    singleData.point = questionPoints;
  };

  let sendData = { activityId: activityId };

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
    setEssayNbr(essayTemp);

    let gradeSum = 0;
    for (let i = 0; i < res.data.length; i++) {
      gradeSum += res.data[i].point;
    }
    setGradeNbr(gradeSum);
    setData(res.data);
  };

  const getSpecificQuestion = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/questions/${id}`);
      setSingleData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateSpecificQuestion = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/questions/${id}`, {
        point: questionPoints,
        title: questionTitle,
      });
      const singleUpdatedQuestion = res.data;
      console.log(singleUpdatedQuestion);
    } catch (error) {
      console.log(error);
    } finally {
      getQuestionData();
    }
  };

  const handleRemoveQuestion = async (id) => {
    try {
      let sendData = {
        activityId: activityId,
      };
      const res = await axios.post(
        `http://localhost:5000/api/questions/delete/${id}`,
        sendData
      );
      setSingleData([]);
      setDeleteMessage("Question Deleted");
      setTimeout(() => setDeleteMessage(""), 2500);
    } catch (error) {
      console.log(error);
    } finally {
      await getQuestionData();
      setShowQuestion(false);
    }
  };

  const updatePassingGradeInQuiz = async () => {
    let sendData = {
      passingGrade: gradeNbr,
    };
    const res = axios.put(
      `http://localhost:5000/api/activities/updateSingleActivity/${activityId}`,
      sendData
    );
    console.log(res);
  };

  useEffect(() => {
    getQuestionData();
    // updatePassingGradeInQuiz();
  }, [gradeNbr]);

  const iconQuestionStyle =
    "md:text-xl dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl";
  // console.log(iconType);

  // *********** Add Multiple Choice ************
  const addMultipleChoice = (data) => {
    console.log("This is from child", data);
    let questionOption = [];

    for (let i = 0; i < data.options.length; i++) {
      questionOption.push(data.options[i].content);
    }

    console.log(data.title);
    console.log(data.questionContent);
    console.log(data.point);
    console.log(data.correctOption);

    const submit = async () => {
      let sendData = {
        activityId: activityId,
        questionContent: data.questionContent,
        type: iconType,
        point: data.point,
        title: data.title,
        correctOption: data.correctOption,
        options: questionOption,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/api/questions",
          sendData
        );
        console.log(res.data);
        setSuccessMessage("Question Created Successfully");
        setTimeout(() => setSuccessMessage(""), 2500);
      } catch (error) {
        console.log(error);
      } finally {
        await getQuestionData();
      }
    };
    submit();
  };

  // *********** Add True Or False ************data
  const addTrueOrFalse = (data) => {
    console.log("This is from child", data);

    console.log(data.title);
    console.log(data.questionContent);
    console.log(data.point);
    console.log(data.correctOption);

    const submit = async () => {
      let sendData = {
        activityId: activityId,
        questionContent: data.questionContent,
        type: iconType,
        point: data.point,
        title: data.title,
        correctOption: data.correctOption,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/api/questions",
          sendData
        );
        console.log(res.data);
        setSuccessMessage("Question Created Successfully");
        setTimeout(() => setSuccessMessage(""), 2500);
      } catch (error) {
        console.log(error);
      } finally {
        await getQuestionData();
      }
    };
    submit();
  };
  // *********** Add Multiple Response ************
  const addMultipleResponse = (data) => {
    console.log("This is from child", data);
    let questionOption = [];

    for (let i = 0; i < data.options.length; i++) {
      questionOption.push(data.options[i].content);
    }
    let correctResp = [];

    for (let i = 0; i < data.correctResponse.length; i++) {
      correctResp.push(data.correctResponse[i].content);
    }
    console.log(correctResp);

    console.log(data.title);
    console.log(data.questionContent);
    console.log(data.point);
    console.log(data.correctResponse);

    const submit = async () => {
      let sendData = {
        activityId: activityId,
        questionContent: data.questionContent,
        type: iconType,
        point: data.point,
        title: data.title,
        correctResponse: data.correctResponse.join(",  "),
        options: questionOption,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/api/questions",
          sendData
        );
        console.log(res.data);
        setSuccessMessage("Question Created Successfully");
        setTimeout(() => setSuccessMessage(""), 2500);
      } catch (error) {
        console.log(error);
      } finally {
        await getQuestionData();
      }
    };
    submit();
  };

  // *********** Add  Short Answer ************
  const addShortAnswer = (data) => {
    console.log(data.title);
    console.log(data.questionContent);
    console.log(data.point);
    console.log(data.correctOption);

    const submit = async () => {
      let sendData = {
        activityId: activityId,
        questionContent: data.questionContent,
        type: iconType,
        point: data.point,
        title: data.title,
        correctOption: data.correctOption,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/api/questions",
          sendData
        );
        console.log(res.data);
        setSuccessMessage("Question Created Successfully");
        setTimeout(() => setSuccessMessage(""), 2500);
      } catch (error) {
        console.log(error);
      } finally {
        await getQuestionData();
      }
    };
    submit();
  };
  // *********** Add  Question Essay ************
  const addQuestionEssay = (data) => {
    console.log(data.title);
    console.log(data.questionContent);
    console.log(data.point);
    console.log(data.correctOption);

    const submit = async () => {
      let sendData = {
        activityId: activityId,
        questionContent: data.questionContent,
        type: iconType,
        point: data.point,
        title: data.title,
        correctOption: data.correctOption,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/api/questions",
          sendData
        );
        console.log(res.data);
        setSuccessMessage("Question Created Successfully");
        setTimeout(() => setSuccessMessage(""), 2500);
      } catch (error) {
        console.log(error);
      } finally {
        await getQuestionData();
      }
    };
    submit();
  };

  // *********** Add Numerical  ************
  const addNumerical = (data) => {
    console.log("This is from child", data);
    let questionOption = [];

    for (let i = 0; i < data.options.length; i++) {
      questionOption.push(data.options[i].content);
    }

    console.log(data.title);
    console.log(data.questionContent);
    console.log(data.point);
    console.log(data.correctResponse);

    const submit = async () => {
      let sendData = {
        activityId: activityId,
        questionContent: data.questionContent,
        type: iconType,
        point: data.point,
        title: data.title,
        correctOption: data.correctOption,
        options: questionOption,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/api/questions",
          sendData
        );
        console.log(res.data);
        setSuccessMessage("Question Created Successfully");
        setTimeout(() => setSuccessMessage(""), 2500);
      } catch (error) {
        console.log(error);
      } finally {
        await getQuestionData();
      }
    };
    submit();
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
                <span
                  style={{ color: `${multipleChoiceNbr > 0 && currentColor}` }}
                  className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4"
                >
                  {multipleChoiceNbr}
                </span>
                <span
                  style={{
                    color: `${multipleResponceNbr > 0 && currentColor}`,
                  }}
                  className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4"
                >
                  {multipleResponceNbr}
                </span>
                <span
                  style={{ color: `${trueFalseNbr > 0 && currentColor}` }}
                  className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4"
                >
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
                <span
                  style={{ color: `${shortAnswersNbr > 0 && currentColor}` }}
                  className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4"
                >
                  {shortAnswersNbr}
                </span>
                <span
                  style={{ color: `${numericalNbr > 0 && currentColor}` }}
                  className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4"
                >
                  {numericalNbr}
                </span>
                <span
                  style={{ color: `${essayNbr > 0 && currentColor}` }}
                  className="dark:text-gray-400 text-gray-500 text-sm md:text-base ml-4"
                >
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
              {successMessage && (
                <div className="text-green-500 md:text-lg text-base mt-3  md:mr-6 lg:mr-48">
                  {successMessage}
                </div>
              )}

              {deleteMessage && (
                <div className="text-red-400 md:text-lg text-base mt-3  md:mr-6 lg:mr-48">
                  {deleteMessage}
                </div>
              )}

              <Tooltip title={"Edit Points"} placement="left">
                <div>
                  <MdOutlineModeEdit
                    onClick={() => {
                      inputPoints.current.focus();
                      setDisabledInputNum(false);
                      setQuestionPoints(singleData.point);
                    }}
                    onMouseEnter={() => {}}
                    className="m-4 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl "
                  />
                </div>
              </Tooltip>
              <Tooltip title={"Save Changes"} placement="top">
                <div>
                  <FiSave
                    onClick={() => {
                      // setDisabledInputNum(true);
                      // setDisabledInputText(true);

                      updateSpecificQuestion(questionId);
                    }}
                    className="m-4 mr-10 md:mr-16 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl"
                  />
                </div>
              </Tooltip>
            </div>
            <div className="flex w-full">
              {/* Icons Side Bar Drag N Drop */}
              <div className="absolute min-w-max bg-gray-100 dark:bg-secondary-dark-bg dark:text-white text-gray-800 text-2xl flex flex-col justify-center align-middle border-solid border-2 border-gray-400 rounded-2xl rounded-tl-none rounded-bl-none h-4/5 w-1/12 p-3 ">
                {links.map((item) => (
                  <Tooltip
                    key={item.title}
                    title={item.title}
                    placement="right"
                  >
                    <div className="mx-auto my-auto">
                      <NavLink
                        style={{ color: item.color }}
                        onClick={() => {
                          setIconType(item.title);
                          console.log(iconType);
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
                          {
                            item.title == "Multiple Response"
                              ? setShowMultipleResponse(true)
                              : setShowMultipleResponse(false);
                          }
                          {
                            item.title == "Short Answers"
                              ? setShowShortAnswer(true)
                              : setShowShortAnswer(false);
                          }

                          {
                            item.title == "Numerical"
                              ? setShownumerical(true)
                              : setShownumerical(false);
                          }
                          {
                            item.title == "Essay"
                              ? setShowEssay(true)
                              : setShowEssay(false);
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
                    iconType={iconType}
                    onSubmit={addMultipleChoice}
                  />
                )}
                {showTrueFalse && (
                  <TrueOrFalse
                    setShowTrueFalse={setShowTrueFalse}
                    iconType={iconType}
                    onSubmit={addTrueOrFalse}
                  />
                )}
                {showMutlipleResponse && (
                  <MultipleResponse
                    setShowMultipleResponse={setShowMultipleResponse}
                    iconType={iconType}
                    onSubmit={addMultipleResponse}
                  />
                )}

                {showShortAnswer && (
                  <ShortAnswers
                    setShowShortAnswer={setShowShortAnswer}
                    iconType={iconType}
                    onSubmit={addShortAnswer}
                  />
                )}
                {showNumerical && (
                  <Numerical
                    setShownumerical={setShownumerical}
                    iconType={iconType}
                    onSubmit={addNumerical}
                  />
                )}
                {showEssay && (
                  <QuestionEssay
                    setShowEssay={setShowEssay}
                    iconType={iconType}
                    onSubmit={addQuestionEssay}
                  />
                )}
              </div>
              {/* Sub Container 1 */}
              <div className="bg-main-bg drop-shadow-lg absolute ml-14 sm:ml-16 lg:ml-24 xl:ml-28 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-lg h-4/5 w-5/6 p-2 pb-0">
                <div className="flex mr-5">
                  <p className="text-lg">
                    {
                      <input
                        type="text"
                        disabled={disabledInputText}
                        ref={inputElement}
                        // value={singleData.title}
                        value={`${
                          disabledInputText
                            ? singleData.title || "Question"
                            : questionTitle
                        }`}
                        onChange={handleInputChange}
                        className="dark:bg-transparent mr-4 capitalize text-sm md:text-base bg-main-bg  dark:text-white text-gray-800 w-32 focus:outline-none focus:border-transparent p-1 rounded-lg"
                      />
                    }
                  </p>
                  <div className="flex md:-ml-6 -ml-10 items-center flex-grow mx-2">
                    <div className="border-b border-gray-500 w-full"></div>
                  </div>
                  <Tooltip title={"Edit Title"} placement="right">
                    <div>
                      <BsThreeDots
                        onClick={() => {
                          if (showQuestion) {
                            setDisabledInputText(false);
                            inputElement.current.focus();
                            setQuestionTitle(singleData.title);
                          }
                        }}
                        className="md:text-xl mt-2 cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl"
                      />
                    </div>
                  </Tooltip>
                </div>

                {/* // Container To Display The Questions */}
                <div className="flex  h-5/6 border-solid border-2 border-gray-400 rounded-md w-full mt-3 ">
                  {!showQuestion && (
                    <p
                      style={{ marginInlineStart: "25%" }}
                      className="capitalize ml-8 self-center dark:text-white text-gray-800 sm:text-lg text-sm opacity-30"
                    >
                      please select your question
                    </p>
                  )}
                  {showQuestion && singleData && (
                    <div className="flex p-4 mt-6 my-auto flex-col justify-start align-middle border-0 rounded-md  bg-transparent outline-none  h-5/6 w-full">
                      {/* Title and Point Container */}
                      <div className="flex justify-between -mt-6 capitalize  text-sm text-white">
                        <p
                          style={{ color: `${currentColor}` }}
                          className="text-sm md:text-base lg:text-lg font-semibold uppercase "
                        >
                          {singleData.type}
                        </p>
                        <div className="-mt-1">
                          <input
                            type="number"
                            disabled={disabledInputNum}
                            ref={inputPoints}
                            value={`${
                              disabledInputNum
                                ? singleData.point
                                : questionPoints
                            }`}
                            onChange={handlePointsChange}
                            className="dark:bg-transparent bg-main-bg  dark:text-white text-gray-900 w-12 xl:text-lg lg:text-base md:text-sm focus:outline-none focus:border-transparent p-1 rounded-lg"
                          />
                          <span className="-ml-1 md:text-sm text-gray-900  dark:text-white lg:text-base xl:text-lg">
                            points
                          </span>
                        </div>
                      </div>
                      <div className="flex mt-2  ">
                        <BsQuestionOctagonFill className="md:mt-1 text-red-400" />
                        <p className="ml-2 md:text-base text-sm">
                          {singleData.questionContent}
                          {"."}
                        </p>
                      </div>
                      <div className="flex items-center mt-2 flex-grow ">
                        <div className="border-b border-gray-500 w-full opacity-50"></div>
                      </div>

                      {iconType == "Multiple Choice" && (
                        <div className="flex">
                          <p className="md-text-lg text-base">Options: </p>
                          {questionOptions &&
                            questionOptions.map((option, index) => {
                              return (
                                <div key={index}>
                                  <li className="list-outside mx-2 mt-0.5 md-text-base text-sm">
                                    {option}
                                  </li>
                                </div>
                              );
                            })}
                        </div>
                      )}

                      {iconType == "Multiple Response" && (
                        <div className="flex">
                          <p className="md-text-lg text-base">Options: </p>
                          {questionOptions &&
                            questionOptions.map((option, index) => {
                              return (
                                <div key={index}>
                                  <li className="list-outside mx-2 mt-0.5 md-text-base text-sm">
                                    {option}
                                  </li>
                                </div>
                              );
                            })}
                        </div>
                      )}
                      {iconType == "Numerical" && (
                        <div className="flex">
                          <p className="md-text-lg text-base">Options: </p>
                          {questionOptions &&
                            questionOptions.map((option, index) => {
                              return (
                                <div key={index}>
                                  <li className="list-outside mx-2 mt-0.5 md-text-base text-sm">
                                    {option}
                                  </li>
                                </div>
                              );
                            })}
                        </div>
                      )}

                      <div className="flex mt-2 ">
                        <p className=" md-text-lg text-base">Answer: </p>
                        <span className="ml-2  text-green-400 font-bold md-text-lg text-base">
                          {singleData.correctOption}
                        </span>

                        {iconType == "Multiple Response" && (
                          <div className="flex">
                            <span className="ml-2  text-green-400 font-bold md-text-lg text-base">
                              {singleData.correctResponse}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Question Bank */}
          <div className="h-[60vh] flex flex-col justify-start align-middle border-solid border-2 border-gray-400 rounded-3xl rounded-tr-none rounded-br-none w-1/4 md:ml-5 ml-2 overflow-y-scroll custom-scrollbar p-1 sm:p-2">
            {/* Question Container */}
            {data.length == 0 && (
              <p className="text-gray-400 my-auto mx-auto  md:text-lg lg:text-2xl text-base">
                No Questions Yet
              </p>
            )}
            {data &&
              data.map((question) => {
                const isActive = question._id == questionId;
                return (
                  <div
                    key={question._id}
                    className={`bg-main-bg drop-shadow-lg mx-auto sm:mt-2 mt-3 border h-fit ${
                      isActive ? "border-teal-500" : ""
                    } dark:text-gray-200 dark:bg-secondary-dark-bg filter ${
                      !isActive
                        ? "dark:hover:border-gray-600 hover:border-gray-700"
                        : ""
                    }  rounded-xl sm:h-2/6 h-1/6 w-5/6 sm:p-4 p-1 pt-2 ease-linear transition-all duration-150`}
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

                      <p
                        onClick={() => {
                          setShowQuestion(true);
                          console.log(question);
                          getSpecificQuestion(question._id);
                          setQuestionId(question._id);
                          setIconType(question.type);
                          setQuestionOptions(question.options);
                          setDisabledInputNum(true);
                          setDisabledInputText(true);
                          console.log(questionOptions);
                          console.log(iconType);
                        }}
                        className={`lg:-mt-1 capitalize text-center cursor-pointer dark:text-white text-gray-800 dark:hover:text-green-400  dark:hover:drop-shadow-lg hover:text-gray-400 lg:text-lg text-xs ease-linear transition-all duration-150`}
                      >
                        {question.title}
                      </p>
                      <MdDelete
                        className="md:text-xl cursor-pointer dark:hover:text-red-400 hover:text-red-400 dark:hover:drop-shadow-xl hover:drop-shadow-xl"
                        onClick={() => {
                          handleRemoveQuestion(question._id);
                          setQuestionTitle("Question");
                          // setDisabledInputText(false);
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
                );
              })}
            {/* End Of Question Container */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;

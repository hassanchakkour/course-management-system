import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";

import { MdAddCircle } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiSave } from "react-icons/fi";

import { BsThreeDots } from "react-icons/bs";

import { RiCheckDoubleFill } from "react-icons/ri";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { TfiList } from "react-icons/tfi";
import { BiCommentMinus } from "react-icons/bi";
import { BsCalculator } from "react-icons/bs";
import { LuFileText } from "react-icons/lu";

const Questions = () => {
  const { currentColor, activityID, activityTitle } = useStateContext();

  const activityId = localStorage.getItem("activity_id", activityID);

  //   const course_Title = localStorage.getItem("course_name", activityTitle);

  const { userInfo } = useSelector((state) => state.auth);

  const [questionsNbr, setQuestionsNbr] = useState(0);

  const [multipleChoiceNbr, setMultipleChoiceNbr] = useState(0);
  const [multipleResponceNbr, setMultipleResponceNbr] = useState(0);
  const [trueFalseNbr, setTrueFalseNbr] = useState(0);
  const [shortAnswersNbr, setShortAnswersNbr] = useState(0);
  const [numericalNbr, setNumericalNbr] = useState(0);
  const [essayNbr, setEssayNbrNbr] = useState(0);

  const [gradeNbr, setGradeNbr] = useState(0);

  const [inputNbr, setInputNbr] = useState(1);
  const handleInputChange = (e) => {
    setInputNbr(e.target.value);
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
    setEssayNbrNbr(essayTemp);
  };

  useEffect(() => {
    getQuestionData();
  }, []);

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
              <MdAddCircle className="m-6 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl" />
              <MdOutlineModeEdit className="m-6 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl " />
              <FiSave className="m-6 mr-10 md:mr-16 md:text-xl cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl" />
            </div>
            <div className="flex w-full">
              {/* Icons Side Bar Drag N Drop */}
              <div className="absolute min-w-max bg-white dark:bg-secondary-dark-bg dark:text-white text-gray-800 text-2xl flex flex-col justify-center align-middle border-solid border-2 border-gray-400 rounded-2xl rounded-tl-none rounded-bl-none h-2/3 w-1/12 p-3">
                <RiCheckDoubleFill className="mb-5 mx-auto" />
                <RiCheckboxMultipleFill className="mb-5 mx-auto" />
                <TfiList className="mb-5 mx-auto" />
                <BiCommentMinus className="mb-5 mx-auto" />
                <BsCalculator className="mb-5 mx-auto" />
                <LuFileText className=" mx-auto" />
              </div>
              {/* Sub Container 1 */}
              <div className="bg-white absolute ml-14 sm:ml-16 lg:ml-28 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-lg h-2/3 w-5/6 p-4">
                <div className="flex">
                  <p className="capitalize dark:text-white text-gray-800 text-lg">
                    question{" "}
                    {
                      <input
                        type="number"
                        value={inputNbr}
                        onChange={handleInputChange}
                        className="dark:bg-secondary-dark-bg bg-white dark:text-white text-gray-800 w-8"
                      />
                    }
                  </p>
                  <div className="flex items-center flex-grow mx-2">
                    <div className="border-b border-gray-500 w-full"></div>
                  </div>
                  <BsThreeDots className="md:text-xl mt-1 cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 dark:hover:drop-shadow-xl hover:drop-shadow-xl" />
                </div>
                <div className="flex justify-center  h-5/6 border-solid border-2 border-gray-400 rounded-md w-full mt-3">
                  <p className="capitalize self-center dark:text-white text-gray-800 text-lg opacity-30">
                    drag and drop quiz type
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Second Container */}
          <div className="h-[60vh] flex flex-col justify-start align-middle border-solid border-2 border-gray-400 rounded-3xl rounded-tr-none rounded-br-none w-1/4 md:ml-5 ml-2 overflow-y-scroll p-1 sm:p-2">
            <div className="bg-white mx-auto sm:mt-2 mt-3 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-xl sm:h-2/6 h-1/6 w-5/6 p-4">
              <p className="capitalize dark:text-white text-gray-800 lg:text-lg md:text-base text-sm">
                question {inputNbr}
              </p>
              <div className="flex items-center flex-grow my-2">
                <div className="border-b border-gray-500 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;

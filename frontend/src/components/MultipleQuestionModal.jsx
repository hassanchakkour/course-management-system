import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";
import axios from "axios";
import "./multipleQuestionModal.css";

import { TfiList } from "react-icons/tfi";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { RiCheckDoubleFill } from "react-icons/ri";
import { BiCommentMinus } from "react-icons/bi";
import { BsCalculator } from "react-icons/bs";
import { LuFileText } from "react-icons/lu";

import { SiHelpscout } from "react-icons/si";

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

const MultipleQuestionModal = ({ setShowMutipleQuestionModal }) => {
  const { currentColor } = useStateContext();
  const [showWelcome, setShowWelcome] = useState(false);
  const [showText, setShowText] = useState(false);
  const [iconType, setIconType] = useState("");
  //   const [isActive, setIsActive] = useState(false);
  const [questionNum, setQuestionNum] = useState(0);

  useEffect(() => {
    const typingDelay = 100; // Delay between each character typing
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

  useEffect(() => {
    setTimeout(() => setShowText(true), 6500);
  }, []);

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative  -mt-12  my-6 mx-auto w-5/6 max-w-2xl ">
          {/*content*/}
          <div
            // style={{ filter: `drop-shadow(0px 0px 3px #6ee7b7)` }}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-[#242830] to-[#33373E] outline-none focus:outline-none"
          >
            {/*header*/}
            <div className=" w-full p-5  border-slate-200 rounded-t">
              <div>
                {showWelcome && (
                  <p className="font-mono text-2xl text-teal-200  mb-8">
                    {showWelcome}
                  </p>
                )}
              </div>

              <div
                // style={{ filter: `drop-shadow(0px 0px 3px ${currentColor})` }}
                className="relative  bg-transparent text-white  text-2xl flex  justify-between align-middle border-solid rounded-3xl border-t-2 border-gray-600 filter drop-shadow-md  h-1/5 w-full py-2 "
              >
                {links.map((item) => {
                  const isActive = item.title == iconType;
                  return (
                    <Tooltip
                      key={item.title}
                      title={item.title}
                      placement="top"
                    >
                      <div
                        className={` mx-auto my-auto p-3 ${
                          isActive
                            ? "border border-b-0 text-3xl bg-gray-700 rounded-tl-md  rounded-tr-md border-gray-500  ease-in-out transition-all duration-100"
                            : ""
                        }`}
                      >
                        <NavLink
                          className={"relative"}
                          style={{
                            color: isActive ? item.color : "gray",
                          }}
                          onClick={() => {
                            setIconType(item.title);
                            //   setIconType(item.title);
                            //   console.log(iconType);
                          }}
                        >
                          {item.icon}
                          <div className="absolute text-gray-700 inline-flex items-center justify-center w-5 h-5 text-xs font-bold  bg-teal-400 border-1 border-gray-200 rounded-full -top-5 -right-5 ">
                            8
                          </div>
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
                  className="bg-teal-500 mt-1 mb-2 ml-5 hover:bg-teal-600 text-sm text-white py-2 px-4 rounded-full ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {}}
                >
                  Add Question
                </button>
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
                  setShowMutipleQuestionModal(false);
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

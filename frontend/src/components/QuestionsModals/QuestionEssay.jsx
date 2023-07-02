import React from "react";
import { useState } from "react";
import { MdLibraryAdd } from "react-icons/md";
import { TbSquareRoundedMinus } from "react-icons/tb";
import { useStateContext } from "../../contexts/ContextProvider";
import { MdCancel } from "react-icons/md";
import { Tooltip } from "@mui/material";

const QuestionEssay = ({setShowEssay, onSubmit, iconType}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [questionContent, setContentContent] = useState("");
  const [point, setPoint] = useState(0);

  const [correctOption, setCorrectOption] = useState("");
  const { currentColor } = useStateContext();


  

  const [errorMessage, setErrorMessage] = useState(false);

  const handleData = () => {
    const type = { iconType };
    const data = {
      title,
      questionContent,
      point,
      correctOption,
    };
    onSubmit(data);
  };

 

  return (
    <>
      <>
      <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative h-4/5 md:mt-0 mt-12 lg:mt-16 my-6 mx-auto w-3/5 max-w-3xl min-w-min scrollbar-hide overflow-y-scroll">
            {/*content*/}
            <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-gradient-to-b from-[#242830] to-[#33373E] outline-none focus:outline-none">
              {/*header*/}
              <div
                style={{ borderColor: currentColor }}
                className={`flex  mb-3 items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t`}
              >
                <div className="flex">
                  <h3 className="text-3xl text-gray-300 font-semibold">
                    Question:
                  </h3>
                  <span
                    style={{ color: currentColor }}
                    className="text-white text-2xl ml-3 mt-1 capitalize"
                  >
                    {iconType}
                  </span>
                </div>
              
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <label
                  htmlFor="titleInput"
                  className="my-4 text-slate-400 text-lg leading-relaxed"
                >
                  Title
                </label>
                <div className="mb-3 pt-0">
                  <input
                    type="text"
                    required
                    id="titleInput"
                    placeholder="Add Title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent"
                  />
                </div>
                <label
                  htmlFor="descriptionInput"
                  className="my-4 text-slate-400 text-lg leading-relaxed"
                >
                  Content
                </label>
                <div className="mb-2 pt-0">
                  <textarea
                    id="descriptionInput"
                    required
                    onChange={(e) => setContentContent(e.target.value)}
                    placeholder="Enter description"
                    className="px-3 py-3 mt-1 placeholder-slate-400 text-white  relative bg-transparent rounded text-sm border-1 border-white shadow outline-none focus:outline-none  w-full"
                  ></textarea>
                </div>
                <label
                  htmlFor="pointInput"
                  className="text-slate-400 text-lg leading-relaxed"
                >
                  Point
                </label>
                <div className="mb-3 mt-1 pt-0">
                  <input
                    type="number"
                    id="pointInput"
                    required
                    onChange={(e) => setPoint(e.target.value)}
                    min="0"
                    placeholder="Add Number Of Points"
                    className="px-3 py-3 placeholder-slate-400 text-white relative bg-transparent rounded text-sm border-1 shadow outline-none focus:outline-none  w-full"
                  />
                </div>
                
                <label
                  htmlFor="correctOptionInput"
                  className="my-4 text-slate-400 text-lg leading-relaxed"
                >
                  Correct Answer
                </label>
                <div className="mb-3 pt-1">
                <textarea
                    id="descriptionInput"
                    required
                    onChange={(e) => setCorrectOption(e.target.value)}
                    placeholder="Enter Answer "
                    className="px-3 py-3 mt-1 placeholder-slate-400 text-white  relative bg-transparent rounded text-sm border-1 border-white shadow outline-none focus:outline-none  w-full"
                  ></textarea>
                </div>
                 {/* footer */}
             <div className="flex items-center flex-grow mt-5 ">
                <div
                  style={{ borderColor: currentColor }}
                  className={`border-b border-solid border-slate-200  w-full`}
                ></div>
              </div> 
              <div className="flex justify-between mb-3 mt-0 mx-auto w-11/12">
                <div>
                  <button
                    className="bg-transparent text-red-500 active:bg-gray-600 font-bold  text-xl p-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  mr-3 ease-linear transition-all duration-150 "
                    onClick={() => {
                      setShowEssay(false);
                      console.log(currentColor);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 mt-3 items-end text-white active:bg-emerald-600 font-bold capitalize text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:text-gray-800  ease-linear transition-all duration-200"
                    type="button"
                    onClick={() => {
                      if (
                        !title ||
                        !questionContent ||
                        !point ||
                        !correctOption
                      ) {
                        setErrorMessage(true);
                        setTimeout(() => {
                          setErrorMessage(false);
                        }, 2000);
                      } else {
                        handleData();
                        setShowEssay(false);
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-red-500 font-semibold capitalize md:text-lg text-base  mt-5 mr-2">
                    Please fill all the fields
                  </p>
                )}
              </div>
              
               
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
};

export default QuestionEssay;

import React from "react";
import { useState } from "react";
import { MdLibraryAdd } from "react-icons/md";
import { TbSquareRoundedMinus } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { Tooltip } from "@mui/material";

const MultipleResponse = ({ setShowMutlipleResponse }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [questionContent, setContentContent] = useState("");
  const [point, setPoint] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");

  const [showAddOption, setShowAddOption] = useState(false);

  const handleAddOption = () => {
    const option = {
      // Unique identifier for each option
      id: new Date().getTime(),
      content: content,
    };

    const updatedOptions = [...options, option];
    setOptions(updatedOptions);
    setContent("");
    setShowAddOption(true);
  };

  const handleRemoveOption = (id) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
  };

  const [errorMessage, setErrorMessage] = useState(false);

  const handleData = () => {
    const type = "Multiple Response";
    const data = {
      title,
      questionContent,
      point,
      options,
      correctOption,
    };
    // onSubmit(data);
  };

  // CSS styles
  const selectStyle = {
    backgroundColor: "#33373E",
    color: "lightseagreen",
  };

  const optionStyle = {
    backgroundColor: "darkgray",
    color: "white",
  };

  const optionHoverStyle = {
    backgroundColor: "#33373E",
  };

  // Define a state to keep track of the hovered option
  const [hoveredOption, setHoveredOption] = useState(null);

  // Handle mouse enter event to update the hovered option
  const handleMouseEnter = (optionId) => {
    setHoveredOption(optionId);
  };

  // Handle mouse leave event to clear the hovered option
  const handleMouseLeave = () => {
    setHoveredOption(null);
  };

  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative h-4/5 md:mt-0 mt-12 lg:mt-16 my-6 mx-auto w-3/5 max-w-3xl min-w-min scrollbar-hide overflow-y-scroll">
            {/content/}
            <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-gradient-to-b from-[#242830] to-[#33373E] outline-none focus:outline-none">
              {/header/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <div className="flex">
                  <h3 className="text-3xl text-gray-300 font-semibold">
                    Question:
                  </h3>
                  <span className="text-white text-2xl ml-3 mt-1 capitalize">
                    multiple Response
                  </span>
                </div>
              </div>
              {/body/}
              <div className="relative p-6 -mt-5 flex-auto">
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
                  htmlFor="optionInput"
                  className="my-4 text-slate-400 text-lg leading-relaxed"
                >
                  Options
                </label>
                <div className="relative -mt-2">
                  <input
                    type="text"
                    required
                    id="optionInput"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    placeholder="Enter option"
                    className="w-full px-3 mb-3 mt-3 py-3 placeholder-slate-400 text-white relative bg-transparent rounded text-sm border-1 shadow outline-none focus:outline-none pr-10"
                  />

                  {showAddOption && (
                    <div className="flex flex-wrap mt-2">
                      {options.map((option, index) => (
                        <div
                          key={index}
                          className="flex p-2 w-auto h-8 border-1 border-gray-200 rounded-lg mr-2"
                        >
                          <p className="text-xs mr-1 text-[lightseagreen]">
                            {option.content}
                          </p>
                          <TbSquareRoundedMinus
                            className="text-red-500 font-semibold text-lg cursor-pointer  ml-1 -mt-0.5"
                            onClick={() => handleRemoveOption(option.id)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <Tooltip title="Add Option" arrow>
                    <button
                      className="absolute right-0 top-3 text-white font-bold text-2xl px-6 py-3 rounded dark:hover:text-emerald-400 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      onClick={handleAddOption}
                    >
                      <MdLibraryAdd className="-mr-5" />
                    </button>
                  </Tooltip>
                </div>
                <label
                  htmlFor="correctOptionInput"
                  className="my-4 text-slate-400 text-lg leading-relaxed"
                >
                  Correct Option
                </label>
                <div className="mb-3 pt-1">
                  <select
                    id="correctOptionInput"
                    onChange={(e) => setCorrectOption(e.target.value)}
                    required
                    value={correctOption}
                    className={`px-2 py-3 placeholder-slate-400 text-white relative rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full select-style`}
                    style={selectStyle}
                  >
                    <option value="">Select an option</option>
                    {options.map((option) => (
                      <option
                        key={option.id}
                        value={option.content}
                        className={`select-style ${
                          hoveredOption === option.id ? "hovered" : ""
                        }`}
                        style={optionStyle}
                        onMouseEnter={() => handleMouseEnter(option.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {option.content}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* footer */}
              <div className="flex items-center flex-grow -mt-5 ">
                <div className="border-b border-solid border-slate-200  w-full"></div>
              </div>
              <div className="flex justify-between mb-3 mt-0 mx-auto w-11/12">
                {errorMessage && (
                  <p className="text-red-500 md:text-lg text-base  mt-5 mr-2">
                    Please fill all the fields
                  </p>
                )}
                <div>
                  <button
                    className="bg-transparent text-red-500 active:bg-gray-600 font-bold  text-xl p-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  mr-3 ease-linear transition-all duration-150 "
                    onClick={() => setShowMutlipleResponse(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 mt-3 items-end text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:text-gray-800  ease-linear transition-all duration-200"
                    type="button"
                    onClick={() => {
                      if (
                        !title ||
                        !questionContent ||
                        !point ||
                        options.some((option) => option === "") ||
                        !correctOption
                      ) {
                        setErrorMessage(true);
                        setTimeout(() => {
                          setErrorMessage(false);
                        }, 2000);
                      } else {
                        handleData();
                        setShowMutlipleResponse(false);
                      }
                    }}
                  >
                    Submit
                  </button>
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

export default MultipleResponse;
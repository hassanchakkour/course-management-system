import React from "react";
import { BsFillMicFill } from "react-icons/bs";
import { AiFillFileText, AiOutlineSubnode } from "react-icons/ai";
import { RiSurveyFill } from "react-icons/ri";
import { MdViewModule, MdDocumentScanner } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import CourseSummary from "../components/ModuleComps/courseSummary";
import { useStateContext } from "../contexts/ContextProvider";
// import assignment from "../../public/assignment.svg";

const Content = () => {
  const { courseID, course_name, activeMenu } = useStateContext();

  const course = localStorage.getItem("course_id", courseID);

  const course_Name = localStorage.getItem("course_name", course_name);

  // console.log(course);
  let iconsClass = "";
  if (activeMenu) {
    iconsClass =
      "mx-[70%] max-[850px]:mt-0 max-[850px]:mx-[60%] absolute mt-12";
  } else {
    iconsClass =
      "mx-[80%] max-[850px]:mt-0 max-[850px]:mx-[60%] absolute mt-12";
  }
  return (
    <div className="">
      <div>
        <CourseSummary course={course} coursename={course_Name} />
      </div>
      <div className=" flex">
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
        <div className={iconsClass}>
          <ul className="flex text-white text-2xl">
            <li className="mr-10 max-[850px]:mr-8">
              <IoMdAddCircleOutline className="cursor-pointer" />
            </li>
            <li className="mr-10 max-[850px]:mr-8">
              <AiOutlineSubnode className="cursor-pointer" />
            </li>
            <li>
              <FiSave className="cursor-pointer" />
            </li>
          </ul>
        </div>
        <div className="my-[5%] rounded-3xl border-gray-500 border w-full h-[50vh]">
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Content;

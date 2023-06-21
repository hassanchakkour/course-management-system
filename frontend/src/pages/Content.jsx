import React from "react";
import { BsFillMicFill } from "react-icons/bs";
import { AiFillFileText, AiOutlineSubnode } from "react-icons/ai";
import { RiSurveyFill } from "react-icons/ri";
import { MdViewModule, MdDocumentScanner } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import CourseSummary from "../components/ModuleComps/courseSummary";
import { useStateContext } from "../contexts/ContextProvider";
import Module from "../components/Module";
import Header from "../components/Header";

const Content = () => {
  const { courseID, course_name, activeMenu } = useStateContext();

  const course = localStorage.getItem("course_id", courseID);

  const course_Name = localStorage.getItem("course_name", course_name);

  return (
    <div className="">
      <div>
        <CourseSummary course={course} coursename={course_Name} />
      </div>

      <Header course={course} />
    </div>
  );
};

export default Content;

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useStateContext } from "../../contexts/ContextProvider";

const CourseSummary = ({ course, module }) => {
  const { currentColor, activityID, activityTitle, activeMenu } =
    useStateContext();

  const { userInfo } = useSelector((state) => state.auth);
  const [moduelNbr, setModuleNbr] = useState(0);
  const [topicNbr, setTopicNbr] = useState(0);
  const [assignmentNbr, setAssignmentNbr] = useState(0);
  const [quizNbr, setQuizNbr] = useState(0);
  const [onlineNbr, setOnlineNbr] = useState(0);

  const getModuleData = async () => {
    if (module) {
      var temp = 0;
      setModuleNbr(module.length);
      for (let i = 0; i < module.length; i++) {
        temp += module[i].submoduleId.length;
      }

      setTopicNbr(temp);

      var assignmentTemp = 0;
      let quizTemp = 0;
      let onlineTemp = 0;
      for (let i = 0; i < module.length; i++) {
        if (module[i].type === "Quiz") {
          quizTemp += 1;
        }
        if (module[i].type === "Assignment") {
          assignmentTemp += 1;
        }
        if (module[i].type === "online session") {
          onlineTemp += 1;
        }
      }
      setAssignmentNbr(assignmentTemp);
      setQuizNbr(quizTemp);
      setOnlineNbr(onlineTemp);
    }
  };

  const getActivityData = async () => {
    let sendData = {
      courseId: course,
    };
    const res = await axios.post(
      "http://localhost:5000/api/activities/course",
      sendData
    );
    var assignmentTemp = 0;
    let quizTemp = 0;
    let onlineTemp = 0;
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].type === "Quiz") {
        quizTemp += 1;
      }
      if (res.data[i].type === "Assignment") {
        assignmentTemp += 1;
      }
      if (res.data[i].type === "online session") {
        onlineTemp += 1;
      }
    }
    setAssignmentNbr(assignmentTemp);
    setQuizNbr(quizTemp);
    setOnlineNbr(onlineTemp);
  };

  useEffect(() => {
    getModuleData();
    getActivityData();
  }, [module]);

  let courseSummaryClass = "";

  if (activeMenu) {
    courseSummaryClass = "text-4xl  ml-[6%] mt-12 font-bold max-[850px]:hidden";
  } else {
    courseSummaryClass = "text-4xl  ml-[9%] mt-12 font-bold max-[850px]:hidden";
  }

  return (
    <div className="text-white mt-10 flex flex-row">
      <div className={courseSummaryClass}>
        Course <br />
        Summary
      </div>
      <div className="flex max-[850px]:hidden">
        <div className="pr-24 ml-16 ">
          <div
            style={{ textDecorationColor: `${currentColor}` }}
            className="text-5xl ml-16 overline   pt-2 mb-5 mt-10 font-bold text-center"
          >
            {moduelNbr}
          </div>
          <span className="ml-16 mt-16">MODULE</span>
        </div>
        <div className="border border-gray-600 h-20 mt-[50px]"></div>
        <div className="pr-20 ml-10">
          <div
            style={{ textDecorationColor: `${currentColor}` }}
            className="text-5xl ml-16 overline  pt-2 mb-5 mt-10 font-bold text-center"
          >
            {topicNbr}
          </div>
          <span className="ml-16 mt-16">TOPIC</span>
        </div>
        <div className="border border-gray-600 h-20 mt-[50px]"></div>
        <div className="pr-20 ml-8">
          <div
            style={{ textDecorationColor: `${currentColor}` }}
            className="text-5xl ml-16 overline  pt-2 mb-5 mt-10 font-bold text-center"
          >
            {assignmentNbr}
          </div>
          <span className="ml-16 mt-16">ASSIGNMENT</span>
        </div>
        <div className="border border-gray-600 h-20 mt-[50px]"></div>
        <div className="pr-24 ml-10">
          <div
            style={{ textDecorationColor: `${currentColor}` }}
            className="text-5xl ml-16 overline  pt-2 mb-5 mt-10 font-bold text-center"
          >
            {quizNbr}
          </div>
          <span className="ml-16 mt-16">QUIZ</span>
        </div>
        <div className="border border-gray-600 h-20 mt-[50px]"></div>
        <div className="pr-5 ml-8">
          <div
            style={{ textDecorationColor: `${currentColor}` }}
            className="text-5xl ml-16 overline  pt-2 mb-5 mt-10 font-bold text-center"
          >
            {onlineNbr}
          </div>
          <span className="ml-16 mt-16">ONLINE SESSION</span>
        </div>
      </div>
    </div>
  );
};

export default CourseSummary;

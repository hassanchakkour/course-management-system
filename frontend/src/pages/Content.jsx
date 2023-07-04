import React, { useState } from "react";

import CourseSummary from "../components/ModuleComps/courseSummary";
import { useStateContext } from "../contexts/ContextProvider";
import Module from "../components/Module";
import Header from "../components/Header";

const Content = () => {
  const { courseID, course_name, activeMenu } = useStateContext();

  const [module, setModule] = useState();

  const course = localStorage.getItem("course_id", courseID);

  const course_Name = localStorage.getItem("course_name", course_name);

  const handleDataFromModules = (dataMod) => {
    setModule(dataMod);
  };

  return (
    <div className="">
      <div>
        <CourseSummary
          module={module}
          course={course}
          coursename={course_Name}
        />
      </div>

      <Module onDataFromChild={handleDataFromModules} course={course} />
    </div>
  );
};

export default Content;

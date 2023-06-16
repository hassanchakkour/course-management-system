import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const CourseSummary = () => {
  const [moduelNbr, setModuleNbr] = useState(0);
  const [topicNbr, setTopicNbr] = useState(0);

  const getModuleData = async () => {
    let sendData = {
      courseId: "648311fa4e78666518b69c41",
    };
    const res = await axios.post(
      "http://localhost:5000/api/modules/course",
      sendData
    );
    setModuleNbr(res.data.length);
    console.log(res.data);
    var temp = 0;
    for (let i = 0; i < res.data.length; i++) {
      temp += res.data[i].submoduleId.length;
    }

    setTopicNbr(temp);
  };

  useEffect(() => {
    getModuleData();
  }, []);

  return (
    <div className="text-white  mt-10 flex flex-row">
      <div className="text-4xl ml-[5%] mt-12 font-bold">
        Course <br />
        Summary
      </div>
      <div className="pr-24 ml-16 ">
        <div className="text-5xl ml-16 overline decoration-[#03C9D7]  pt-2 mb-5 mt-10 font-bold text-center">
          {moduelNbr}
        </div>
        <span className="ml-16 mt-16">MODULE</span>
      </div>
      <div className="border border-gray-600 h-20 mt-[50px]"></div>
      <div className="pr-24 ml-10">
        <div className="text-5xl ml-16 overline decoration-[#03C9D7] pt-2 mb-5 mt-10 font-bold text-center">
          {topicNbr}
        </div>
        <span className="ml-16 mt-16">TOPIC</span>
      </div>
      <div className="border border-gray-600 h-20 mt-[50px]"></div>
      <div className="pr-24 ml-10">
        <div className="text-5xl ml-16 overline decoration-[#03C9D7] pt-2 mb-5 mt-10 font-bold text-center">
          0
        </div>
        <span className="ml-16 mt-16">ASSIGNMENT</span>
      </div>
      <div className="border border-gray-600 h-20 mt-[50px]"></div>
      <div className="pr-24 ml-10">
        <div className="text-5xl ml-16 overline decoration-[#03C9D7] pt-2 mb-5 mt-10 font-bold text-center">
          2
        </div>
        <span className="ml-16 mt-16">QUIZ</span>
      </div>
      <div className="border border-gray-600 h-20 mt-[50px]"></div>
      <div className="pr-5 ml-8">
        <div className="text-5xl ml-16 overline decoration-[#03C9D7] pt-2 mb-5 mt-10 font-bold text-center">
          2
        </div>
        <span className="ml-16 mt-16">ONLINE SESSION</span>
      </div>
    </div>
  );
};

export default CourseSummary;

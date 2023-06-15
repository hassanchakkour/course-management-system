import React from "react";
import { BsFillMicFill } from "react-icons/bs";
import { AiFillFileText } from "react-icons/ai";
import { RiSurveyFill } from "react-icons/ri";
import { MdViewModule, MdDocumentScanner } from "react-icons/md";

const Content = () => {
  return (
    <div className="">
      <div className="border flex">
        <div className="my-[8%]">
          <div className="ml-10 bg-secondary-dark-bg mt-10 rounded p-4 text-2xl flex">
            <ul className=" rounded">
              <li className="mb-5 text-green-500">
                <MdViewModule />
              </li>
              <li className="mb-5 text-green-300">
                <MdDocumentScanner />
              </li>
              <li className="mb-5">
                <hr />
              </li>
              <li className="mb-5 text-blue-500">
                <BsFillMicFill />
              </li>
              <li className="mb-5 text-white">
                <AiFillFileText />
              </li>
              <li className="mb-5 text-orange-500">
                <RiSurveyFill />
              </li>
            </ul>
          </div>
        </div>
        <div className="my-[5%] mx-11 border w-full h-[50vh]"> </div>
      </div>
    </div>
  );
};

export default Content;

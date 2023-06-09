import React, { useState, useEffect } from "react";
import axios from "axios";

const ButtonMove = ({
  setBtnIsOpen,
  activityTitle,
  course,
  subsId,
  activeId,
  onMoveButtonClick,
}) => {
  const [modules, setModules] = useState();
  const [subTitle, setSubTitle] = useState("");
  const [subId, setSubId] = useState("");
  console.log("this from back", activeId);
  const getModuleData = async () => {
    let sendData = {
      courseId: course,
    };
    const res = await axios.post(
      "http://localhost:5000/api/modules/course",
      sendData
    );
    // console.log(res.data.submoduleId);
    setModules(res.data);
  };
  const moveActivity = async () => {
    const data = { subId, subTitle };
    onMoveButtonClick(data);
  };

  useEffect(() => {
    getModuleData();
  }, []);

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 z-50 rounded-lg shadow-lg relative  flex flex-col w-full bg-gradient-to-b from-[#242830] to-[#33373E] outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl text-white font-semibold">
                Move Activity: 
                <span className="text-teal-500 text-m"> {activityTitle}</span>
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="my-4 mx-10 text-slate-500 text-lg leading-relaxed">
                {modules &&
                  modules.map((mods) => {
                    return (
                      <div key={mods._id}>
                        {mods.submoduleId.map((submodule) => {
                          const isActive = submodule._id === subId; // Check if the submodule is active
                          return (
                            <div key={submodule._id}>
                              {subsId != submodule._id ? (
                                <span
                                  key={submodule._id}
                                  className={`text-white cursor-pointer p-5 mb-2 block border ${
                                    isActive ? "border-green-500" : ""
                                  }`}
                                  onClick={() => {
                                    setSubTitle(submodule.title);
                                    setSubId(submodule._id);
                                    console.log(submodule._id);
                                  }}
                                >
                                  {submodule.title}
                                </span>
                              ) : (
                                <span
                                  key={submodule._id}
                                  className={`text-white hidden cursor-pointer p-5 mb-2  border ${
                                    isActive ? "border-green-500" : ""
                                  }`}
                                  onClick={() => {
                                    setSubTitle(submodule.title);
                                    setSubId(submodule._id);
                                  }}
                                >
                                  {submodule.title}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>
            </div>
            {subTitle && (
              <div className="text-white">Moving Activity to: {subTitle}</div>
            )}
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                 className="text-teal-500 border rounded-full mr-2 border-teal-500 font-semibold uppercase px-4 py-2 text-sm hover:bg-teal-500 hover:text-white shadow"
                type="button"
                onClick={() => setBtnIsOpen(false)}
              >
                Cancel
              </button>
              <button
               className="bg-teal-500 text-sm text-white py-2 px-8 rounded-full hover:bg-teal-700 shadow" 
                type="button"
                onClick={() => {
                  setBtnIsOpen(false);
                  moveActivity();
                }}
              >
                Move
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default ButtonMove;

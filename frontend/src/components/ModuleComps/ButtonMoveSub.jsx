import React, { useState, useEffect } from "react";
import axios from "axios";

const ButtonMoveSub = ({
  setBtnIsSubOpen,
  submoduleTitle,
  course,
  modsId,
  subId,
  onMoveButtonClick,
}) => {
  const [modules, setModules] = useState();
  const [ModsTitle, setModsTitle] = useState("");
  const [moduleId, setModuleId] = useState("");
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
  const moveSubs = async () => {
    const data = { moduleId, ModsTitle };
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
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-[#242830] to-[#33373E] outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl text-white font-semibold">
                Move Activity:
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="my-4 mx-10 text-slate-500 text-lg leading-relaxed">
                {modules &&
                  modules.map((mods) => {
                    const isActive = mods._id === moduleId;
                    return (
                      <>
                        {" "}
                        <div key={mods._id}>
                          {modsId != mods._id ? (
                            <span
                              key={mods._id}
                              className={`text-white cursor-pointer p-5 mb-2 block border ${
                                isActive ? "border-green-500" : ""
                              }`}
                              onClick={() => {
                                setModsTitle(mods.title);
                                setModuleId(mods._id);
                                console.log(mods._id);
                              }}
                            >
                              {mods.title}
                            </span>
                          ) : (
                            <span
                              key={mods._id}
                              className={`text-white hidden cursor-pointer p-5 mb-2  border ${
                                isActive ? "border-green-500" : ""
                              }`}
                              onClick={() => {
                                setModsTitle(mods.title);
                                setModuleId(mods._id);
                              }}
                            >
                              {mods.title}
                            </span>
                          )}
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
            {ModsTitle && (
              <div className="text-white">Moving Submodule to: {ModsTitle}</div>
            )}
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => setBtnIsSubOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setBtnIsSubOpen(false);
                  moveSubs();
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

export default ButtonMoveSub;

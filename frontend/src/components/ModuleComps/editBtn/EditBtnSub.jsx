import React, { useState, useEffect } from "react";
import axios from "axios";

const ButtonMove = ({
  setBtnEditSubOpen,
  subTitle,
  course,
  subId,
  onMoveButtonClick,
}) => {
  const [modules, setModules] = useState();
  const [submoduleTitle, setSubmoduleTitle] = useState(subTitle);
  const [subModId, setSubModId] = useState();
  const [message, setMessage] = useState("");
  const getModuleData = async () => {
    let sendData = {
      courseId: course,
    };
    const res = await axios.post(
      "http://localhost:5000/api/modules/course",
      sendData
    );
    setModules(res.data);
  };
  const saveChanges = async (e) => {
    if (subTitle != submoduleTitle) {
      const data = { submoduleTitle, subModId };
      onMoveButtonClick(data);
    } else {
      setMessage("Titles Can't be the same !");
    }
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
                Editing Submodule:
                <span className="text-teal-500 text-l"> {subTitle}</span> 
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
                          return (
                            <div key={submodule._id}>
                              {subId == submodule._id ? (
                                <span
                                  key={submodule._id}
                                  className={`text-white   p-5 mb-2  border `}
                                  onClick={() => {
                                    setSubmoduleTitle(submodule.title);
                                    setSubModId(submodule._id);
                                  }}
                                >
                                  <input
                                    type="text"
                                    value={submoduleTitle}
                                    className="bg-transparent border-none focus:outline-none focus:ring-0"
                                    onChange={(e) =>
                                      setSubmoduleTitle(e.target.value)
                                    }
                                  />
                                </span>
                              ) : (
                                <span
                                  className={`text-white cursor-pointer hidden p-5 mb-2  border`}
                                  onClick={() => {
                                    setSubmoduleTitle(submodule.title);
                                    setSubModId(submodule._id);
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
              <div className="text-white text-center">
                Changing:{" "}
                <span className="ml-2 text-blue-300 mr-2">{subTitle} </span>
                to:{" "}
                <span className="ml-2 text-yellow-500">{submoduleTitle}</span>
              </div>
            )}
            {/*footer*/}

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <span className="text-red-500 text-sm absolute top-0 mt-20 mr-[188px]">
                {message}
              </span>
              <button
                className="text-teal-500 border rounded-full mr-2 border-teal-500 font-semibold uppercase px-4 py-2 text-sm hover:bg-teal-500 hover:text-white shadow"
                type="button"
                onClick={() => setBtnEditSubOpen(false)}
              >
                Cancel
              </button>
              <button
               className="bg-teal-500 text-sm text-white py-2 px-8 rounded-full hover:bg-teal-700 shadow" 
                type="button"
                onClick={() => {
                  if (subTitle != submoduleTitle) {
                    setBtnEditSubOpen(false);
                    saveChanges();
                  } else {
                    setMessage("Titles Can't be the Same !");
                  }
                }}
              >
                Save
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

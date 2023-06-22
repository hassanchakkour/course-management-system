import React, { useState, useEffect } from "react";
import axios from "axios";

const ButtonMove = ({
  setBtnEditOpen,
  modulehead,
  course,
  modsId,
  onMoveButtonClick,
}) => {
  const [modules, setModules] = useState();
  const [moduleTitle, setModuleTitle] = useState(modulehead);
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
  const saveChanges = async () => {
    const data = { moduleTitle, modsId };
    if (modulehead != moduleTitle) {
      onMoveButtonClick(data);
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
                Editing Module: {modulehead}
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="my-4 mx-10 text-slate-500 text-lg leading-relaxed">
                {modules &&
                  modules.map((mods) => {
                    return (
                      <div key={mods._id}>
                        {modsId == mods._id ? (
                          <span
                            // key={mods._id}
                            className={`text-white  cursor-pointer pl-10 pr-20 p-5 mb-2  border 
                            `}
                          >
                            <input
                              type="text"
                              value={moduleTitle}
                              className="bg-transparent border-none focus:outline-none focus:ring-0"
                              onChange={(e) => setModuleTitle(e.target.value)}
                            />
                          </span>
                        ) : (
                          <span
                            key={mods._id}
                            className={`text-white hidden cursor-pointer p-5 ml-5 mb-2  border 
                            `}
                          >
                            {mods.title}
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
            {modulehead && (
              <div className="text-white text-center">
                Changing:{" "}
                <span className="ml-2 text-blue-300 mr-2">{modulehead} </span>
                to: <span className="ml-2 text-yellow-500">{moduleTitle}</span>
              </div>
            )}
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <span className="text-red-500 text-sm absolute top-0 mt-20 mr-[250px]">
                {message}
              </span>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setBtnEditOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  if (modulehead != moduleTitle) {
                    setBtnEditOpen(false);
                    saveChanges();
                  } else {
                    setMessage("Titles can't be the Same !!");
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

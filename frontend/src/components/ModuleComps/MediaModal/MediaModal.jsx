import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import axios from "axios";

const MediaModal = ({ setMediaModal, activityTitle, activeId }) => {
  const [quizTitle, setQuizTitle] = useState(activityTitle);
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [passingGrade, setPassingGrade] = useState(0);
  const [nbrAttempts, setNbrAttempts] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const [nbrQuestion, setNbrQuestion] = useState();
  const navigate = useNavigate();
  const quizCreator = async () => {
    // onMoveButtonClick(data);
  };
  const getActivity = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/activities/${activeId}`
    );

    setDescription(res.data.description);
    setInstructions(res.data.instructions);
    setDuration(res.data.duration);
    setNbrAttempts(res.data.numberOfAttempts);
    setPassingGrade(res.data.passingGrade);
    setNbrQuestion(res.data.questionId.length);
    console.log(res.data);
  };
  const handleSubmit = async () => {
    if (
      description === "" ||
      instructions === "" ||
      nbrAttempts === 0 ||
      duration === 0
    ) {
      setError(true);
    } else {
      let sendData = {
        title: quizTitle,
        description: description,
        passingGrade: passingGrade,
        duration: duration,
        numberOfAttempts: nbrAttempts,
        instructions: instructions,
      };
      const res = await axios.put(
        `http://localhost:5000/api/activities/updateSingleActivity/${activeId}`,
        sendData
      );
      console.log(res);
      setError(false);
      navigate("/quizCreator");
    }
  };
  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[750px] my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-[#242830] to-[#33373E] outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl text-white font-semibold">
                Quiz: {quizTitle}
              </h3>
            </div>
            {/*body*/}

            <div className="relative p-6 flex-auto">
              <div className="my-4 mx-10 text-slate-500 text-lg leading-relaxed">
                <label
                  htmlFor="titleInput"
                  className="my-4 text-slate-400 text-lg leading-relaxed"
                >
                  Title
                </label>
                <div className="mb-3 pt-0">
                  <input
                    type="text"
                    value={quizTitle}
                    id="titleInput"
                    placeholder="Add Title"
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent"
                  />
                </div>
                <label className="my-4 text-slate-400 text-lg leading-relaxed">
                  Description
                </label>
                <div className="mb-3 pt-0">
                  <textarea
                    type="text"
                    value={description}
                    // placeholder={activity.description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent"
                  />
                </div>
                <label className="my-4 text-slate-400 text-lg leading-relaxed">
                  Instructions
                </label>
                <div className="mb-3 pt-0">
                  <textarea
                    type="text"
                    value={instructions}
                    placeholder="Add Instructions"
                    onChange={(e) => setInstructions(e.target.value)}
                    className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent"
                  />
                </div>
                <label className="my-4 text-slate-400 text-lg leading-relaxed">
                  Passing Grade
                </label>
                <div className="mb-3 pt-0">
                  <input
                    type="number"
                    disabled={true}
                    value={passingGrade}
                    placeholder="Add a Passing Grade"
                    onChange={(e) => setPassingGrade(e.target.value)}
                    className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent"
                  />
                </div>
                <label className="my-4 text-slate-400 text-lg leading-relaxed">
                  Number Of Attempts
                </label>
                <div className="mb-3 pt-0">
                  <input
                    type="number"
                    value={nbrAttempts}
                    placeholder="Add a Number Of Attempts"
                    onChange={(e) => setNbrAttempts(e.target.value)}
                    className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent"
                  />
                </div>
                <label className="my-4 text-slate-400 text-lg leading-relaxed">
                  Duration
                </label>
                <div className="mb-3 pt-0">
                  <input
                    type="number"
                    value={duration}
                    placeholder="Add Duration in min"
                    onChange={(e) => setDuration(e.target.value)}
                    className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent"
                  />
                </div>
                <label className="my-4 text-slate-400 text-lg leading-relaxed">
                  Number Of Questions
                </label>
                <div className="mb-3 pt-0">
                  <input
                    type="number"
                    disabled={true}
                    value={nbrQuestion}
                    placeholder="Add Duration in min"
                    className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent"
                  />
                </div>
                {/* <div className="">
                    <label className="my-4 text-slate-400 text-lg leading-relaxed">
                      Load Quiz
                    </label>
                    <select className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent">
                      <option>asd</option>
                    </select>
                  </div> */}
              </div>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              {error && (
                <p className="absolute left-16 text-red-500 mb-2 ">
                  <span className="flex">
                    {" "}
                    <FiAlertTriangle className="mt-1 mr-2" /> Please Fill all
                    the Fields !!
                  </span>
                </p>
              )}
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setMediaModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setMediaModal(false);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default MediaModal;

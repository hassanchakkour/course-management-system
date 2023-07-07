import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { BiMessageError } from "react-icons/bi";
import axios from "axios";

const QuizComplPercModal = ({
  setShowQuizModal,
  nbrQuiz,
  quiz_Ids,
  handleSuccessQuizMessage,
}) => {
  const { currentColor } = useStateContext();
  // console.log(quiz_Ids);
  const [quizComplPer, setQuizComplPer] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);

  const setCompletionQuiz = async () => {
    try {
      for (let i = 0; i < quiz_Ids.length; i++) {
        let sendData = {
          completion: quizComplPer,
        };
        const res = await axios.put(
          `http://localhost:5000/api/activities/updateSingleActivity/${quiz_Ids[i]}`,
          sendData
        );
      }
      handleSuccessQuizMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative -mt-32  my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-[#242830] to-[#33373E] outline-none focus:outline-none">
            {/*header*/}
            <div className="  p-5 border-b border-solid border-slate-200 rounded-t">
              <div>
                <p className="text-2xl text-white font-semibold">
                  Please enter the{" "}
                  <span
                    style={{ color: currentColor }}
                    className="italic font-bold"
                  >
                    total
                  </span>{" "}
                  completion percentage for
                  <span style={{ color: currentColor }}> {nbrQuiz}</span>{" "}
                  quizzes.
                </p>
              </div>

              <div className="mb-3 mt-5 pt-0">
                <input
                  type="number"
                  required
                  onChange={(e) => setQuizComplPer(e.target.value)}
                  min="0"
                  placeholder="Add Total %"
                  className="px-3 mb-1 py-3 placeholder-slate-400 text-white relative bg-transparent rounded text-sm border-1 shadow outline-none focus:outline-none  w-full"
                />
              </div>
              {errorMessage && (
                <div className="flex align-middle -mt-3">
                  <BiMessageError className="text-red-500 mt-6 text-lg" />
                  <p className="text-red-500 font-semibold capitalize  text-base  mt-5 md:mr-14 mr-2 ml-2">
                    Please add the total percentage for Quiz
                  </p>
                </div>
              )}
            </div>

            {/*footer*/}
            <div className="flex items-center  justify-center p-6 ">
              <button
                className="px-4 py-2 text-teal-500 hover:text-white hover:bg-teal-500 border rounded-full mr-2  border-teal-500  font-semibold capitalize  text-sm ease-linear transition-all duration-150 "
                type="button"
                onClick={() => setShowQuizModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-teal-500  hover:bg-teal-600 text-sm text-white py-2 px-4 rounded-full ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  if (!quizComplPer) {
                    setErrorMessage(true);
                    setTimeout(() => {
                      setErrorMessage(false);
                    }, 2500);
                  } else {
                    setCompletionQuiz();
                    setShowQuizModal(false);
                  }
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default QuizComplPercModal;

import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const BadgeModal = ({
  setShowBadgeModal,
  studentName,
  student_Id,
  handleBadge,
}) => {
  const { currentColor } = useStateContext();

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative -mt-28 my-6 mx-auto max-w-2xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-[#242830] to-[#33373E] outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <p className="text-2xl text-white font-semibold">
                Are you sure you want to grant this badge to <br />
                <span style={{ color: currentColor }}>
                  {" "}
                  ' {studentName} '
                </span>{" "}
                ?
              </p>
            </div>

            {/*footer*/}
            <div className="flex items-center  justify-center p-6 ">
              <button
                className="px-4 py-2 text-teal-500 hover:text-white hover:bg-teal-500 border rounded-full mr-2  border-teal-500  font-semibold capitalize  text-sm ease-linear transition-all duration-150 "
                type="button"
                onClick={() => setShowBadgeModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-teal-500  hover:bg-teal-600 text-sm text-white py-2 px-4 rounded-full ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setShowBadgeModal(false);
                  handleBadge(student_Id);
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

export default BadgeModal;

import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import "./studentsScrollStyle.css";
import avatar from "../assets/images/avatar1.jpg";

const StudentsPage = () => {
  const { currentColor } = useStateContext();
  return (
    <>
      <div className="relative  lg:ml-14 md:ml-8 md:mt-12 ml-6 mt-28 w-11/12 overflow-x-auto custom-scrollbar drop-shadow-md dark:drop-shadow-xl bg-main-bg dark:bg-main-dark-bg sm:rounded-lg p-10">
        <div className="flex items-center justify-between pb-4 bg-main-bg dark:bg-main-dark-bg">
          <p className="text-xl font-semibold dark:text-gray-300">Students</p>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <div>
          <table className="w-full text-base text-center text-gray-500 dark:text-gray-400 ">
            <thead className="text-base text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Assignment
                </th>
                <th scope="col" className="px-6 py-3">
                  Quiz
                </th>
                <th scope="col" className="px-6 py-3">
                  Online Session
                </th>
                <th scope="col" className="px-6 py-3">
                  Badges
                </th>
                <th scope="col" className="px-6 py-3">
                  Certificates
                </th>
                <th scope="col" className="px-6 py-3">
                  Completion
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  style={{ marginTop: "0.5rem" }}
                  className="flex  items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div>
                    <div className="text-base font-semibold">Neil Sims</div>
                    <div className="font-normal text-gray-500">
                      neil.sims@flowbite.com
                    </div>
                  </div>
                </th>

                <td className="px-6 py-4">0</td>
                <td className="px-6 py-4">0</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 font-bold leading-tight text-green-700  rounded-sm">
                    {" "}
                    Present{" "}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="bg-yellow-100 flex justify-center items-center text-yellow-800 text-xs w-fit font-medium  px-2.5 py-0.5 rounded-full">
                    Front end
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    id="badge-dismiss-default"
                    className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded "
                  >
                    Full Stack
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="mr-2">100%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-500">
                        <div
                          style={{ width: "100%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p>Passed</p>
                </td>
                <td className="px-6 py-4">
                  <button
                    style={{ backgroundColor: currentColor }}
                    className={`px-4 py-2 rounded-md text-white`}
                  >
                    Issue Badge
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentsPage;

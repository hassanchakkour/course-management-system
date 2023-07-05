import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import "./studentsScrollStyle.css";
import axios from "axios";
import { Progress } from "@material-tailwind/react";
const StudentsPage = () => {
  const { currentColor, courseID } = useStateContext();

  const courseId = localStorage.getItem("course_id", courseID);
  // console.log("cid", courseId);

  const [users, setUsers] = useState();
  const [badge, setBadge] = useState();

  const getAllStudents = async () => {
    let sendData = {
      courseId: courseId,
    };
    const res = await axios.post(
      "http://localhost:5000/api/users/getAll",
      sendData
    );
    // console.log("this", res.data.badges);
    setUsers(res.data);
  };
  const getBadge = async () => {
    let sendData = {
      courseId: courseId,
    };
    const res = await axios.post(
      "http://localhost:5000/api/badges/getBadge",
      sendData
    );
    // console.log(res.data[0]._id);
    setBadge(res.data[0]);
  };

  // console.log(badge._id);
  const handleBadge = async (id) => {
    try {
      let sendData = {
        badgeId: badge._id,
        studentId: id,
      };
      const res = await axios.post(
        "http://localhost:5000/api/badges/updateBadge",
        sendData
      );
    } catch (error) {
      console.log(error);
    } finally {
      getAllStudents();
    }

    // console.log(res.data);
  };

  useEffect(() => {
    getAllStudents();
    getBadge();
  }, []);

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
            {users &&
              users.map((user, index) => {
                return (
                  <tbody key={user._id}>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        style={{ marginTop: "0.5rem" }}
                        className="  items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div>
                          <div className="text-base font-semibold">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="font-normal text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </th>

                      <td className="px-6 py-4">0</td>
                      <td className="px-6 py-4">0</td>
                      <td className="px-6 py-4">
                        {index % 2 === 0 ? (
                          <span className="px-2 py-1 font-bold leading-tight text-green-700  rounded-sm">
                            2/3
                          </span>
                        ) : (
                          <span className="px-2 py-1 font-bold leading-tight text-red-700  rounded-sm">
                            1/3
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {badge ? badge.title : null}
                      </td>
                      <td className="px-6 py-4">Full Stack</td>
                      <td className="px-2 py-4">
                        <div className="flex justify-center items-center">
                          <span>45%</span>
                          <div className="w-full ml-2 bg-gray-200 rounded-full h-2.5  dark:bg-gray-700">
                            <div
                              className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 ">
                        <p>Passed</p>
                      </td>
                      <td className="px-6 py-4">
                        {badge && user.badges.includes(badge._id) ? (
                          <p className="text-green-500 font-bold">Issued</p>
                        ) : (
                          <button
                            style={{
                              backgroundColor: badge ? currentColor : "gray",
                            }}
                            className={`px-4 py-2 rounded-md text-white ${
                              badge ? "" : "bg-gray-300"
                            }`}
                            disabled={badge ? false : true}
                            onClick={() => handleBadge(user._id)}
                          >
                            Issue Badge
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentsPage;

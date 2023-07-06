import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import "./studentsScrollStyle.css";
import axios from "axios";
import { Progress } from "@material-tailwind/react";
import BadgeModal from "./BadgeModal";
import QuizComplPercModal from "./quizComplPercModal";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { VscCircleFilled } from "react-icons/vsc";
import { Tooltip } from "@mui/material";

const StudentsPage = () => {
  const { currentColor, courseID } = useStateContext();

  const courseId = localStorage.getItem("course_id", courseID);
  // console.log("cid", courseId);

  const [users, setUsers] = useState();
  const [badge, setBadge] = useState();
  const [nbrOnline, setNbrOnline] = useState(0);
  const [passingGrades, setPassingGrades] = useState(0);
  const [assignmentPass, setAssignmentPass] = useState(0);

  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [student_Id, setStudent_Id] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showOnlineSessionModal, setShowOnlineSessionModal] = useState(false);

  const getAllStudents = async () => {
    let sendData = {
      courseId: courseId,
    };
    const res = await axios.post(
      "http://localhost:5000/api/users/getAll",
      sendData
    );
    console.log("this", res.data);
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
      setSuccessMessage("Badge successfully issued!");
      setTimeout(() => setSuccessMessage(""), 2500);
    } catch (error) {
      console.log(error);
    } finally {
      getAllStudents();
    }

    // console.log(res.data);
  };

  const getModuleData = async () => {
    let sendData = {
      courseId: courseId,
    };
    const res = await axios.post(
      "http://localhost:5000/api/modules/course",
      sendData
    );
    // console.log(res.data[0].submoduleId);
    let onlineTemp = 0;

    for (let i = 0; i < res.data.length; i++) {
      for (let j = 0; j < res.data[i].submoduleId.length; j++) {
        for (let k = 0; k < res.data[i].submoduleId[j].activityId.length; k++) {
          if (
            res.data[i].submoduleId[j].activityId[k].type === "online session"
          ) {
            onlineTemp += 1;
          }
        }
      }
    }
    let passGrade = 0;
    let nbr = 0;
    for (let i = 0; i < res.data.length; i++) {
      for (let j = 0; j < res.data[i].submoduleId.length; j++) {
        for (let k = 0; k < res.data[i].submoduleId[j].activityId.length; k++) {
          if (res.data[i].submoduleId[j].activityId[k].type === "Quiz") {
            passGrade = res.data[i].submoduleId[j].activityId[k].passingGrade;
            nbr += 1;
          }
        }
      }
    }

    let AssignemntPassingGrade = 0;
    for (let i = 0; i < res.data.length; i++) {
      for (let j = 0; j < res.data[i].submoduleId.length; j++) {
        for (let k = 0; k < res.data[i].submoduleId[j].activityId.length; k++) {
          if (
            res.data[i].submoduleId[j].activityId[k].type === "Assignment" &&
            res.data[i].submoduleId[j].activityId[k].passingGrade != 0
          ) {
            AssignemntPassingGrade =
              res.data[i].submoduleId[j].activityId[k].passingGrade;
          }
        }
      }
    }
    console.log(nbr);
    setAssignmentPass(AssignemntPassingGrade);
    setNbrOnline(onlineTemp);
    setPassingGrades(passGrade);
  };

  const grades = (asd) => {
    let nbr = 0;
    for (let i = 0; i < asd.length; i++) {
      if (asd[i].type === "Quiz") {
        nbr += asd[i].grade;
        console.log(asd[i].grade);
      }
    }
    return nbr;
  };
  const gradeAssignment = (asd) => {
    let nbr = 0;
    for (let i = 0; i < asd.length; i++) {
      if (asd[i].type === "Assignment") {
        nbr += asd[i].grade;
      }
    }
    return nbr;
  };
  const gradeOnline = (asd) => {
    let nbr = 0;
    for (let i = 0; i < asd.length; i++) {
      if (asd[i].type === "online session") {
        nbr += 1;
      }
    }
    return nbr;
  };
  const onlineSessionFormula = (asd) => {
    if (Math.floor(nbrOnline / 2) <= gradeOnline(asd)) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    getAllStudents();
    getBadge();
    getModuleData();
  }, []);
  return (
    <>
      <div
        style={{ filter: `drop-shadow(0px 0px 3px ${currentColor})` }}
        className="relative  lg:ml-14  md:mt-2 ml-6  mt-20 w-11/12 overflow-x-auto custom-scrollbar drop-shadow-md dark:drop-shadow-xl bg-main-bg dark:bg-main-dark-bg sm:rounded-lg p-6"
      >
        <div className="flex items-center justify-between pb-4 bg-main-bg dark:bg-main-dark-bg">
          <p className="text-xl font-semibold dark:text-gray-300">Students</p>
          {successMessage && (
            <div className="mx-3 flex items-center min-w-fit">
              <HiOutlineBadgeCheck className="text-green-500 md:text-2xl text-xl " />
              <p className="text-green-500 ml-2 md:text-lg text-base  ">
                {successMessage}
              </p>
            </div>
          )}
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

                <Tooltip
                  arrow
                  title={`Passing Grade : ${passingGrades}`}
                  placement="top"
                >
                  <th scope="col" className="px-6 py-3">
                    <button
                      className="uppercase px-2 py-1 font-bold rounded-lg text-teal-500 hover:text-gray-500 dark:hover:text-teal-300   mr-2     text-sm ease-linear transition-all duration-150"
                      onClick={() => {
                        // setShowQuizModal(true);
                      }}
                    >
                      Quiz
                    </button>
                  </th>
                </Tooltip>
                <Tooltip
                  arrow
                  title={`Passing Grade:  ${assignmentPass}`}
                  placement="top"
                >
                  <th scope="col" className="px-6 py-3">
                    <button className="uppercase px-2 py-1 font-bold rounded-lg text-teal-500 hover:text-gray-500 dark:hover:text-teal-300   mr-2     text-sm ease-linear transition-all duration-150">
                      Assignment
                    </button>
                  </th>
                </Tooltip>
                <th scope="col" className="px-6 py-3">
                  <button className="uppercase px-2 py-1 font-bold rounded-lg text-teal-500 hover:text-gray-500 dark:hover:text-teal-300   mr-2     text-sm ease-linear transition-all duration-150">
                    Online Session
                  </button>
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
                // console.log(user.submitted);
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

                      {grades(user.submitted) >= passingGrades ? (
                        <td className="px-6 py-4">
                          <p className="text-green-500 ">
                            {grades(user.submitted)}
                          </p>
                        </td>
                      ) : (
                        <td className="px-6 py-4">
                          <p className="text-red-500">
                            {grades(user.submitted)}
                          </p>
                        </td>
                      )}
                      {gradeAssignment(user.submitted) >= assignmentPass ? (
                        <td className="px-6 py-4">
                          <p className="text-green-500">
                            {gradeAssignment(user.submitted)}
                          </p>
                        </td>
                      ) : (
                        <td className="px-6 py-4">
                          <p className="text-red-500">
                            {gradeAssignment(user.submitted)}
                          </p>
                        </td>
                      )}
                      {onlineSessionFormula(user.submitted) ? (
                        <td className="px-6 py-4">
                          <p className="text-red-500">
                            {gradeOnline(user.submitted)} / {nbrOnline}
                          </p>
                        </td>
                      ) : (
                        <td className="px-6 py-4">
                          <p className="text-green-500  text-">
                            {gradeOnline(user.submitted)} / {nbrOnline}
                          </p>
                        </td>
                      )}

                      <td className="px-6 py-4">
                        {badge ? (
                          <div className="bg-amber-300 rounded-full py-0.5 px-4 text-amber-950 font-semibold">
                            {" "}
                            <span>{badge.title}</span>{" "}
                          </div>
                        ) : null}
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
                        <div className="flex align-middle justify-between">
                          <VscCircleFilled className="text-green-500 mt-1" />
                          <p className=" font-bold">Passed</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {badge && user.badges.includes(badge._id) ? (
                          <p className="text-amber-300 font-bold">Issued</p>
                        ) : (
                          <button
                            style={{
                              backgroundColor: badge ? "" : "gray",
                            }}
                            className={`px-4 py-2 rounded-md text-teal-500  hover:bg-teal-500 border  mr-2  border-teal-500  font-semibold capitalize  text-sm ease-linear transition-all duration-150
                             ${badge ? "hover:text-white" : "bg-gray-300"}`}
                            disabled={badge ? false : true}
                            onClick={() => {
                              setShowBadgeModal(true);
                              setStudentName(
                                `${user.firstName} ${user.lastName}`
                              );
                              setStudent_Id(`${user._id}`);
                              console.log(studentName);
                            }}
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
          {showBadgeModal && (
            <BadgeModal
              setShowBadgeModal={setShowBadgeModal}
              studentName={studentName}
              student_Id={student_Id}
              handleBadge={handleBadge}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default StudentsPage;

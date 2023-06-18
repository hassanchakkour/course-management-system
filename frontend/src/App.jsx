import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { Tooltip } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import { DashBoard, Courses, Students, Content } from "./pages";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import Resources from "./pages/Resources";
import QuizModal from "./pages/QuizModal";
import  QuestionsBank from "./pages/QuestionsBank";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        {userInfo ? (
          <div className={currentMode === "Dark" ? "dark" : ""}>
            <div className="flex relative dark:bg-main-dark-bg">
              <div
                className="fixed right-4 bottom-4"
                style={{ zIndex: "1000" }}
              >
                <Tooltip title="Settings" placement="top" arrow>
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: "50%" }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>
                </Tooltip>
              </div>
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                  <Sidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar />
                </div>
              )}
              <div
                className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
                  activeMenu ? "md:ml-72" : "flex-2"
                }`}
              >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                  <Navbar />
                </div>

                <div>
                  {themeSettings && <ThemeSettings />}
                  <Routes>
                    <Route
                      index={true}
                      path="/dashboard"
                      element={<DashBoard />}
                    />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/students" element={<Students />} />
<<<<<<< HEAD
                    <Route path="/calendar" element={<Content />} />
                    <Route path="/questionsBank" element={< QuestionsBank />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/quiz" element={<QuizModal />} />

=======

                    <Route path="/courseName" element={<Content />} />
                    <Route path="/question" element={<Question />} />
                    <Route path="/media" element={<Media />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/resources" element={<Resources />} />
>>>>>>> 5d363d2269f597438433d4f055f8875e76ecde16
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;

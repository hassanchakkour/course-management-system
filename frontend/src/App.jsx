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
import QuestionsBank from "./pages/QuestionsBank";
import Questions from "./components/QuizCreator/Questions";
import MultipleChoice from "./components/QuestionsModals/MultipleChoice";
import TrueOrFalse from "./components/QuestionsModals/TrueOrFalse";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    setActiveMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    setActiveMenu(false);
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
              {activeMenu ? (
                <div className="w-24 h-5/6 md:mt-16 mt-20 fixed sidebar bg-secondary-dark-bg rounded-r-3xl">
                  <Sidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar />
                </div>
              )}
              <div
                className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
                  activeMenu ? "md:ml-24" : "flex-2"
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

                    <Route path="/calendar" element={<Content />} />
                    <Route path="/questionsBank" element={<QuestionsBank />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/quiz" element={<QuizModal />} />
                    <Route path="/courseName" element={<Content />} />

                    <Route path="/quizCreator" element={<Questions />} />
                    <Route path="/messages" element={<MultipleChoice />} />
                    <Route path="/question1" element={<TrueOrFalse />} />
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

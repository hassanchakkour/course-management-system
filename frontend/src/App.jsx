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
              <div
                className={`fixed pb-3 top-0 z-10 left-0 w-28 h-[85%] lg:mt-[4%] md:mt-[10%] mt-[12%] overflow-y-scroll scrollbar-hide transition-transform  duration-300 ease-in-out ${
                  activeMenu
                    ? "transform translate-x-0 opacity-100"
                    : "transform -translate-x-full opacity-0"
                }`}
              >
                <div
                  style={{
                    borderColor: `${currentColor}`,
                    filter: `drop-shadow(0px 0px 3px ${currentColor})`,
                  }}
                  className="sidebar bg-secondary-dark-bg border-2 border-l-0 rounded-r-3xl h-full"
                >
                  <Sidebar />
                </div>
              </div>
              <div
                className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
                  activeMenu ? "md:ml-24 " : "flex-2"
                } transition-all duration-300 ease-in-out`}
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
                    <Route path="/Main" element={<Content />} />

                    <Route path="/quizCreator" element={<Questions />} />
                    <Route path="/messages" element={<Questions />} />
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

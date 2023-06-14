import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Footer, Sidebar, ThemeSettings ,Media} from "./components";
import { Courses, Students, Content, Question, Quiz } from "./pages";

import "./App.css";

const App = () => {
  const activeMenu = true;
  return (
    <>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
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
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              <Routes>
                <Route path="/" element={<Courses />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/students" element={<Students />} />
                <Route path="/media" element={<Media />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/question" element={<Question />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;

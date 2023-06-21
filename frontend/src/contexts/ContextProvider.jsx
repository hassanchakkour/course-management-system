import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentBgColor, setCurrentBgColor] = useState("bg-hero-2");
  const [currentMode, setCurrentMode] = useState("Dark");
  const [themeSettings, setThemeSettings] = useState(false);
  const [courseID, setCourseID] = useState("");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    // Update currentBgColor based on currentColor
    if (currentColor === "#1A97F5") {
      setCurrentBgColor("bg-hero-1");
    } else if (currentColor === "#03C9D7") {
      setCurrentBgColor("bg-hero-2");
    } else if (currentColor === "#7352FF") {
      setCurrentBgColor("bg-hero-3");
    } else if (currentColor === "#FF5C8E") {
      setCurrentBgColor("bg-hero-4");
    } else if (currentColor === "#1E4DB7") {
      setCurrentBgColor("bg-hero-5");
    } else if (currentColor === "#FB9678") {
      setCurrentBgColor("bg-hero-6");
    }
  }, [currentColor]);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const setCourse_ID = (course_ID, course_Name) => {
    setCourseID(course_ID);
    setCourseName(course_Name);
    localStorage.setItem("course_id", course_ID);
    localStorage.setItem("course_name", course_Name);
  };

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        currentBgColor,
        setCurrentBgColor,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        courseID,
        setCourseID,
        courseName,
        setCourseName,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        setCourse_ID,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

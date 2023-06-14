import React, { useState } from "react";

const Content = () => {
  const [widgets, setWidgets] = useState([]);

  const handleModules = () => {
    setWidgets((prevWidgets) => [
      ...prevWidgets,
      <div className="border w-[400px] m-5 p-2">Module</div>,
    ]);
  };

  const handleTopic = (index) => {
    const newWidgets = [...widgets];
    const nestedDiv = (
      <div className="border m-2  p-2">Submodule</div>
    );
    const existingWidget = newWidgets[index];
    newWidgets[index] = React.cloneElement(
      existingWidget,
      {},
      existingWidget.props.children,
      nestedDiv
    );
    setWidgets(newWidgets);
  };

  const handleQuiz = (index) => {
    const newWidgets = [...widgets];
    const nestedDiv = (
      <div className="border p-2">Quiz</div>
    );
    const existingWidget = newWidgets[index];
    newWidgets[index] = React.cloneElement(
      existingWidget,
      {},
      existingWidget.props.children,
      nestedDiv
    );
    setWidgets(newWidgets);
  };
  const handleRecord = (index) => {
    const newWidgets = [...widgets];
    const nestedDiv = (
      <div className="border p-2">Record</div>
    );
    const existingWidget = newWidgets[index];
    newWidgets[index] = React.cloneElement(
      existingWidget,
      {},
      existingWidget.props.children,
      nestedDiv
    );
    setWidgets(newWidgets);
  };
  const handleSurvey = (index) => {
    const newWidgets = [...widgets];
    const nestedDiv = (
      <div className="border p-2">Survey</div>
    );
    const existingWidget = newWidgets[index];
    newWidgets[index] = React.cloneElement(
      existingWidget,
      {},
      existingWidget.props.children,
      nestedDiv
    );
    setWidgets(newWidgets);
  };

  return (
    <div>
      <div className="flex">
        <div className="my-[10%] mx-10">
          <ul>
            <li onClick={handleModules}>module</li>
            <br />
            <li onClick={() => handleTopic(widgets.length - 1)}>Topic</li>
            <br />
            <li onClick={() => handleQuiz(widgets.length - 1)}>Quiz</li>
            <br />
            <li onClick={() => handleRecord(widgets.length - 1)}>Record</li>
            <br />
            <li onClick={() => handleSurvey(widgets.length - 1)}>Survey</li>
            <br />
          </ul>
        </div>
        <div className="my-[10%] flex flex-wrap mx-[20%] border h-[80vh] w-full">
          {widgets.map((widget, index) => (
            <div key={index}>{widget}</div>
          ))}
        </div>
      </div>
      <button className="absolute top-20 right-20 border bg-blue-600 p-3 rounded text-white">
        Save
      </button>
    </div>
  );
};

export default Content;

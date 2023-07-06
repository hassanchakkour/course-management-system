import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import axios from "axios";

import { useStateContext } from "../../../contexts/ContextProvider";


import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
} from "@dropzone-ui/react";

const MediaModal = ({ setMediaModal, activityTitle, activeId }) => {
  const [quizTitle, setQuizTitle] = useState(activityTitle);
  const [description, setDescription] = useState("");
  // const [file, setFile] = useState("");
  const [files, setFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const [error, setError] = useState(false);


  const { currentColor } = useStateContext();

  

  const navigate = useNavigate();
  const quizCreator = async () => {
    // onMoveButtonClick(data);
  };

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
    console.log(incommingFiles[0].name);
  };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };
  const getActivity = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/activities/${activeId}`
    );

    setDescription(res.data.description);

    console.log(res.data);
  };
  const handleSubmit = async () => {
    if (description === "") {
      setError(true);
    } else {
      let sendData = {
        title: quizTitle,
        description: description,
        file: file,
      };
      const res = await axios.put(
        `http://localhost:5000/api/activities/updateSingleActivity/${activeId}`,
        sendData
      );
      console.log(res);
      setError(false);
      navigate("/quizCreator");
    }
  };
  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[750px] my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-b from-[#242830] to-[#33373E] outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl text-white font-semibold">

                  Media: 
                  <span
                 className="text-teal-500 text-m">
                 {quizTitle}</span>
                 

              </h3>
            </div>
            {/*body*/}

            <div className="relative p-6 flex-auto">
              <div className="my-4 mx-10 text-slate-500 text-lg leading-relaxed">
                <label
                  htmlFor="titleInput"
                  className="my-4 text-slate-400 text-lg leading-relaxed"
                >
                  Title
                </label>
                <div className="mb-3 pt-0">
                  <input
                    type="text"
                    value={quizTitle}
                    id="titleInput"
                    placeholder="Add Title"
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent"
                  />
                </div>
                <label className="my-4 text-slate-400 text-lg leading-relaxed">
                  Description
                </label>
                <div className="mb-3 pt-0">
                  <textarea
                    type="text"
                    value={description}
                    // placeholder={activity.description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent"
                  />
                </div>

                <div>
                  <p>Upload a File</p>
                  <Dropzone
                    onChange={updateFiles}
                    // header={false}
                    footer={false}
                    style={{
                      backgroundColor: "transparent",
                      width: "300px",
                      color: "#718096",
                      fontSize: "20px",
                      border: "1px solid white",
                    }}
                    maxFiles={1}
                    accept=".pdf,.image,.jpeg,.mp4,.png,.jpg/*"
                    maxFileSize={2998000}
                    value={files}
                    label="Drag'n drop file here or click to browse"
                  >
                    {files.map((file) => (
                      <FileMosaic {...file} preview info onSee={handleSee} hd />
                    ))}
                  </Dropzone>
                  <FullScreen
                    open={imageSrc !== undefined}
                    onClose={() => setImageSrc(undefined)}
                  >
                    <ImagePreview src={imageSrc} />
                  </FullScreen>
                </div>

                {/* <label className="my-4 text-slate-400 text-lg leading-relaxed">
                  Media
                </label>
                <div className="mb-3 pt-0">
                  <input
                    id="outlined-error"
                    type="file"
                    label="Upload Media"
                    class="mt-2 block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                    onChange={handleFileChange}
                    name="file"
                    accept="image/*,video/*,audio/*"
                    placeholder="Upload Media"
                  />
                </div> */}

                {/* <div className="">
                    <label className="my-4 text-slate-400 text-lg leading-relaxed">
                      Load Quiz
                    </label>
                    <select className="px-3 mt-1 py-3 placeholder-slate-400 text-white relative  rounded text-sm border-1 shadow outline-none border-white focus:outline-none w-full bg-transparent">
                      <option>asd</option>
                    </select>
                  </div> */}
              </div>
            </div>

            {/*footer*/}
            <div className="flex items-center  justify-center p-6 border-t border-solid border-slate-200 rounded-b">
              {error && (
                <p className="absolute left-16 text-red-500 mb-2 ">
                  <span className="flex">
                    {" "}
                    <FiAlertTriangle className="mt-1 mr-2" /> Please Fill all
                    the Fields !!
                  </span>
                </p>
              )}
              <button
                className="text-teal-500 border rounded-full mr-2 border-teal-500 font-semibold uppercase px-4 py-2 text-sm hover:bg-teal-500 hover:text-white shadow"
                type="button"
                onClick={() => setMediaModal(false)}
              >
                Cancel
              </button>
              <button

             className="bg-teal-500 text-sm text-white py-2 px-4 rounded-full hover:bg-teal-700 shadow" 

                type="button"
                onClick={() => {
                  setMediaModal(false);
                }}
              >
                Submit 
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default MediaModal;

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";
// import { Dropzone, FileMosaic } from "@dropzone-ui/react";
// import ReactDOM from "react-dom";

import "../App.css";

import { TextField, Button, Container, Box } from "@mui/material";

const Media = () => {
  // const [files, setFiles] = useState([]);
  // const updateFiles = (incommingFiles) => {
  //   setFiles(incommingFiles);
  // };
  // const [selectedImage, setSelectedImage] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    const resourceData = {
      teacherId: userInfo._id,
      submoduleId: "648314914e78666518b69c5d",
      submitted: "648797b20da8cd5459f029ff",
      courseId:"648d8878a3be048f181521a5",
      title: title,
      description: JSON.stringify(description),
      file: file,
      type: "Media",
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/activities`,
        resourceData
      );

      console.log("Resource created:", response.data);

      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "size",
    "color",
    "background",
    "font",
    "align",
  ];
  

  return (
    <div className="QuizForm">
      <Container
        maxWidth="30%"
        sx={{
          // border: "1px solid #ccc",
          // borderRadius: "10px",
          // padding: "20px",
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box marginBottom="10px">
            <h4>Resource Name</h4>
            <TextField
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />
          </Box>
          <Box marginBottom="16px">
            <h4>Resource Description</h4>
            <ReactQuill
              label="Media Description"
              value={description}
              onChange={setDescription}
              modules={modules}
              formats={formats}
              render={() => (
                <TextField
                  label="Media"
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                  sx={{
                    marginBottom: "16px",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                />
              )}
            />
          </Box>
          <Box marginBottom="16px">
            <h4>Upload Resource</h4>
            {/* <input type="file" onChange={(e) => setFile(e.target.value)} />
            <Dropzone onChange={updateFiles} value={files}>
              {files.map((file) => (
                <FileMosaic {...file} preview />
              ))}
            </Dropzone> */}
             <Box marginBottom="16px">
            <h4>Upload Resource</h4>
            <input type="file" onChange={handleFileChange} />
           
          </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ borderRadius: "20%" }}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Media;

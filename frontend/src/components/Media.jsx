import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useSelector } from "react-redux";


import '../App.css'

  

import { TextField, Button, Container, Box} from "@mui/material";

const Media = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
 
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [file, setFile] = useState('');
  const { userInfo } = useSelector((state) => state.auth)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resourceData = {
      teacherId:userInfo._id,
      submoduleId: "648314914e78666518b69c5d",
      submitted:"648797b20da8cd5459f029ff",
     title:title,
     description:description,
      file:file,
    };
    console.log(resourceData)
    try {
      const response =  await axios.post(
        `http://localhost:5000/api/activities`,
        resourceData
       
      ); console.log( resourceData)
      console.log("Resource  created:", response.data);
      // Reset form fields
      setTitle("");
      setDescription("");
      
      setFile("");
    } catch (error) {
      console.error("Error creating question:", error);
    }

 
  };


  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  const formats = [    'header',    'bold',    'italic',    'underline',    'strike',    'blockquote',    'list', 
     'bullet',    'link',    'image',    'size',    'color',    'background',    'font',    'align',  ];
     
  return (
    <div className='QuizForm'>
       
       <Container
        maxWidth="30%"
        sx={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          maxHeight: "60vh", // Set the desired height for the scrollable area
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box marginBottom="20px">
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
                    maxHeight: "300px", // Set the desired height for the Quill editor
                    overflowY: "auto", // Enable vertical scrolling
                  }}
                />
              )}
            />
          </Box>
          {/* <Box>
          <form noValidate>
            <TextField
    id="datetime-local"
    label="Next appointment"
    type="datetime-local"
    defaultValue="2017-05-24T10:30"
    // className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
      />
        <TextField
    id="datetime-local"
    label="Next appointment"
    type="datetime-local"
    defaultValue="2017-05-24T10:30"
    // className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
      />
    </form>
    </Box> */}
          <Box marginBottom="16px">
            <h4>Upload Resource</h4>
            <input type="file" onChange={(e) => setFile(e.target.value)}  />
          </Box>
          <Button variant="contained" color="primary" type="submit" sx={{ borderRadius: "20%" }}>
            Submit
          </Button>
          {/* <Button variant="contained" color="secondary" sx={{ borderRadius: "20%", marginLeft: "10px" }}>
            Cancel
          </Button> */}
        </form>
      </Container>
  </div>
  );
}

export default Media;


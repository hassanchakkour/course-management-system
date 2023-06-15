import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import '../App.css'

  

import { TextField, Button, Container, Box} from "@mui/material";

const Media = () => {
  const [nb, setnb] = useState('');
  const [value, setValue]= useState('');
  const [title, settitle] = useState('');
  const [paragraphs, setParagraphs] = useState('');
  const [communityimg, setCommunityimg] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const currentDate = new Date();
  // const [isMediaVisible, setIsMediaVisible] = useState(true);

  // const [content, setContent] = useState('');
  
  

  const handleMediaUpload = (e) => {
    <p></p>
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const intercards = {
      title,
      nb,
      paragraphs,
      communityimg: communityimg,
      id: Math.floor(Math.random() * 1000) + 1, // generate a random ID
    };

    

    // Reset the form fields
    setnb('');
    settitle('');
    setParagraphs('');
 
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
     const isMediaVisible = startDate <= currentDate && currentDate <= endDate;
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
            <h4>Media Name</h4>
            <TextField
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />
          </Box>
          <Box marginBottom="16px">
            <h4>Media Description</h4>
            <ReactQuill
              label="Media Description"
              value={paragraphs}
              onChange={setParagraphs}
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
          <Box marginBottom="16px">
            <h4>Upload Media</h4>
            <input type="file" onChange={handleMediaUpload} />
          </Box>
          <Button variant="contained" color="primary" type="submit" sx={{ borderRadius: "20%" }}>
            Submit
          </Button>
          <Button variant="contained" color="secondary" sx={{ borderRadius: "20%", marginLeft: "10px" }}>
            Cancel
          </Button>
        </form>
      </Container>
  </div>
  );
}

export default Media;


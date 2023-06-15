import React, { useState } from 'react';
import { TextField, Button, Container, Box,MenuItem, Select,Radio,FormGroup, FormControlLabel,Switch,InputLabel, RadioGroup, FormControl, FormLabel } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../App.css';

const Quiz = () => {
  const [name, setName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [comments, setComments] = useState('');
  const [paragraphs, setParagraphs] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic
    console.log('Form submitted:', { name, selectedOption, comments });
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
        maxWidth="20%"
        sx={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          maxHeight: "60vh", // Set the desired height for the scrollable area
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <Box my={4}>
          <h2>Quiz Form</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Quiz Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
              margin="normal"
            />

             <FormControl fullWidth sx={{ marginTop: '16px' }}>
              <FormLabel>Quiz Description</FormLabel>
              <ReactQuill
                value={paragraphs}
                onChange={setParagraphs}
                modules={modules}
                formats={formats}
                render={({ editor }) => (
                  <TextField
                    label="Media"
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                    onClick={editor.focus}
                    sx={{
                      marginBottom: '16px',
                      maxHeight: '300px',
                      overflowY: 'auto',
                    }}
                  />
                )}
              />
              <FormLabel component="legend" sx={{ marginTop: '16px' }}>Instructions</FormLabel>
              <ReactQuill
                value={paragraphs}
                onChange={setParagraphs}
                modules={modules}
                formats={formats}
                render={({ editor }) => (
                  <TextField
                    label="Media"
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                    onClick={editor.focus}
                    sx={{
                      marginBottom: '16px',
                      maxHeight: '300px',
                      overflowY: 'auto',
                    }}
                  />
                )}
              />
               <TextField
              label="Post Note"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
              margin="normal"
            />
             <TextField
              label="Passing Grade"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
              margin="normal"
            />
             <TextField
              label="Number of Attempts"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
              margin="normal"
            />
             <TextField
              label="Duration in Minutes"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
              margin="normal"
            />
           <FormLabel component="legend" sx={{ marginTop: '16px', display: 'inline-block' }}>Load Quiz:
           <InputLabel id="demo-simple-select-label"></InputLabel>
             <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              width="50%"
              label=""
                // onChange={handleChange}
               >
                <MenuItem value={1}>Ten</MenuItem>
                 <MenuItem value={2}>Twenty</MenuItem>
               <MenuItem value={30}>Thirty</MenuItem>
         </Select>

              <Button type="button" variant="contained" color="primary">
                Create New Quiz
              </Button>
              </FormLabel>
         
                <FormGroup component="legend" sx={{ marginTop: '16px' }}>
             <FormControlLabel control={<Switch defaultChecked />} label="Shuffle Questions" />
             <FormControlLabel control={<Switch />} label="Enable Review Mode" />
             <FormControlLabel  control={<Switch />} label="Start Exam in Safe Browser" />
              </FormGroup>
           

            <Switch value="Group Students" inputProps={{ 'aria-label': 'Switch A' }}sx={{ marginTop: '16px', marginBottom:'16px' }} />

 </FormControl>
           
 <Button variant="contained" color="primary" type="submit" sx={{ borderRadius: "20%" }}>
            Submit
          </Button>
          <Button variant="contained" color="secondary" sx={{ borderRadius: "20%", marginLeft: "10px" }}>
            Cancel
          </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Quiz;

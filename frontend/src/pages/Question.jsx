import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Box,
} from '@mui/material';
import '../App.css'

const Question = () => {
  const [activityId, setActivityId] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic, such as creating a new question in the database
    console.log('Form submitted:', { activityId, type, content, options, correctOption });
    // Reset form fields
    setActivityId('');
    setType('');
    setContent('');
    setOptions([]);
    setCorrectOption('');
  };

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
      <Box my={4}>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="activityId-label">Activity</InputLabel>
              <Select
                labelId="activityId-label"
                id="activityId"
                value={activityId}
                onChange={(event) => setActivityId(event.target.value)}
                required
              >
                {/* Render the list of activities */}
                <MenuItem value="activity1">Activity 1</MenuItem>
                <MenuItem value="activity2">Activity 2</MenuItem>
                {/* Add more MenuItem components for each activity */}
              </Select>
            </FormControl>
          </Box>

          <Box mb={2}>
            <TextField
              label="Type"
              fullWidth
              value={type}
              onChange={(event) => setType(event.target.value)}
              required
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Content"
              multiline
              rows={4}
              fullWidth
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Options"
              multiline
              rows={4}
              fullWidth
              value={options.join('\n')}
              onChange={(event) => setOptions(event.target.value.split('\n'))}
              required
            />
          </Box>

          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="correctOption-label">Correct Option</InputLabel>
              <Select
                labelId="correctOption-label"
                id="correctOption"
                value={correctOption}
                onChange={(event) => setCorrectOption(event.target.value)}
                required
              >
                {/* Render the list of options */}
                {options.map((option, index) => (
                  <MenuItem key={index} value={index}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Create Question
          </Button>
        </form>
      </Box>
    </Container>
    </div>
  );
};

export default Question;

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Box,
} from "@mui/material";
import "../App.css";

const Question = () => {
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const { userInfo } = useSelector((state) => state.auth)
  console.log('userInfo',userInfo._id)
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const questionData = {
      activityId: "648c028e02c7e993d609a471",
      teacherId:userInfo._id,
      type: type,
      content: content,
      options: options,
      correctOption: correctOption,
    };
    console.log(questionData)
    try {
      const response = await axios.post(
        `http://localhost:5000/api/questions`,
        questionData
       
      ); console.log(questionData)
      console.log("Question created:", response.data);
      // Reset form fields
      setType("");
      setContent("");
      setOptions([]);
      setCorrectOption("");
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const handleOption = () => {
    if (options !== "") {
      setOptions([...options, options]);
      console.log(options);
    }
  };
  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let sendData={ 
          activityId:'648c028e02c7e993d609a47'
        }
        const response = await axios.post(`http://localhost:5000/api/questions/activity`,sendData);
        console.log(response)
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
  };


  return (
   
      <Container
        maxWidth="30%"
        sx={{
          // border: "1px solid #ccc",
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
                <InputLabel id="activityId-label">Type</InputLabel>
                <Select
                  labelId="activityId-label"
                  id="activityId"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  required
                >
                  {/* Render the list of activities */}
                  <MenuItem value="True or false">True or false</MenuItem>
                  <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
                  {/* Add more MenuItem components for each activity */}
                </Select>
              </FormControl>
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
                rows={1}
                fullWidth
                value={options.join("\n")}
                onChange={(event) =>
                  setOptions(event.target.value.split("\n"))
                }
                required
              />
              <Button onClick={handleOption}>Add option</Button>
            </Box>

            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel id="correctOption-label">
                  Correct Option
                </InputLabel>
                <Select
                  labelId="correctOption-label"
                  id="correctOption"
                  value={correctOption}
                  onChange={(event) =>
                    setCorrectOption(event.target.value)
                  }
                >
                  {/* Render the list of options */}
                  {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
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
        <Box>
        <select value={selectedQuestion} onChange={handleQuestionChange}>
        <option value="">Select a question</option>
        {questions.map((question) => (
          <option key={question.id} value={question.id}>
            {question.text}
          </option>
        ))}
      </select>
        </Box>
      </Container>
      
 
  );
};

export default Question;

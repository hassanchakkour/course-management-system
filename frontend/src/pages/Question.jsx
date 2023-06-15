import React, { useState } from "react";
import axios from "axios";
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
  const [options, setOptions] = useState();
  const [correctOption, setCorrectOption] = useState("");
  const [optionsData, setOptionsData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const questionData = {
      activityId: "6482f11016516151a65b1c9d",
      type: type,
      content: content,
      options: optionsData,
    };
    console.log(questionData);

    await axios
      .post("http://localhost:5000/api/questions", questionData)
      .then((response) => {
        console.log("Question created:", response.data);
        // Reset form fields
        setType("");
        setContent("");
        setOptions([]);
        setCorrectOption("");
      })
      .catch((error) => {
        console.error("Error creating question:", error);
      });
  };
  const handleOption = () => {
    if (options != "") {
      setOptionsData([...optionsData, options]);

      console.log(optionsData);
    }
  };

  return (
    <div className="QuizForm">
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
                <InputLabel id="activityId-label">Type</InputLabel>
                <Select
                  labelId="activityId-label"
                  id="activityId"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  required
                >
                  {/* Render the list of activities */}
                  <MenuItem value="activity1">True or false</MenuItem>
                  <MenuItem value="activity2">Multiple Choice</MenuItem>
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
                // value={options.join('\n')}
                onChange={(event) => setOptions(event.target.value)}
                required
              />
              <Button onClick={handleOption}>Add option</Button>
            </Box>

            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel id="correctOption-label">Correct Option</InputLabel>
                <Select
                  labelId="correctOption-label"
                  id="correctOption"
                  value={correctOption}
                  onChange={(event) => setCorrectOption(event.target.value)}
                >
                  {/* Render the list of options */}
                  {options &&
                    optionsData.map((option, index) => (
                      <MenuItem key={index}>{option}</MenuItem>
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

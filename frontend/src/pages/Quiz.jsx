import React, { useState ,   useEffect } from 'react';
import { TextField, Button, Container,Modal, Box,MenuItem, Select,Radio,FormGroup, FormControlLabel,Switch,InputLabel, RadioGroup, FormControl, FormLabel } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import Questions from'./Question'
import axios from 'axios';
import '../App.css';

const Quiz = () => {
  const [title,setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [passingGrade, setPassinggrade] = useState();
  const [duration, setDuration] = useState();

  const [note,setNote]=useState('')
  const { userInfo } = useSelector((state) => state.auth)

  // const [open, setOpen] = useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   bgcolor: 'background.paper',
  //   boxShadow: 24,
  //   p: 4,
  // };

  // const ChildModal = () => (
  //   <Modal
  //     open={open}
  //     onClose={handleClose}
  //     aria-labelledby="child-modal-title"
  //     aria-describedby="child-modal-description"
  //   >
  //     <Box sx={{ ...style, width: 800 }}>
  //       <h1>Summary</h1>
  //      <Questions />
  //     </Box>
  //   </Modal>

  // )
  const handleSubmit = async (event) => {
    event.preventDefault();
    const sanitizedDescription = description || '';
  
    const quizdata = {
    
      submoduleId:"648314914e78666518b69c5d",
     // submitted:"648797b20da8cd5459f029ff",
      teacherId:userInfo._id,
      title:title,
      courseId:"648d8878a3be048f181521a5",
      description:sanitizedDescription,
      passingGrade:passingGrade,
      duration:duration,
      note:note,
      type:'Quiz',
     
  
    };
    console.log(quizdata)
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/activities`,
        quizdata
       
      ); console.log(quizdata)
      console.log("Quiz created:", response.data);
      // Reset form fields
      setTitle("");
      setDescription("");
      setPassinggrade("");
     
      setNote("");
    } catch (error) {
      console.error("Error creating Quiz:", error);
    }
  };
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");

  useEffect(() => {
    // Fetch quizzes from the API
    
     axios.post("http://localhost:5000/api/activities/course")
      .then(response => {
        setQuizzes(response.data);
        console.log(quizzes)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

   const loadedQuiz = async(load) => {
  let id = {_id:load};
    const response = await axios.post(`http://localhost:5000/api/activities/single`,id)

    console.log(response.data)

    setPassinggrade(response.data.passingGrade)
    setTitle(response.data.title)
    setDescription(response.data.description)
    setDuration(response.data.duration)
    setNote(response.data.note)

    // const updatedRes = {
    //   ...response.data,
    //   passingGrade: passingGrade,
    //   title: title,
    //   description: description,
    //   duration: duration,
    //   note: note,
    //   submoduleId:"648314914e78666518b69c5d",
      
      
    //    courseId:response.data.courseId,
    // };
  
    // try {
    //   await axios.post(`http://localhost:5000/api/activities/single/${load}`, updatedRes);
    //   console.log(updatedRes);
    //   console.log(created)
    // } catch (error) {
    //   console.error(error);
    // }

  }


 
  const handleQuizChange = async(event) => {
    setSelectedQuiz(event.target.value);
    if (quizzes) {
      await loadedQuiz(event.target.value);
    }
    console.log(typeof(event.target.value))
   
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
   
      <Container
        maxWidth="20%"
        sx={{
          // border: "1px solid #ccc",
          borderRadius: "10px",
          // padding: "px",
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
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              margin="normal"
              sx={{
                marginBottom: "16px", // Add margin at the bottom
                borderRadius: "10px", // Set border radius
                // Add any additional styling properties as needed
              }}
            />

             <FormControl fullWidth sx={{ marginTop: '16px' }}>
              <FormLabel>Quiz Description</FormLabel>
              <ReactQuill
                   value={description}
                   onChange={(value) => setDescription(value)}
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
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    />
  )}
/>
              
              <FormLabel component="legend" sx={{ marginTop: '16px' }}>Instructions</FormLabel>
              <ReactQuill
                value={instructions}
                onChange={setInstructions}
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
              value={note}
              onChange={(event) => setNote(event.target.value)}
              margin="normal"
            />
             <TextField
              label="Passing Grade"
              variant="outlined"
              fullWidth
              value={passingGrade}
              onChange={(event) => setPassinggrade(event.target.value)}
              margin="normal"
            />
             {/* <TextField
              label="Number of Attempts"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
              margin="normal"
            /> */}
             <TextField
              label="Duration in Minutes"
              variant="outlined"
              type="number"
              fullWidth
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              margin="normal"
            />
           <FormLabel component="legend" sx={{ marginTop: '16px', margin_right:'10px',display: 'inline-block' }}>Load Quiz:
          
              <Select
               labelId="demo-simple-select-label"
                id="demo-simple-select"
                 className="mr-5 w-[40%] ml-5"
                 value={selectedQuiz || ""} 
               onChange={handleQuizChange}
                width="100%"
                 label="Quiz"
                   >
                 {quizzes && quizzes.map(quiz => (
                    <MenuItem key={quiz._id} value={quiz._id}>
                    {quiz.title}
                    </MenuItem>
                   ))}
                   
              </Select>
              
            


              <Button type="button" variant="contained" color="primary" className='right-0'>
                Create New Quiz
              </Button>
              {/* <ModalonClick={handleOpen} 
                        open={open}
                  onClose={handleClose}
            aria-labelledby="parent-modal-title"
             aria-describedby="parent-modal-description"
          >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <ChildModal />
        </Box>
      </Modal> */}
              
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
          {/* <Button variant="contained" color="secondary" sx={{ borderRadius: "20%", marginLeft: "10px" }}>
            Cancel
          </Button> */}
          </form>
        </Box>
      </Container>
    
  );
};

export default Quiz;

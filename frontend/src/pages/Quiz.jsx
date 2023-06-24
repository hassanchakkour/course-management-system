import React, { useState ,   useEffect } from 'react';
import { TextField, Button, Container,Modal, Box,MenuItem, Select,Radio,FormGroup, FormControlLabel,Switch,InputLabel, RadioGroup, FormControl, FormLabel } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { MdQuiz } from "react-icons/md";
import { useFormik } from 'formik';
import * as yup from 'yup';



import Questions from'./Question'
import axios from 'axios';


const Quiz = () => {
  const [title,setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [passingGrade, setPassinggrade] = useState();
  const [duration, setDuration] = useState();
  const [note,setNote]=useState('')
  const { userInfo } = useSelector((state) => state.auth)

  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");

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
      courseId:"648311874e78666518b69c3b",
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
      setDuration('')
      setInstructions('')
      setNote("");
    } catch (error) {
      console.error("Error creating Quiz:", error);
    }
  };


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
  // const handleTextChange = (value) => {
  //   if (value.replace(/(<([^>]+)>)/gi, '').trim().length <= 3000) {
  //     setInstructions(value);
  //   }
  // };

  // const remainingCharacters =  instructions.replace(/(<([^>]+)>)/gi, '').trim().length;
  // const rest=3000-remainingCharacters;

  // const handleTextChange1 = (value) => {
  //   if (value.replace(/(<([^>]+)>)/gi, '').trim().length <= 3000) {
  //     setDescription(value);
  //   }
  // };

  // const remainingCharacters1 =  description.replace(/(<([^>]+)>)/gi, '').trim().length;
  // const rest1=3000-remainingCharacters1;


 
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
        className="bg-gray-800"
        sx={{
          // border: "1px solid #ccc",
          // borderRadius: "10px",
          // padding: "px",
          maxHeight: "60vh", // Set the desired height for the scrollable area
          overflowY: "auto", // Enable vertical scrolling
          // color: 'gray',

        }}
       
      >
        <Box my={6}
          sx={{
            marginBottom: "20px", // Add margin at the bottom
            borderRadius: "40px", // Set border radius
            color: 'gray',

            // Add any additional styling properties as needed
          }}
        >
        <div style={{ display: 'flex' }}>
  <div style={{ width: '30%', marginRight: '10px',marginBottom:'30px', display: 'flex',  alignItems: 'flex-start'  }}>
    <MdQuiz style={{ marginRight: '5px' }} />
    <h1 class="text-2xl text-white font-bold m-0">
  Quiz
</h1>
  </div>

</div>
               
        
    <form onSubmit={handleSubmit}>

    <Box marginBottom="20px" color="gray">
  <div style={{ display: 'flex',  alignItems: 'flex-start'  }}>
    <div style={{ width: '30%', marginRight: '10px' }}>
      <h5 style={{ color: 'white' }}>Quiz</h5>
    </div>
    <div style={{ width: '100%' }}>
      <input
      className={`w-full bg-gray-800 text-white border border-gray-500 rounded-lg px-3 py-2  'border-red-500' : ''}`}
        variant="outlined"
        fullWidth
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        margin="normal"
       required
       
      />
     
    </div>
  </div>
</Box>




<Box marginBottom="20px" color="gray">
<div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ width: '30%', marginRight: '10px' }}>
      <h5 style={{ color: 'white' }}>Description</h5>
    </div>
  <div style={{ width: '100%', borderRadius:'20px' }}>
   
    
        <input
            className={`w-full bg-gray-800 text-white border border-gray-500 rounded-lg px-3 py-2  'border-red-500' : ''}`}
             value={description}
              required
          multiline
          rows={6}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
        />
        
     {/* <p style={{ textAlign: 'right' }}>{remainingCharacters1}/{rest1}</p> */}
            </div>
                    </div>
              </Box>

              <Box marginBottom="20px" color="gray">
      <div style={{ display: 'flex', alignItems: 'flex-start'  }}>
        <div style={{ width: '30%', marginRight: '10px' }}>
          <h5 style={{ color: 'white' }}>Instructions</h5>
        </div>
        <div style={{ width: '100%' }}>
                 <ReactQuill
                 className={` bg-gray-800 text-white border border-gray-500  `}
                      value={instructions}
                      onChange={setInstructions}
                      required
                        modules={modules}
                        formats={formats}
                         render={({ editor }) => (
                                  <TextField
                                  
                               label="Instructions"
                                   multiline
                                    rows={6}
                                 variant="outlined"
                                 fullWidth
                                  onClick={editor.focus}
                                
                                    />
                                     )}
                                     />
                                      {/* <p style={{ textAlign: 'right' }}>{remainingCharacters}/{rest}</p> */}
                                    </div>
                                    </div>
                                    </Box>

                         <Box marginBottom="20px" color="gray">
                          <div style={{ display: 'flex',  alignItems: 'flex-start'  }}>
                           <div style={{ width: '30%', marginRight: '10px' }}>
                      <h5 style={{ color: 'white' }}>Note</h5>
    </div>
  <div style={{ width: '100%' }}>
    <input
    className={`w-full bg-gray-800 text-white border border-gray-500 rounded-lg px-3 py-2  'border-red-500' : ''}`}
      variant="outlined"
      required
      fullWidth
      value={note}
      onChange={(event) => setNote(event.target.value)}
      margin="normal"
      
     
    />
  </div>
</div>
</Box>

<Box marginBottom="20px" color="gray">
<div style={{ display: 'flex', alignItems: 'flex-start'  }}>
    <div style={{ width: '30%', marginRight: '10px' }}>
      <h5 style={{ color: 'white' }}>Passing Grade</h5>
    </div>
  <div style={{ width: '100%',color: 'whitesmoke' }}>
    <input
    className={`w-full bg-gray-800 text-white border border-gray-500 rounded-lg px-3 py-2  'border-red-500' : ''}`}
      variant="outlined"
     required
      fullWidth
      value={passingGrade}
      onChange={(event) => setPassinggrade(event.target.value)}
      margin="normal"
      
   
    />
  </div>
</div>
</Box>
             {/* <TextField
              label="Number of Attempts"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
              margin="normal"
            /> */}
                <Box marginBottom="20px" color="gray">
                <div style={{ display: 'flex', alignItems: 'flex-start'  }}>
                    <div style={{ width: '30%', marginRight: '10px' }}>
                          <h5 style={{ color: 'white' }}>Duration</h5>
                             </div>
                 <div style={{ width: '100%' }}>
                  <input
                  className={`w-full bg-gray-800 border border-gray-500  text-white rounded-lg px-3 py-2 'border-red-500' : ''}`}
                  variant="outlined"
                    type="number"
                    required
                    fullWidth
                   value={duration}
                     onChange={(event) => setDuration(event.target.value)}
                    margin="normal"
                        
                            />
                            </div>
                            </div>
                            </Box>
                            <Box  marginBottom="20px" >
                         <div style={{ display: 'flex',  alignItems: 'flex-start'  }}>
                         <div style={{ width: '30%', marginRight: '10px' }}>
                           <h5 style={{ color: 'white' }}>Load Quiz</h5>
                             </div>
                                 <Select
                           className="mr-5 w-[75%]  bg-gray-800 border border-gray-800 rounded-lg ml-1"
     
                           value={selectedQuiz || ""}
                           onChange={handleQuizChange}
                                    sx={{
                             marginBottom: "10px",
        borderRadius: "10px",
        boxShadow: "1px 4px 4px rgba(0, 0, 0, 0.2)",
        height: "40px",
        border: "1px solid white",
      }}
    >
       {quizzes && quizzes.map(quiz => (
      <MenuItem key={quiz._id} value={quiz._id}>
        {quiz.title}
      </MenuItem>
    ))}
    </Select>
    
    <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
      Create
    </button>
  </div>
</Box>


             
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
              
             
         
                <FormGroup component="legend" sx={{ marginTop: '16px' }}>
             <FormControlLabel control={<Switch defaultChecked />} label="Shuffle Questions" />
             <FormControlLabel control={<Switch />} label="Enable Review Mode" />
             <FormControlLabel  control={<Switch />} label="Start Exam in Safe Browser" />
              </FormGroup>
           

           
 
           
             
              <div className="flex justify-center mt-10">
                  <button type='submit'
                  className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
                   Submit </button>
                      </div>
          {/* <Button variant="contained" color="secondary" sx={{ borderRadius: "20%", marginLeft: "10px" }}>
            Cancel
          </Button> */}
          </form>
        </Box>
      </Container>
    
  );
};

export default Quiz;

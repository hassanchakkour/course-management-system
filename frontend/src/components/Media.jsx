import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextField, Button, Container, Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import { MdOutlinePermMedia } from "react-icons/md";
import { ErrorMessage } from 'formik';


const Media = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    file: Yup.mixed().required("File is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      file: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const { title, description, file } = values;
      const formData = {
      title:title,
      description:description,
      mediaUrl:file,
      type:'Media',
      submoduleId:"648314914e78666518b69c5d",
      
       teacherId:userInfo._id,
     
       courseId:"648d8878a3be048f181521a5",
  }
  console.log(formData)
      try {
        const response = await axios.post(
          "http://localhost:5000/api/activities",formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log("Resource created:", response.data);

        formik.resetForm();
      } catch (error) {
        // console.error("Error creating resource:", error);
        console.log('Error', error.message);
      }
    },
  });

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
  
  const remainingCharacters = formik.values.description.replace(/(<([^>]+)>)/gi, '').trim().length;
  const rest = 3000 - remainingCharacters;


  return (
   
      <Container
        maxWidth="50%"
        sx={{
          // maxHeight: "60vh",
          // overflowY: "auto",
          backgroundColor:'rgb:(64, 64, 64)',
          color: 'gray',
        }}
      >
        <form onSubmit={formik.handleSubmit}>
        <Box marginBottom="20px" color="gray">
        <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
  <MdOutlinePermMedia style={{ marginRight: '5px' }} />
  <h4 style={{ color: 'whitesmoke', margin: 0 }}>
    Media
  </h4>
</div>
               </div>
                   </Box>

           <Box marginBottom="20px">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '30%', marginRight: '10px' }}>
                 <h5 style={{ color: 'gray' }}>Title</h5>
                     </div>
              <div style={{ width: '100%' }}>
              <TextField
              variant="outlined"
                 id="outlined-error"
                 fullWidth
                name="title"
   
                value={formik.values.title}
                onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                error={formik.touched.title && formik.errors.title}
                helperText={formik.touched.title && formik.errors.title}
                sx={{
                marginBottom: '10px',
                borderRadius: '20px',
                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                 borderColor: 'gray',
                 color: 'whitesmoke',
                 width: '100%',
                    }}
      
                 InputProps={{
                 style: { color: 'whitesmoke'},
                  classes: {
                  root: 'white-border',
                 focused: 'white-border-focused',
                    notchedOutline: 'white-border',
                  },
                    }}
                   />
    
                  </div>
                  </div>
                 </Box>

<Box marginBottom="20px">
<div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '30%', marginRight: '10px' }}>
                 <h5 style={{ color: 'gray' }}>Description</h5>
                     </div>
              <div style={{ width: '100%' }}>
              <ReactQuill
                label="Media Description"
                value={formik.values.description}
               
                onChange={(value) => formik.setFieldValue('description', value)}
                modules={modules}
                formats={formats}
                sx={{
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  color: 'whitesmoke',
                  width: '100%',
                  height:'50%',
                }}
                render={() => (
                  <TextField
                  label="Media"
                  multiline
                  id="outlined-error"
                  rows={6}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: '16px', maxHeight: '600px', overflowY: 'auto', color: 'whitesmoke' }}
                />
                )}
              />
               {/* <ErrorMessage name="description" component="div" style={{ color: 'red' }} /> */}
              <p style={{ textAlign: 'right' }}>
               {remainingCharacters}/{rest}
              </p>
    </div>
  </div>
</Box>

         
          <Box marginBottom="16px">
          <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '30%', marginRight: '10px' }}>
                 <h5 style={{ color: 'gray' }}>Quiz Name</h5>
                     </div>
              <div style={{ width: '100%' }}>
            <input
              id="outlined-error"
              type="file"
              label="Upload Media"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
              name="file"
              accept="image/*,video/*,audio/*"
              
            />
            {formik.touched.file && formik.errors.file && (
              <div>{formik.errors.file}</div>
            )}
            </div>
            </div>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" type="submit" sx={{borderRadius: "20%"}}>
            Submit
          </Button>
          </div>
        </form>
      </Container>
  
  );
};

export default Media;

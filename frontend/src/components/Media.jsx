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
          backgroundColor: '#1F2937',
          color: 'gray',
        }}
      >
        <form onSubmit={formik.handleSubmit}>
        <Box marginBottom="30px" color="gray">
        <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
  <MdOutlinePermMedia style={{ marginRight: '5px' }} />
  <h1 class="text-1xl text-white font-bold m-0">
  Media
</h1>
</div>
               </div>
                   </Box>

           <Box marginBottom="20px">
           <div className="flex items-center">
  <div style={{ width: '30%', marginRight: '10px' }}>
    <h5 className="text-gray-500">Title</h5>
  </div>
  <div style={{ width: '100%' }}>
    <input
      className={`w-full bg-gray-800 text-white border border-gray-500 rounded-full px-3 py-2 ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''}`}
      variant="outlined"
      id="outlined-error"
      fullWidth
      name="title"
      value={formik.values.title}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.title && formik.errors.title && (
      <p className="text-red-500">{formik.errors.title}</p>
    )}
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
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
          modules={modules}
           formats={formats}
            className="block mb-1 text-white"
             style={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              color: 'whitesmoke',
             width: '51w0%',
               height: '50%',
  }}
  render={() => (
    <textarea
    value={formik.values.description}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
      className="block mb-1 text-white bg-black rounded-md border-gray-300 px-3 py-2 resize-none"
      label="Media"
      rows={6}
      variant="outlined"
      fullWidth
      style={{ marginBottom: '16px', maxHeight: '600px', overflowY: 'auto', color: 'whitesmoke' }}
    />
  )}
  
/>

{/* <ErrorMessage name="description" component="div" style={{ color: 'red' }} /> */}
<p className="text-right">
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
               className=" text-white py-2 px-4 rounded-full hover:bg-blue-600"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
              name="file"
              accept="image/*,video/*,audio/*"
             
              placeholder="Upload Media"
              
            />
          {formik.touched.file && formik.errors.file && (
      <p className="text-red-500">{formik.errors.file}</p>
            )}
            </div>
            </div>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="submit"  
                 variant="contained" 
                 className="bg-blue-500 text-white py-2 px-4 rounded-full">
              Submit
                 </button>
               </div>
        </form>
      </Container>
  
  );
};

export default Media;

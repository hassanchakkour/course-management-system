// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';


// const Students = () => {
//   // State variables to store the fetched data
//   const [users, setUsers] = useState([]);
//   const [activities, setActivities] = useState([]);

//   // useEffect hook to fetch data when the component mounts
//   useEffect(() => {
//     const fetchUsers = async () => {
//       // Fetch users data from the API
//       try {
//         const response = await axios.get('http://localhost:5000/api/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error retrieving users:', error);
//       }
//     };

//     const fetchActivities = async () => {
//       // Fetch activities data from the API
//       try {
//         const response = await axios.get('http://localhost:5000/api/activities');
//         setActivities(response.data);
//       } catch (error) {
//         console.error('Error retrieving activities:', error);
//       }
//     };

//     // Call the fetch functions
//     fetchUsers();
//     fetchActivities();
//   }, []);

//   // Function to filter activities based on studentId
//   const getActivitiesByStudent = (studentId) => {
//     return activities.filter((activity) => activity.studentId === studentId);
//   };

//   // Generate columns for the data grid
//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Name', width: 150 },
//     // Dynamically generate columns for each activity
//     ...activities.map((activity) => ({
//       field: `activity_${activity.id}`,
//       headerName: `Activity ${activity.id} - ${activity.type}`,
//       width: 150,
//       valueGetter: (params) => {
//         const studentActivities = getActivitiesByStudent(params.row.id);
//         const targetActivity = studentActivities.find((a) => a.id === activity.id);
//         return targetActivity ? targetActivity.value : '';
//       },
//     })),
//   ];

//   // Generate rows for the data grid
//   const rows = users
//     .filter((user) => user.role === 'student') // Filter only students
//     .map((user) => ({
//       id: user.id,
//       name: user.firstName,
//       // Generate activity columns dynamically
//       ...getActivitiesByStudent(user.id).reduce((acc, activity) => {
//         acc[`activity_${activity.id}`] = activity.value;
//         return acc;
//       }, {}),
//     }));

//   // Render the data grid component
//   return (
//     <div margin_right="20px">
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid rows={rows} columns={columns} pageSize={5} />
//       </div>
//     </div>
//   );
// };

// export default Students;
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http/localhost:5000/api/activities/student/:studentId'); // Replace with your API endpoint
        const data = response.data.map((student) => ({ ...student, id: student._id })); // Assign _id as id property
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'passingGrade', headerName: 'Passing Grade', width: 150 },
    { field: 'submoduleId', headerName: 'Submodule ID', width: 200 },
    { field: 'startDate', headerName: 'Start Date', width: 200 },
    { field: 'endDate', headerName: 'End Date', width: 200 },
    { field: 'duration', headerName: 'Duration', width: 150 },
    { field: 'mediaUrl', headerName: 'Media URL', width: 200 },
    { field: 'submitted', headerName: 'Submitted', width: 200 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
    { field: '__v', headerName: '__v', width: 100 },
    { field: 'courseId', headerName: 'Course ID', width: 200 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={students} columns={columns} pageSize={5} getRowId={(row) => row.id} />
    </div>
  );
};

export default Students;

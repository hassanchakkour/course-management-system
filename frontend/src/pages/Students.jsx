import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import '../App.css'


const Students = () => {
  // State variables to store the fetched data
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  // const {courseID } = useStateContext()
  // const course_id = localStorage.getItem('course_id',courseID)
  

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      // Fetch users data from the API
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error retrieving users:', error);
      }
    };

    const fetchActivities = async () => {
      // Fetch activities data from the API
      try {
        let sendData={ 
          courseId:'648d8878a3be048f181521a5'
        }
        const response = await axios.post('http://localhost:5000/api/activities/course',sendData);
        setActivities(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error retrieving activities:', error);
      }
    };

   // Call the fetch functions
    fetchUsers();
    fetchActivities();
  }, []);

  // Function to filter activities based on studentId
  const getActivitiesByStudent = (studentId) => {
    return activities.filter((activity) => activity.studentId === studentId);
  };

  // Generate columns for the data grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    // Dynamically generate columns for each activity
    ...activities.map((activity) => ({
      field: `activity_${activity._id}`,
      headerName: ` ${activity.title}`,
      width: 150,
      valueGetter: (params) => {
        const studentActivities = getActivitiesByStudent(params.row.id);
        const targetActivity = studentActivities.find((a) => a.id === activity.id);
        return targetActivity ? targetActivity.value : '';
      },
    })),
  ];

  // Generate rows for the data grid
  const rows = users
    .filter((user) => user.role === 'student') // Filter only students
    .map((user) => ({
      id: user.id,
      name: user.firstName,
      // Generate activity columns dynamically
      ...getActivitiesByStudent(user.id).reduce((acc, activity) => {
        acc[`activity_${activity.id}`] = activity.value;
        return acc;
      }, {}),
    }));

  // Render the data grid component
  return (
    <div className='QuizForm'>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default Students;

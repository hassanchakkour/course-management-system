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
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 , headerClassName: 'custom-header',},
    ...activities.map((activity) => ({
      field: `activity_${activity._id}`,
      headerName: `${activity.title}`,
      width: 200,
      headerClassName: 'custom-header',
      valueGetter: (params) => {
        const studentActivities = getActivitiesByStudent(params.row.id);
        const targetActivity = studentActivities.find((a) => a.title === activity.title);
        return targetActivity ? targetActivity.grade : activity.passingGrade;
      },
      
    })),
    {
    
      headerName: 'Total',
      width: 100,
      headerClassName: 'custom-header',
      valueGetter: (params) => {
        const studentActivities = getActivitiesByStudent(params.row.id);
        const total = studentActivities.reduce((sum, activity) => sum + activity.passingGrade, 0);
        return total;
      },
    },
    
  ];

  const rows = users
    .filter((user) => user.role === 'student')
    .map((user) => {
      const studentActivities = getActivitiesByStudent(user._id);
      const row = {
        id: user._id,
        name: user.firstName + ' ' + user.lastName,
      };
      studentActivities.forEach((activity) => {
        row[`activity_${activity._id}`] = activity.passingGrade;
      });
      return row;
    });

  // Render the data grid component
  return (
    <div className='QuizForm'>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} className="custom-data-grid" />
    </div>
  </div>
  );
};

export default Students;

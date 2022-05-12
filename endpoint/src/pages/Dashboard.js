import React from "react";
import classes from './StudentDashboard.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HistoryIcon from '@mui/icons-material/History';
import Profile from '../pages/Student/profile';
import Edit from '../pages/Student/edit';
import Tutors from '../pages/Student/tutors';
import NavBar from '../components/topBar/navBar';
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";


export default function Dashboard({ name, language, setLanguage }) {

  const [pageSelected, setPageSelected] = React.useState("Profile");

  return (
    <div className={classes.main}>
      <NavBar language={language} setLanguage={setLanguage} />
            
      { (name === 'Student') && <StudentDashboard language={language} /> }
      {/* { (name === 'Tutor') && <TutorDashboard /> } */}
      { (name === 'Admin') && <AdminDashboard language={language} /> }
    </div>


  );
}


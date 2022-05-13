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



export default function StudentDashboard({ language }) {

  const [pageSelected, setPageSelected] = React.useState("Profile");

  return (
    <div style={{ height: '100%' }}>

      <h3 className={classes.header}>{language.StudentDashboard}</h3>

      <Paper className={classes.container + " " + classes.sidebar} elevation={0} >
        <Button className={classes.btn + " " + classes.sidebarBtn +
          " " + ((pageSelected === 'Profile') ? classes.active : "")}
          onClick={() => setPageSelected("Profile")}
          variant="text" startIcon={<VisibilityIcon />}>
          <span className={classes.hideText}>View Profile</span></Button>

        <Divider light />
        <Button className={classes.btn + " " + classes.sidebarBtn +
          " " + ((pageSelected === 'Edit') ? classes.active : "")}
          onClick={() => setPageSelected("Edit")}
          variant="text" startIcon={<EditIcon />} >
          <span className={classes.hideText}>Edit Profile</span></Button>

        <Divider light />
        <Button className={classes.btn + " " + classes.sidebarBtn +
          " " + ((pageSelected === 'Tutors') ? classes.active : "")}
          onClick={() => setPageSelected("Tutors")}
          variant="text" startIcon={<SummarizeIcon />} >
          <span className={classes.hideText}>Favorite Tutors List</span></Button>

        <Divider light />
        <Button className={classes.btn + " " + classes.sidebarBtn +
          " " + ((pageSelected === 'History') ? classes.active : "")}
          onClick={() => setPageSelected("History")}
          variant="text" startIcon={<HistoryIcon />} >
          <span className={classes.hideText}>Previous Request History</span> </Button>


      </Paper>

      <Paper elevation={0} className={classes.container + " " + classes.content}>
        <div style={{ padding: 10, height: '100%', width: '100%' }}>
          <div style={{ border: '1px solid lightgray', padding: 40, height: '100%', width: '100%', borderRadius: 10, overflowY: 'auto' }}>
            {(pageSelected === "Profile") && <Profile
              name="Student name"
              country="Saudi Arabia"
              stars="3"
              joinedDate="20 May 2022" />}
            {(pageSelected === "Edit") && <Edit />}
            {(pageSelected === "Tutors") && <Tutors />}

          </div>
        </div>

      </Paper>
    </div>
  );
}


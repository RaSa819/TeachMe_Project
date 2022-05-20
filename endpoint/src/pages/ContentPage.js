import React from "react";
import classes from './StudentDashboard.module.css';
import NavBar from '../components/topBar/navBar';
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";
import TutorDashboard from "./User/TutorDashboardUpdated";
import { LanguageContext } from '../App';
import Login from "./Login"
import Signup from "./SingupWithValidation";
import Card from "../components/TutorList";
import HomePage from "./home/homePage";
import ViewTutor from "./view/Tutor";
import Session from "./Session/Session";


export default function ContentPage({ name, setLanguage }) {

  const [pageSelected, setPageSelected] = React.useState("Profile");
  const language = React.useContext(LanguageContext);

  return (
    <div className={classes.main}>
      <NavBar setLanguage={setLanguage} pageName={name} />

      {(name === 'Student') && <StudentDashboard />}
      {(name === 'Tutor') && <TutorDashboard />}
      {(name === 'Admin') && <AdminDashboard />}
      {(name === 'Login') && <Login />}
      {(name === 'Signup') && <Signup />}
      {(name === 'TutorList') && <Card />}
      {(name === 'HomePage') &&<HomePage />}
      {(name ==='ViewTutor')&&<ViewTutor/>}
      {(name ==='Session')&&<Session/>}

    </div>


  );
}


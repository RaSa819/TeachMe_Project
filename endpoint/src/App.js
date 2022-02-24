import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";


import Card from "./components/Card";
import Index from './pages/Admin/Index'
import Signup from './pages/Signup'
import Login from "./pages/Login";
import Users from "./pages/Users";
import Depts from "./pages/Depts";
import RequestInfo from "./components/RequestInfo";
import Filter from "./pages/Filter";
import axios from "axios";

// Student Side
import StudentHome from "./pages/User/StudentHome";
import StudentFavoriteList from "./pages/User/StudentFavoriteList";
import StudentHistory from "./pages/User/StudentHistory";
import StudentEditProfile from './pages/User/StudentEditProfile'

export default function App() {


  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/tutors" element={<Card />} />
          <Route path="/req" element={<RequestInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Index />} />
          <Route path="/users" element={<Users />} />
          <Route path="/depts" element={<Depts />} />
          <Route path="/fetchTutors" element={<Filter />} />
          <Route path="/student"  element={<StudentHome/>}/>
          <Route path="/student/StudentEditProfile"  element={<StudentEditProfile/>}/>
          <Route path="/student/StudentFavoriteList"  element={<StudentFavoriteList/>}/>
          <Route path="/student/StudentHistory"  element={<StudentHistory/>}/>
        </Routes>
      </Router>
    </div>
  )
}



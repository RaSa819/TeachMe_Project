import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";


import { SocketProvider } from "./Socket";

import Card from "./components/Card";
import Signup from './pages/Signup'
import Login from "./pages/Login";
import Users from "./pages/Users";
import Depts from "./pages/Depts";
import RequestInfo from "./components/RequestInfo";
import Filter from "./pages/Filter";
import axios from "axios";

import { DialogProvider } from 'react-mui-dialog'
// Student Side
import StudentHome from "./pages/User/StudentHome";
import StudentFavoriteList from "./pages/User/StudentFavoriteList";
import StudentHistory from "./pages/User/StudentHistory";
import StudentEditProfile from './pages/User/StudentEditProfile'
import StudentSetting from "./pages/User/StudentSetting";
// Admin side
import AdminHome from "./pages/Admin/AdminHome";
import AllUser from "./pages/Admin/AllUser";
import AdminActivity from "./pages/Admin/AdminActivity";
import AdminSupport from "./pages/Admin/AdminSupport";
// the real time 

export default function App() {
  return (
   
      <DialogProvider>
        <div className="container-fluid">
          <Router>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/tutors" element={<Card />} />
              <Route path="/req" element={<RequestInfo />} />
              <Route path="/login" element={<Login />} />

              <Route path="Admin/AdminHome" element={<AdminHome />} />
              <Route path="Admin/AllUsers" element={<AllUser />} />
              <Route path="Admin/AdminActivity" element={<AdminActivity />} />
              <Route path="/Admin/AdminSupport" element={<AdminSupport/>}/>


              <Route path="/fetchTutors" element={<Filter />} />
              <Route path="/student" element={<StudentHome />} />
              <Route path="/student/StudentEditProfile" element={<StudentEditProfile />} />
              <Route path="/student/StudentFavoriteList" element={<StudentFavoriteList />} />
              <Route path="/student/StudentHistory" element={<StudentHistory />} />
              <Route path="/student/StudentSetting" element={<StudentSetting />} />


              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here to display!</p>
                  </main>
                }
              />
            </Routes>
          </Router>
        </div>
      </DialogProvider>
    
  )
}



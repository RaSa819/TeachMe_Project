import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
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
import Drawer1 from './pages/User/Layout/Drawer'
import StudentHome from "./pages/User/StudentHome";
import StudentFavoriteList from "./pages/User/StudentFavoriteList";
import StudentHistory from "./pages/User/StudentHistory";
import StudentEditProfile from './pages/User/StudentEditProfile'
import StudentSetting from "./pages/User/StudentSetting";

// Admin side
import Drawer from './pages/Admin/Layout/Drawer'
import AdminHome from "./pages/Admin/AdminHome";
import AllUser from "./pages/Admin/AllUser";
import AdminActivity from "./pages/Admin/AdminActivity";
import AdminSupport from "./pages/Admin/AdminSupport";// the real time 

export default function App() {

  // const isAuth = localStorage.getItem('token')
  const isAuth = 1
  const type = localStorage.getItem('type')
  const clearLocalStorage = () => {
    localStorage.removeItem('token');
  }


  //alert(localStorage.getItem('token'))
  return (

    <SocketProvider>
      <DialogProvider>
        <div className="container-fluid">
          <Router>
            <Routes>
              <Route path="/" element={

                <Navigate to="/Login" />
              } />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />


              <Route path="Admin" element={
                isAuth ?
                  <><Outlet /></> :
                  <Navigate to="/Login" />
              }>

                <Route path="Home" element={<AdminHome />} />
                <Route path="AllUsers" element={<AllUser />} />
                <Route path="Activity" element={<AdminActivity />} />
                <Route path="Support" element={<AdminSupport />} />

              </Route>

              <Route path="student" element={
                isAuth ?
                  <><Outlet /></> :
                  <Navigate to="/Login" />
              }>
                <Route path="Profile" element={<StudentHome />} />
                <Route path="EditProfile" element={<StudentEditProfile />} />
                <Route path="FavoriteList" element={<StudentFavoriteList />} />
                <Route path="History" element={<StudentHistory />} />
                <Route path="Setting" element={<StudentSetting />} />
              </Route>


              <Route path="global" element={
                isAuth ?
                  <><Outlet /></> :
                  <Navigate to="/Login" />
              }>
                <Route path="tutors" element={
                  <Card/>
                }/>

              </Route>

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

          {/* <Router>
            <Routes>
              <Route path="/" element={<Signup />} />
              

              
            </Routes>
          </Router> */}
        </div>
      </DialogProvider>
    </SocketProvider >
  )
}



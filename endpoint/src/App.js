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




import UserProfile from './pages/User/UserProfile'
import UserEditProfile from './pages/User/UserEditProfile'
import UserHistory from './pages/User/UserHistory'
import UserSettings from './pages/User/UserSettings'
import StudentFavoriteList from "./pages/User/StudentFavoriteList";



// Admin side
import Drawer from './pages/Admin/Layout/Drawer'
import AdminHome from "./pages/Admin/AdminHome";
import AllUser from "./pages/Admin/AllUser";
import AdminActivity from "./pages/Admin/AdminActivity";
import AdminSupport from "./pages/Admin/AdminSupport";// the real time 


import TutorProvider from "./components/Data/TutorProvider";
import SingupWithValidation from './components/SingupWithValidation'


//Tutor side
import TutorDashboard from './pages/Tutor/tutorDashboard';
<<<<<<< HEAD
import IsStudent from "./auth/IsStudent";
import IsAuth from "./auth/IsAuth";
=======

import HomePage from './pages/homePage/homePage.js';

>>>>>>> 68b8657be3689fe12b016dc1213880410ccd014d
export default function App() {

  // const isAuth = localStorage.getItem('token')

  //localStorage.removeItem('token')
  //localStorage.removeItem('type')

  //alert(localStorage.getItem('token'))
  return (

    <SocketProvider>
      <DialogProvider>
        <TutorProvider>
          <div className="container-fluid">
            <Router>
              <Routes>


                <Route path="/" element={
                  <Navigate to="/Login" />
                } />

                <Route path="/Login" element={<Login />} />

                <Route path="/Signup" element={<SingupWithValidation />} />

                <Route path="Admin" element={
                  <><Outlet /></>
                }>
                  <Route path="Home" element={<AdminHome />} />
                  <Route path="AllUsers" element={<AllUser />} />
                  <Route path="Activity" element={<AdminActivity />} />
                  <Route path="Support" element={<AdminSupport />} />
                </Route>


                <Route path="user" element={
                  <><Outlet /></>
                }>
                  <Route path="Profile" element={
                    <IsAuth>
                      <UserProfile />
                    </IsAuth>
                  } />
                  <Route path="EditProfile" element={
                    <IsAuth>
                      <UserEditProfile />
                    </IsAuth>
                  } />

                  <Route path="History" element={
                    <IsAuth>
                      <UserHistory />
                    </IsAuth>
                  } />

                  <Route path="Setting" element={
                    <IsAuth>
                      <UserSettings />
                    </IsAuth>
                  } />
                </Route>

                <Route path="student" element={
                  <><Outlet /></>
                }>
                  <Route path="FavoriteList" element={
                    <IsStudent>
                      <StudentFavoriteList />
                    </IsStudent>
                  } />
                </Route>

                <Route path="testAuth"
                  element={
                    <IsStudent>
                      <p>
                        hello mohammed gamal al-homaidi
                      </p>
                    </IsStudent>
                  }
                />

                <Route path="global" element={

                  <><Outlet /></>
                }>
                  <Route path="tutors" element={
                    <Card />
                  } />

                </Route>

                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here to display!</p>
                    </main>
                  }
                />
                <Route
                  path="testDash" element={
                    <TutorDashboard />
                  }
                />

<<<<<<< HEAD


=======
<Route
                  path="/home" element={
                    <HomePage />
                  }

                />
                {/* <Route path='/tutor/dashboard' element={<tutorDashboard/>}></Route> */}
>>>>>>> 68b8657be3689fe12b016dc1213880410ccd014d
              </Routes>
            </Router>



            {/* <Router>
            <Routes>
              <Route path="/" element={<Signup />} />
              

              
            </Routes>
          </Router> */}
          </div>
        </TutorProvider>
      </DialogProvider>
    </SocketProvider >
  )
}



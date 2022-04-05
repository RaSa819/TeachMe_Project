import React, {Fragment} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";


import {SocketProvider} from "./Socket";

import Card from "./components/Card";

import Login from "./pages/Login";
import Users from "./pages/Users";
import Depts from "./pages/Depts";
import RequestInfo from "./components/RequestInfo";

import axios from "axios";

import {DialogProvider} from 'react-mui-dialog'


import UserProfile from './pages/User/UserProfile'
import UserEditProfile from './pages/User/UserEditProfile'
import UserHistory from './pages/User/UserHistory'
import UserSettings from './pages/User/UserSettings'
import StudentFavoriteList from "./pages/User/StudentFavoriteList";
import PrepareRequest from "./pages/User/PrepareRequest";


// Admin side
import Drawer from './pages/Admin/Layout/Drawer'
import AdminHome from "./pages/Admin/AdminHome";
import AllUser from "./pages/Admin/AllUser";
import AdminActivity from "./pages/Admin/AdminActivity";
import AdminSupport from "./pages/Admin/AdminSupport"; // the real time


import TutorProvider from "./components/Data/TutorProvider";
import SingupWithValidation from './components/SingupWithValidation'


// Tutor side
import TutorDashboard from './pages/Tutor/tutorDashboard';
import IsStudent from "./auth/IsStudent";
import IsAuth from "./auth/IsAuth";
import Redirect from "./auth/Redirect";
import NotFound from "./auth/NotFound";
import PendingRequest from './pages/User/PendingRequest'


import IsTutor from "./auth/IsTutor";
// import HomePage from "./pages/home/homePage.js";

import Session from './pages/Session'

export default function App() {

    console.log(localStorage.getItem('token'))
    React.useEffect(() => {
        let token = localStorage.getItem('token')
        if (token != null) {
            axios.get(`http://localhost:4000/IsExisted/${token}`).then((response) => {
                if (response.data.res != true) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('type')
                }

            }).catch((error) => {
                alert(JSON.stringify(error, null, 2))
            })
        }
    }, [])


    return (


        <DialogProvider>
            <TutorProvider>
                <div className="container-fluid"
                    style={
                        {height: '100%'}
                }>
                    <Router>
                        <SocketProvider>
                            <Routes> {/* <Route path="/"
                                    element={<HomePage/>}/> */}

                                <Route path="/Login"
                                    element={<Login/>}/>
                                <Route path="/Signup"
                                    element={<SingupWithValidation/>}/>


                                <Route path="Admin"
                                    element={
                                        <><Outlet/></>
                                }>
                                    <Route path="Home"
                                        element={<AdminHome/>}/>
                                    <Route path="AllUsers"
                                        element={<AllUser/>}/>
                                    <Route path="Activity"
                                        element={<AdminActivity/>}/>
                                    <Route path="Support"
                                        element={<AdminSupport/>}/>
                                </Route>


                                <Route path="user"
                                    element={
                                        <><Outlet/></>
                                }>
                                    <Route path="Profile"
                                        element={
                                            <IsAuth><UserProfile/></IsAuth>
                                        }/>
                                    <Route path="EditProfile"
                                        element={
                                            <IsAuth><UserEditProfile/></IsAuth>
                                        }/>

                                    <Route path="History"
                                        element={
                                            <IsAuth><UserHistory/></IsAuth>
                                        }/>

                                    <Route path="Setting"
                                        element={
                                            <IsAuth><UserSettings/></IsAuth>
                                        }/>

                                    <Route path="session"
                                        element={<Session/>}/>
                                </Route>

                                <Route path="tutor">
                                    <Route path="pendingRequest"
                                        element={
                                            <IsTutor><PendingRequest/></IsTutor>
                                        }/>
                                </Route>
                                <Route path="student"
                                    element={
                                        <><Outlet/></>
                                }>
                                    <Route path="FavoriteList"
                                        element={
                                            <IsStudent><StudentFavoriteList/></IsStudent>
                                        }/>
                                </Route>

                                <Route path="testAuth"
                                    element={
                                        <IsStudent><p>hello just test</p></IsStudent>
                                    }/>

                                <Route path="global"
                                    element={

                                        <><Outlet/></>
                                }>
                                    <Route path="tutors"
                                        element={
                                            <IsStudent><Card/></IsStudent>
                                        }/>

                                </Route>


                                <Route path="*"
                                    element={<NotFound/>}/>
                                <Route path="testDash"
                                    element={<TutorDashboard/>}/>

                                <Route path="home"
                                    element={
                                        <Redirect><PrepareRequest/></Redirect>

                                    }/>
                                <Route path="/homePage"
                                    element={<homePage/>}/>
                            </Routes>
                        </SocketProvider>
                    </Router>
                </div>
            </TutorProvider>
        </DialogProvider>

    )
}
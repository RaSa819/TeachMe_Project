import React, {Fragment, useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";

import { useNavigate } from "react-router-dom";
import {SocketProvider} from "./Socket";

import Card from "./components/Card";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Payment from './pages/Payment';
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

import HomePage from './pages/home/homePage'
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
import Session from "./pages/Session/Session"


// import HomePage from "./pages/home/homePage.js";



export default function App() {

    console.log(localStorage.getItem('token'))
    React.useEffect(() => {
        let token = localStorage.getItem('token')
        if (token != null) {
            axios.get(`http://localhost:4000/IsExisted/${token}`).then((response) => {
                if (response.data.res != true) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('type')
                    localStorage.removeItem('userDetail')
                }

            }).catch((error) => {
                alert(JSON.stringify(error, null, 2))
            })
        }
    }, [])

    
    //const[socket,setSocket] = useState(false)
    // React.useEffect(()=>{
    //     let token = localStorage.getItem('token');
    //     const client = io.connect('http://localhost:4000', {
    //         id:{id:window.localStorage.getItem("flag")=="1"?window.localStorage.getItem("tutorID"):window.localStorage.getItem("studentID")},
    //     query:{1: `token=${token}`,id:window.localStorage.getItem("type")=="1"?window.localStorage.getItem("tutorID"):window.localStorage.getItem("studentID")},
    //       'reconnect': false
    //     })

    //     setSocket(client)

    //     // socket.on('openSession',()=>{
    //     //     alert(data)
    //     // })

    //     client.on('welcome',()=>{
    //         alert('hello')
    //     })

    // },[])


    
    // let navigate = useNavigate();
    //socket.on('openSession', (data) => {
      //  alert('hello')
        // let type = localStorage.getItem('type')
        // if (type == 0) {
        //     localStorage.setItem('studentID', data.student);
        //     localStorage.setItem('tutorID', data.tutor);
        //     localStorage.setItem('sessionID', data.sessionID);
        //     localStorage.setItem('flag', '0');
        //     navigate('/user/session');
        // } else {
            
        //     setTimeout(() => {
        //         localStorage.setItem('studentID', data.student);
        //         localStorage.setItem('tutorID', data.tutor);
        //         localStorage.setItem('sessionID', data.sessionID);
        //         localStorage.setItem('flag', '0');
        //         navigate('/user/session');
        //     }, 3000)
        // }

   // })

    // socket.on('endSession', (data) => {
    //     localStorage.removeItem('studentID');
    //     localStorage.removeItem('tutorID');
    //     localStorage.removeItem('sessionID');
    // })



    return (


        <DialogProvider>
            <TutorProvider>
                <div className="container-fluid"
                    style={
                        {height: '100%',
                        margin:'0%' , 
                        padding:'0%'}
                }>
                    <Router>
                       <SocketProvider>
                            <Routes> <Route path="/"
                                    element={<HomePage />}/>

                                <Route path="/Login"
                                    element={<Login/>}/>


                                        <Route path="/StudentDashboard"
                                    element={ <StudentDashboard/>}/>


                                <Route path="/Signup"
                                    element={<SingupWithValidation/>}/>
                                <Route path="/Session"
                                        element={<Session/>}/>


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

                                    <Route path="Payment"
                                        element={
                                            <IsAuth><Payment /></IsAuth>
                                        }/>

                                    <Route path="session/:sessionID"
                                        element={
                                            <IsAuth><Session /></IsAuth>
                                        }/>
                                </Route>

                                <Route path="tutor">
                                    <Route path="pendingRequest"
                                        element={
                                            <IsTutor><PendingRequest /></IsTutor>
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
                                            <IsStudent><div ><Card/></div></IsStudent>
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
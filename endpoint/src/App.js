import React, { Fragment } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet
} from "react-router-dom";

import { SocketProvider } from "./Socket";

import ContentPage from "./pages/ContentPage";
import Payment from './pages/Payment';

import axios from "axios";

import { DialogProvider } from 'react-mui-dialog'


import UserProfile from './pages/User/UserProfile'
import UserEditProfile from './pages/User/UserEditProfile'
import UserHistory from './pages/User/UserHistory'
import UserSettings from './pages/User/UserSettings'
import StudentFavoriteList from "./pages/User/StudentFavoriteList";
import PrepareRequest from "./pages/User/PrepareRequest";


// Admin side
import AdminHome from "./pages/Admin/AdminHome";
import AllUser from "./pages/Admin/AllUser";
import AdminActivity from "./pages/Admin/AdminActivity";
import AdminSupport from "./pages/Admin/AdminSupport"; // the real time

import TutorProvider from "./components/Data/TutorProvider";


// Tutor side
// import TutorDashboard from './pages/Tutor/tutorDashboard';
import IsStudent from "./auth/IsStudent";
import IsAdmin from "./auth/IsAdmin";
import IsAuth from "./auth/IsAuth";
import Redirect from "./auth/Redirect";
import NotFound from "./auth/NotFound";
import PendingRequest from './pages/User/PendingRequest'
import IsTutor from "./auth/IsTutor";
import ViewStudent from "./pages/view/Student"

// import HomePage from "./pages/home/homePage.js";

// Languages
import Languages from "./languages.json"

export const LanguageContext = React.createContext();

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


    const [language, setLanguage] = React.useState(Languages.En);

    const updateLanguage = (newLanguage) => {

        if (Languages.Selected === 'En') Languages.Selected = 'Ar';
        else Languages.Selected = 'En';

        setLanguage(newLanguage);
    }


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

        <LanguageContext.Provider value={language}>
            <DialogProvider>
                <TutorProvider>
                    <div className="container-fluid"
                        style={
                            {
                                height: '100%',
                                margin: '0%',
                                padding: '0%'
                            }
                        }>

                        <Router>
                            <SocketProvider>
                                <Routes>
                                    <Route path="/"
                                        element={<ContentPage name="HomePage" setLanguage={updateLanguage} />} />

                                    <Route path="/Login"
                                        element={<ContentPage name="Login" setLanguage={updateLanguage} />} />

                                    <Route path="/Signup"
                                        element={<ContentPage name="Signup" setLanguage={updateLanguage} />} />

                                    <Route path="/StudentDashboard"
                                        element={<IsStudent><ContentPage name="Student" setLanguage={updateLanguage} /></IsStudent>} />

                                    <Route path="/AdminDashboard"
                                        element={<IsAdmin><ContentPage name="Admin" setLanguage={updateLanguage} /></IsAdmin>}/>

                                    <Route path="/TutorDashboard"
                                        element={<IsTutor><ContentPage name="Tutor" setLanguage={updateLanguage} /></IsTutor>} />

                                    <Route path="Admin"
                                        element={
                                            <><Outlet /></>
                                        }>
                                        <Route path="Home"
                                            element={<AdminHome />} />
                                        <Route path="AllUsers"
                                            element={<AllUser />} />
                                        <Route path="Activity"
                                            element={<AdminActivity />} />
                                        <Route path="Support"
                                            element={<AdminSupport />} />
                                    </Route>


                                    <Route path="user"
                                        element={
                                            <><Outlet /></>
                                        }>
                                        <Route path="Profile"
                                            element={
                                                <IsAuth><UserProfile /></IsAuth>
                                            } />
                                        <Route path="EditProfile"
                                            element={
                                                <IsAuth><UserEditProfile /></IsAuth>
                                            } />

                                        <Route path="History"
                                            element={
                                                <IsAuth><UserHistory /></IsAuth>
                                            } />

                                        <Route path="Setting"
                                            element={
                                                <IsAuth><UserSettings /></IsAuth>
                                            } />

                                        <Route path="Payment"
                                            element={
                                                <IsAuth><Payment language={language} /></IsAuth>
                                            } />

                                        <Route path="session/:sessionID"
                                            element={
                                                <IsAuth><ContentPage name="Session" setLanguage={updateLanguage} /></IsAuth>
                                            } />
                                    </Route>

                                    <Route path="tutor">
                                        <Route path="pendingRequest"
                                            element={
                                                <IsTutor><PendingRequest /></IsTutor>
                                            } />
                                    </Route>
                                    <Route path="student"
                                        element={
                                            <><Outlet /></>
                                        }>
                                        <Route path="FavoriteList"
                                            element={
                                                <IsStudent><StudentFavoriteList /></IsStudent>
                                            } />
                                    </Route>

                                    {/* <Route path="testAuth"
                                        element={
                                            <IsStudent><p>hello just test</p></IsStudent>
                                        } /> */}

                                    <Route path="global"
                                        element={

                                            <><Outlet /></>
                                        }>
                                        <Route path="tutors"
                                            element={
                                                <IsStudent><ContentPage name="TutorList" setLanguage={updateLanguage} /></IsStudent>
                                            } />

                                    </Route>



                                    <Route path="*"
                                        element={<NotFound />} />


                                    {/* <Route path="testDash"
                                        element={<TutorDashboard />} /> */}


                                    <Route path="home"
                                        element={
                                            <Redirect><PrepareRequest /></Redirect>

                                        } />
                                    <Route path="/homePage"
                                        element={<ContentPage name="HomePage" setLanguage={updateLanguage} />} />

                                    <Route path="/view/tutor/:id"
                                        element={<ContentPage name="ViewTutor" setLanguage={updateLanguage} />} />

                                    <Route path="/view/student/:id"
                                        element={<ViewStudent />} />

                                </Routes>
                            </SocketProvider>
                        </Router>
                    </div>
                </TutorProvider>
            </DialogProvider>
        </LanguageContext.Provider>
    )
}

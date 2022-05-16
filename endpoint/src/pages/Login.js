import React, { useContext, useState } from "react";
import axios from "axios";
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ProgressBar from './../components/ProgressBar'
import { Box, display } from "@mui/system";
import { Block } from "@mui/icons-material";
import { BsPerson } from "react-icons/bs";
import Footer from './../components/footer/footer.js'
import NavBar from "../components/topBar/navBar";
import { SocketContext, SocketProvider } from "../Socket";
import classes from "./Login.module.css";
import Divider from '@mui/material/Divider';

// to align items in center 
const styleCenter = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center"
}




export default () => {

    let navigate = useNavigate();
    const userName = React.useRef();
    const password = React.useRef();

    const [isReady, setReady] = React.useState(null)

    const socket = useContext(SocketContext)
    React.useEffect(() => {
        let type = parseInt(localStorage.getItem('type'))
        if (type >= 0) {
            navigate('/home')
            let token = localStorage.getItem('token')
            socket.emit('sendID', token)
        }


    }, [])

    const [error, setError] = React.useState(0)

    const login = (event) => {
        setReady(0)
        event.preventDefault();
        axios.post('http://localhost:4000/user/login', {
            userName: userName.current.value,
            password: password.current.value
        }).then((data) => {
            console.log(data)
            setReady(1)
            if (data.data === 'no') {
                setError(404)
            }
            else if (data.data.type != null) {
                var type = data.data.type;
                var token = data.data.user_id ? data.data.user_id : data.data._id;

                localStorage.setItem('token', token)
                localStorage.setItem('type', type);
                localStorage.setItem('userDetail', JSON.stringify(data.data));

                if (type === 0) {
                    // navigate('/StudentDashboard')
                    navigate('/home')
                } else if (type === 1) {
                    navigate('/TutorDashboard')
                } else if (type === 2) {
                    navigate('/AdminDashboard')
                } else {
                    navigate('/home')
                }

                socket.emit('sendID', token)
            }
        }).catch((error) => {
            console.log("There is some error " + error)
        })
    }


    return (

        <div style={{ background: "#F4F4F8", height: "100%" }}>
            {
                isReady === 0 &&
                <ProgressBar />
            }

{/* 
            <div style={{ ...styleCenter, mt: 4 }} >
                <NavBar />
            </div> */}

            <Stack sx={{
                width: '100%',
                display: error === 404 ? 'block' : 'none'
            }} spacing={2}>
                <Alert severity="error" variant='filled'>There is no user, username or password is incorrect</Alert>
            </Stack>

            <div style={styleCenter}>

                <div className={classes.formDiv}>
                    <h1 style={{ color: "#000052", marginBottom: "20px" }}>Login</h1>
                    <p>Please enter your information</p>

                    <div>

                        <form onSubmit={(event) => { login(event) }} style={{ width: "60%" }} >
                            <div style={{ marginBottom: "20px" }}>
                                <input type="text" style={{ padding: "13px", backgroundColor: '#F8F8F8' }} className="form-control mt-2"
                                    placeholder="Username"
                                    ref={userName}
                                    required={true}
                                />
                                <input style={{ padding: "13px", backgroundColor: '#F8F8F8' }} type="password" className="form-control mt-2"
                                    placeholder="Password"
                                    ref={password}
                                    required={true}
                                />
                            </div>



                            <div style={styleCenter}>
                                <input type="submit" className="btn mt-2"

                                    value="Login"
                                    style={{
                                        backgroundColor: color[0],
                                        color: color[2],
                                        display: " block",
                                        width: "50%",
                                        padding: "10px",
                                        borderRadius: "10px",

                                    }} />

                            </div>

                            <Divider sx={{margin:"10px",backgroundColor:"black !important"}} />
                            <div style={styleCenter}>
                                You don't have an account ?<Link to="/signup" style={{
                                    textDecoration: 'none',
                                    color: "#D90429"
                                }} > &nbsp; <u>Sign up </u> </Link>
                            </div>

                        </form>
                    </div>

                </div>
            </div>

        </div>

    )
}

const color = [
    "#000052",
    "#D90429",
    "#fff",
]

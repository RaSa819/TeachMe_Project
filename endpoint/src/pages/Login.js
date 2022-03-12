import React, { useState } from "react";
import axios from "axios";
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ProgressBar from './../components/ProgressBar'
import { Box, display } from "@mui/system";
import { Block } from "@mui/icons-material";

// to align items in center 
const styleCenter = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

export default () => {

    let navigate = useNavigate();
    const userName = React.useRef();
    const password = React.useRef();

    const [isReady, setReady] = React.useState(null)

    React.useEffect(() => {
        let type = parseInt(localStorage.getItem('type'))
        if (type >= 0)
            navigate('/home')

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
                var token = data.data.id;

                localStorage.removeItem('token')
                localStorage.removeItem('type')

                localStorage.setItem('token', token)
                localStorage.setItem('type', type);
                navigate('/home')
            }
        }).catch((error) => {
            console.log("There is some error " + error)
        })
    }
    return (
        <div className="row">
            {
                isReady === 0 &&
                <ProgressBar />
            }
            <div className="col-md-2" />
            <div className="col-md-8">
                <div style={{
                    ...styleCenter, // for more style attributes
                }} >
                    
                    <BsFillPersonFill size={100}
                        color="gray"
                        
                       />
                      
                </div>
                <Stack sx={{
                    width: '100%',
                    display: error === 404 ? 'block' : 'none'
                }} spacing={2}>
                    <Alert severity="error" variant='filled'>There is no user, may be username or password is correct</Alert>
                </Stack>
                <form onSubmit={(event) => { login(event) }} >
                    <input type="text" style={{padding:"13px", backgroundColor:'#F8F8F8'}}  className="form-control mt-3"
                        placeholder="Username" 
                        ref={userName}

                        required={true}
                    />

                    <input style={{padding:"13px" , backgroundColor:'#F8F8F8'}} type="password" className="form-control mt-2"
                        placeholder="Password"
                        ref={password}
                        required={true}
                    />

                    <div style={{
                        display: "flex",
                        justifyContent: 'space-between'
                    }}>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="privacy"
                            />
                            <label class="form-check-label" for="privacy">
                                Remember me
                            </label>
                        </div>
                        <div class="form-check">
                            <a href="#" style={{
                                textDecoration: 'none',
                                color: 'black'
                            }}>Forgot Password ?</a>
                        </div>
                    </div>

                    <div style={styleCenter}>
                        You don't have an account ? <Link to="/signup" style={{
                            textDecoration: 'none'
                        }}> Register </Link>
                    </div>
                    <div style={styleCenter}>
                        <input type="submit" className="btn mt-2" 

                            value="Login"
                            style={{
                                backgroundColor: color[0],
                                color: color[2] ,
                                display:" block",
                                 width:"100%",
                                 padding:"13px"
                                
                            }}

                        />
                    </div>
                </form>
            </div>
        </div>

    )
}

const color = [
    "#000052",
    "#D90429",
    "#fff",
]

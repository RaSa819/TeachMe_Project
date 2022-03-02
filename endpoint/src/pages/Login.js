import React, { useState } from "react";
import axios from "axios";
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

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

    const login = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('type')
        axios.post('http://localhost:4000/user/login', {
            userName: userName.current.value,
            password: password.current.value
        }).then((data) => {
            console.log(data)
            if (data.data.type == 0) {
                localStorage.setItem('token', data.data.id)
                localStorage.setItem('type', data.data.type);
                navigate('/student')
            }
        }).catch((error) => {
            console.log("there is some error " + error)
        })
    }
    return (
        <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
                <div style={{
                    ...styleCenter,// for more style attributes
                }}>
                    <BsFillPersonFill size={60}
                        color="gray"
                    />
                </div>
                <form onSubmit={(event) => { login(event) }}>
                    <input type="text" className="form-control mt-3"
                        placeholder="username"
                        ref={userName}
                    />

                    <input type="password" className="form-control mt-2"
                        placeholder="password"
                        ref={password}
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
                            }}>Forget Password ?</a>
                        </div>
                    </div>

                    <div style={styleCenter}>
                        you don't have an acount ? <a href="#" style={{
                            textDecoration: 'none'
                        }}> Register </a>
                    </div>
                    <div style={styleCenter}>
                        <input type="submit" className="btn mt-2"

                            value="Login"
                            style={{
                                backgroundColor: color[0],
                                color: color[2]
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
    "#F4F4F8",
]
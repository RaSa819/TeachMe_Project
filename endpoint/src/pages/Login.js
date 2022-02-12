import React, { useState } from "react";

import { BsFillPersonFill } from 'react-icons/bs';

// to align items in center 
const styleCenter = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

export default () => {

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
                <input type="text" className="form-control mt-3"
                    placeholder="username"
                />

                <input type="password" className="form-control mt-2"
                    placeholder="password"
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
                        textDecoration:'none'
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
            </div>
        </div>

    )
}

const color = [
    "#000052",
    "#D90429",
    "#F4F4F8",
]
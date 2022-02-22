import React, { useState } from "react";
import axios from "axios";

export default function Filter() {

    axios.get('http://localhost:4000/user/fetchTutors').
        then((response) => {
            console.log(response)
        }).
        catch((error) => {
            console.log('the error is ' + error)
        })


    return (
        <div>Filter</div>
    )
}

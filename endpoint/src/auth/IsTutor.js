import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Button } from '@mui/material'
export default ({ children }) => {

    let navigate = useNavigate()
    // to check if the user is tutor type or not ,
    // if he tutor it well show the children page 
    // else, it will redirect it to the previous page 

    var type = parseInt(localStorage.getItem('type'))


    return type === 1 ?
        children :
        <Navigate to="/user/profile" />
}
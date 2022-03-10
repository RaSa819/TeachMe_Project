import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export default ({ children }) => {


    // to check if the user is student type or not ,
    // if the user is tutor, it well redirect to the profile
    // if he student, it will redirect to home page 
    var type =parseInt(localStorage.getItem('type'))
    

    return type === 0 ?
        children :
        type === 1 ?
            <Navigate to="/user/profile" /> :
            <Navigate to="/UnknowUser"/>
}
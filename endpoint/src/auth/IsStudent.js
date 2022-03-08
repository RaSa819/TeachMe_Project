import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export default ({ children }) => {


    // to check if the user is student type or not ,
    // if the user is tutor, it well come back previouse page,
    // if he student it well show the children page 
    var type = localStorage.getItem('type')


    return type === 0 ?
        children :
        <Navigate to="/" />
}
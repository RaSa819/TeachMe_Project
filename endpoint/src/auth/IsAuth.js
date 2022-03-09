import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export default ({ children }) => {

    // Authentication Wrapper component 

    var type = localStorage.getItem('type')

    return type != null ?
        children :
        <Navigate to="/login" />
}
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default ({ children }) => {

    // Authentication Wrapper component 

    var type = localStorage.getItem('type')
    const { navigate } = useNavigate()
    return type != null ?
        children :
        navigate('/')
}
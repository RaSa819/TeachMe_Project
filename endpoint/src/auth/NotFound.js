import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export default ({ children }) => {
    let navigate = useNavigate()
    
    React.useEffect(() => {
        setTimeout(() => {
            navigate('/login')
        }, 3000)
    }, [])
    
    return (<div style={{
        display:'flex',
        justifyContent:'center',
        alignContent:'center'
    }}>
        <h1>
            Not Found page 
        </h1>

    </div>)
}


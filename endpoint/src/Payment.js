import React, { useContext } from 'react'


import { SocketContext } from './Socket'

export default ()=>{

    const client = useContext(SocketContext)

    const tutorID = localStorage.getItem('tutorID')
    const sessionID = localStorage.getItem('sessionID')

    return(<div>
        <h1>Hello in page payment </h1>

        <button onClick={()=>{
            client.emit('ok',sessionID)
           
        }}>
            Ok , {tutorID}
        </button>
    </div>)
}
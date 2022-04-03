import React, { createContext } from 'react';
import { io } from 'socket.io-client';
import {useNavigate} from 'react-router-dom'
let token = localStorage.getItem('token');
const client = io.connect('http://localhost:4000',{
    query:`token=${token}`
})
const SocketContext = createContext(client);


const SocketProvider = ({ children }) => {
    let navigate = useNavigate();
    client.on('openSession',(data)=>{
        localStorage.setItem('studentID',data.student);
        localStorage.setItem('tutorID',data.tutor);
        localStorage.setItem('sessionID',data.sessionID);
        navigate('/user/session');
    })

    client.on('endSession',(data)=>{
        localStorage.removeItem('studentID');
        localStorage.removeItem('tutorID');
        localStorage.removeItem('sessionID');
    })

    
    return (
        <SocketContext.Provider value={client}>
            {children}
        </SocketContext.Provider>
    );
};
export { SocketContext, SocketProvider };

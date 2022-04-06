import React, {createContext, useMemo} from 'react';
import {io} from 'socket.io-client';
import {useNavigate} from 'react-router-dom'
import {useState} from 'react';
let token = localStorage.getItem('token');
const client = io.connect('http://localhost:4000', {
    query: `token=${token}`,
    'reconnect': false
})
const SocketContext = createContext(client);

localStorage.setItem('socket', client);

const SocketProvider = ({children}) => {


    let navigate = useNavigate();

    client.on('openSession', (data) => {
        let type = localStorage.getItem('type')
        if (type == 0) {
            localStorage.setItem('studentID', data.student);
            localStorage.setItem('tutorID', data.tutor);
            localStorage.setItem('sessionID', data.sessionID);
            localStorage.setItem('flag', '0');
            navigate('/user/session');
        } else {
            
            setTimeout(() => {
                localStorage.setItem('studentID', data.student);
                localStorage.setItem('tutorID', data.tutor);
                localStorage.setItem('sessionID', data.sessionID);
                localStorage.setItem('flag', '0');
                navigate('/user/session');
            }, 3000)
        }

    })

    client.on('endSession', (data) => {
        localStorage.removeItem('studentID');
        localStorage.removeItem('tutorID');
        localStorage.removeItem('sessionID');
    })


    return (
        <SocketContext.Provider value={client}>
            {children} </SocketContext.Provider>
    );
};
export {
    SocketContext,
    SocketProvider
};

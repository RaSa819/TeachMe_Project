import React, { createContext, useCallback } from 'react';
import {io} from 'socket.io-client';
import {useNavigate} from 'react-router-dom'

const client = io.connect('http://localhost:4000')

const SocketContext = createContext(client);



const SocketProvider = ({children}) => {




    React.useEffect(() => {
        let type = parseInt(localStorage.getItem('type'))
        if (type >= 0) {
            let token = localStorage.getItem('token')
            client.emit('sendID',token)
        }
    }, [])

    let navigate = useNavigate();

    const handleGotoPayment = useCallback((data) => {
        let type = localStorage.getItem('type')
        if (type == 0) {
            localStorage.setItem('studentID', data.student);
            localStorage.setItem('tutorID', data.tutor);
            localStorage.setItem('sessionID', data.sessionID);
            localStorage.setItem('flag', '0');            
            window.location.href = data.checkoutURL;
        } else {
            setTimeout(() => {
                localStorage.setItem('studentID', data.student);
                localStorage.setItem('tutorID', data.tutor);
                localStorage.setItem('sessionID', data.sessionID);
                localStorage.setItem('flag', '0');
                navigate('/user/Payment');
            }, 3000)
        }
    }, [navigate]);

    const handleOpenSession = useCallback(({ sessionID }) => navigate(`/user/session/${sessionID}`), [navigate]);

    React.useEffect(() => {
        client.on('gotoPayment', handleGotoPayment);
        client.on('openSession', handleOpenSession);

        return () => {
            client.off('gotoPayment', handleGotoPayment);
            client.off('openSession', handleOpenSession);
        }
    }, [handleGotoPayment, handleOpenSession]);

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

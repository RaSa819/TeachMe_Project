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

            window.open(data.checkoutURL);
            
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
    }, [navigate]);

    React.useEffect(() => {
        client.on('gotoPayment', handleGotoPayment);
        return () => client.off('gotoPayment', handleGotoPayment);
    }, [handleGotoPayment]);

    // client.on('gotoPayment',(data)=>{
    //     localStorage.setItem('sessionID',data)
    //     navigate('/payment');
       
    // })

    // client.on('paymentGood',()=>{
    //     alert('hello mohammed gamal ')
    // })

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

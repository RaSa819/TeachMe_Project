import React, { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
const client = io.connect('http://localhost:4000')
const SocketContext = createContext < Socket > (client);


const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={client}>
            {children}
        </SocketContext.Provider>
    );
};
export { SocketContext, SocketProvider };

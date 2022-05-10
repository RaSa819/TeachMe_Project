import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SocketContext } from '../Socket';

const Payment = () => {
    const socket = useContext(SocketContext);

    const [searchParams] = useSearchParams();
    React.useEffect(() => {
        if (searchParams.has('checkout_hash')) {
            socket.emit('verifyPayment', {
                checkoutHash: searchParams.get('checkout_hash'),
                requestID: searchParams.get('request_id'),
            });
        }
    }, [socket, searchParams])

    return (
        <div>
            <h1>Please wait, processing payment from the student...</h1>
        </div>
    );
};
export default Payment;

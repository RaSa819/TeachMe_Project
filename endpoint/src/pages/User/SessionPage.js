// import React, {useState, useContext, useRef} from 'react'
// import Drawer from './Layout/Drawer'
// import Avatar from '@mui/material/Avatar';
// import {SocketContext} from '../../Socket';
// import {MessageBox} from '../../components/MessageBox';
// import {useDialog} from 'react-mui-dialog';
// import {useNavigate} from 'react-router';
// import Peer from 'simple-peer'
// export default() => {
//
//
//     let navigate = useNavigate();
//     const {openDialog, closeDialog} = useDialog();
//     const [isOpenSession, setOpenSession] = useState(false);
//     const [myStream, setMyStream] = useState()
//     const [myId, setMyId] = useState('');
//     const [userId, setUserId] = useState();
//     const [receiveCall, setReceiveCall] = useState(false)
//     const [caller, setCaller] = useState() // caller ID
//     const [callerSignal, setCallerSignal] = useState({}) // The Stream which coming from the caller
//     const [callAccepted, setCallAccepted] = useState(false)
//     const [idToCall, setIdToCall] = useState('') // ID which will copy to clipboard
//     const [callEnded, setCallEnded] = useState(false)
//     const [name, setName] = useState('')
//
//     const [userStream, setUserStream] = useState()
//
//
//     const myVideoRef = useRef();
//     const userVideoRef = useRef();
//     const connectionRef = useRef()
//     const socket = useContext(SocketContext)
//
//     React.useEffect(() => { // alert('my type '+localStorage.getItem('type')+' and token '+localStorage.getItem('token'));
//
//         navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
//             setMyStream(stream)
//             myVideoRef.current.srcObject = stream
//         }).catch((error) => {
//             var errorCode = parseInt(error.code);
//             if (errorCode === 8) {
//                 MessageBox(openDialog, 'There is Error ', 'There is no device', false);
//                 return
//             }
//         })
//
//
//     }, [])
//
//
//     socket.on('callTutor', (data) => {
//         setCallerSignal(data.signal)
//         // alert('the calling is coming from the student ');
//
//         // console.log({data})
//         // alert('he')
//         alert(JSON.stringify(data.signal, null, 2));
//     })
//     socket.on('endCall', () => {
//         navigate('/user/profile');
//     })
//
//
//     const peer = new Peer({initiator: true, trickle: false, stream: myStream});
//
//
//     const callTutor = (id) => { // const peer = new Peer({initiator: true, trickle: false, stream: myStream})
//
//         peer.on('signal', (data) => {
//             socket.emit('callTutor', {
//                 tutorID: id,
//                 signalData: data
//             })
//         })
//
//         peer.on('stream', (stream) => {
//             userVideoRef.current.srcObject = stream;
//             alert('stream is coming ');
//         })
//
//
//         socket.on('callAccepted', (signal) => {
//             setCallAccepted(true)
//             peer.signal(signal)
//
//             // alert('hello')
//             // alert(JSON.stringify(signal,null,0));
//         })
//         connectionRef.current = peer;
//     };
//
//     const answerCallStudent = () => { // const peer = new Peer({initiator: true, trickle: false, stream: myStream})
//
//         peer.on('signal', (data) => {
//             socket.emit('answerCallTutor', {
//                 signal: data,
//                 to: localStorage.getItem('studentID')
//             })
//             // alert(JSON.stringify(data, null, 0));
//         })
//
//         peer.on('stream', (stream) => {
//             userVideoRef.current.srcObject = stream;
//             alert('stream event is emitted')
//             // alert(JSON.stringify(stream, null, 0));
//         })
//
//         // alert(JSON.stringify(callerSignal, null, 0));
//         if (callerSignal) {
//             peer.signal(callerSignal)
//             connectionRef.current = peer;
//
//         }
//     }
//
//     // from here is begin
//     socket.on('startCallWithTutor', () => { // alert('student startemit ');
//         let tutorID = localStorage.getItem('tutorID');
//         callTutor(tutorID);
//     });
//
//     socket.on('answerCallOfStudent', () => { // alert('tutor answerCall');
//         answerCallStudent();
//     });
//
//     return (
//         <Drawer>
//             <div style={
//                 {
//                     marginRight: 0,
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'row',
//                     width: '100%'
//                 }
//             }>
//                 <div style={
//                     {width: '100%'}
//                 }>
//                     {/* <video autoPlay
//                     ref={myVideoRef}
//                     style={
//                         {width: '100%'}
//                 }></video> */}
//
//                     <video autoPlay
//                         ref={userVideoRef}
//                         style={
//                             {width: '100%'}
//                     }></video>
//
//                     <div style={
//                         {
//                             display: 'flex',
//                             justifyContent: 'center',
//                             width: '100%'
//
//                         }
//                     }>
//                         {/* <div> {
//                             receiveCall && !callAccepted ? (
//                                 <div className="caller">
//                                     <h1> {name}
//                                         is Calling ...
//                                     </h1>
//                                     <Button variant="contained" color="primary"
//                                         onClick={answerCall}>
//                                         Answer
//                                     </Button>
//                                 </div>
//                             ) : null
//                         } </div> */}
//                         <button style={
//                                 {
//                                     backgroundColor: 'red',
//                                     borderRadius: '50%',
//                                     width: '40px',
//                                     height: '40px'
//                                 }
//                             }
//
//                             onClick={
//                                 () => {
//                                     socket.emit('endCall', {sessionID: localStorage.getItem('sessionID')})
//                                 }
//                         }></button>
//                 </div>
//
//             </div>
//         </div>
//     </Drawer>
//     )
// }
//


import React, {useState, useRef, useEffect} from 'react'
import {SocketContext} from '../../Socket';
import io from 'socket.io-client'
import Peer from 'simple-peer'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Button from '@material-ui/core/Button'
import {IconButton, TextField} from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import PhoneIcon from '@material-ui/icons/Phone'


const socket = io.connect('http://localhost:4000');function App() {


const [me, setMe] = useState("") // my id
const [stream, setStream] = useState() // My stream
const [receiveCall, setReceiveCall] = useState(false)
const [caller, setCaller] = useState() // caller ID
const [callerSignal, setCallerSignal] = useState() // The Stream which coming from the caller
const [callAccepted, setCallAccepted] = useState(false)
const [idToCall, setIdToCall] = useState('') // ID which will copy to clipboard
const [callEnded, setCallEnded] = useState(false)
const [name, setName] = useState('')


// References

const myVideo = useRef() // this my video which will represent in video element
const userVideo = useRef() // this is the caller's video which will represent in the  caller video element
const connectionRef = useRef()
// this is for actual connection, this can disconnect the connection

// will run when the page load or refresh
useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: true, audio: false}). // this which allows to use Camera and microphone of the device
    then((stream) => { // the video or audio (strean) which coming from the browser
        setStream(stream) // sign the stream to state stream
        myVideo.current.srcObject = stream; // here to show the stream in the video element

    })


    // the connection between socket and client to get the id
    socket.on('me', (id) => {
        setMe(id)

    })
    socket.on('callUser', (data) => {
        setReceiveCall(true)
        setCaller(data.from)
        setName(data.name)
        setCallerSignal(data.signal)

        alert('call user is coming ')
    })

}, []);

const callUser = (userID) => {
    const peer = new Peer({initiator: true, trickle: false, stream: stream})
    peer.on('signal', (data) => {
        socket.emit('callUser', {
            userToCall: userID,
            signalData: data,
            from: me,
            name: name
        })
    })

    peer.on('stream', (stream) => {
        userVideo.current.srcObject = stream

        // this happed when there is data coming from the caller
        // alert('stream is coming ');
    })


    socket.on('callAccepted', (signal) => {
        setCallAccepted(true)
        peer.signal(signal)

        // this is send it the caller
        alert('we will send signal')

        alert(JSON.JSON(signal, null, 0));
    })

    connectionRef.current = peer;

}


const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({initiator: false, trickle: false, stream: stream})

    peer.on('signal', (data) => {
        socket.emit('answerCall', {
            signal: data,
            to: caller
        })

        // alert(JSON.JSON(data,null,0));
    })

    peer.on('stream', (stream) => {
        userVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
    connectionRef.current = peer;
}

const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()

}
return (
    <>
        <h1 style={
            {
                textAlign: 'center',
                color: 'blue'
            }
        }>zoom with me</h1>

        <div className="container">
            <div className="video-container">
                <div className="video">
                    {
                    stream && <video playsInline muted
                        ref={myVideo}
                        autoPlay
                        style={
                            {width: '300px'}
                    }></video>
                } </div>

                <div className="video">
                    {
                    callAccepted && !callEnded ? <video playsInline
                        ref={userVideo}
                        autoPlay
                        style={
                            {width: '300px'}
                    }></video> : null
                } </div>
            </div>

            <div className="myId">
                <TextField label="Name" variant="filled"
                    value={name}
                    onChange={
                        (e) => setName(e.target.value)
                    }
                    style={
                        {marginBottom: '20px'}
                    }/>

                <CopyToClipboard text={me}
                    style={
                        {marginBottom: '20px'}
                }>
                    <Button variant="contained" color="primary"
                        startIcon={
                            <AssignmentIcon
                        fontSize="large"/>
                    }></Button>
                </CopyToClipboard>

                <TextField label="id to call " variant="filled"
                    value={idToCall}
                    onChange={
                        (e) => setIdToCall(e.target.value)
                    }/>

                <div className="call-button">
                    {
                    callAccepted && !callEnded ? (
                        <Button variant="contained" color="secondary"
                            onClick={leaveCall}>
                            End Call
                        </Button>
                    ) : (
                        <IconButton color="primary" aria-label="Call"
                            onClick={
                                () => callUser(idToCall)
                        }>

                            <PhoneIcon fontSize="large"></PhoneIcon>
                        </IconButton>
                    )
                }
                    {idToCall} </div>
            </div>

            <div> {
                receiveCall && !callAccepted ? (
                    <div className="caller">
                        <h1> {name}
                            is Calling ...
                        </h1>
                        <Button variant="contained" color="primary"
                            onClick={answerCall}>
                            Answer
                        </Button>
                    </div>
                ) : null
            } </div>


        </div>
    </>
);}export default App;

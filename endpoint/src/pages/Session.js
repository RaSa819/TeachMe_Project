import React, {useState, useRef, useEffect} from 'react'
import io from 'socket.io-client'
import Peer from 'simple-peer'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Button from '@material-ui/core/Button'
import {IconButton, TextField} from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import PhoneIcon from '@material-ui/icons/Phone'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopIcon from '@mui/icons-material/Stop';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import VideoCallIcon from '@mui/icons-material/VideoCall';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import Chat from './chat'
// import { Chat } from '@mui/icons-material'

let token = localStorage.getItem('token');
let studentID = localStorage.getItem('studentID');
let tutorID = localStorage.getItem('tutorID');
let sessionID = localStorage.getItem('sessionID');
let start = true;
let data = token + ';' + studentID + ';' + tutorID + ';' + sessionID + ';' + start;
console.log(data);
//const socket = io.connect('http://localhost:4000', {query: `data=${data}`});
function App(props) {


    const [me, setMe] = useState("") // my id
    const [stream, setStream] = useState() // My stream

    const [receiveCall, setReceiveCall] = useState(false)
    const [caller, setCaller] = useState() // caller ID
    const [callerSignal, setCallerSignal] = useState() // The Stream which coming from the caller
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState('') // ID which will copy to clipboard
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState('')

    const [isMuted, setMuted] = useState(false)
    const [isStop, setStop] = useState(false)

    // References

    const myVideo = useRef() // this my video which will represent in video element
    const userVideo = useRef() // this is the caller's video which will represent in the  caller video element
    const connectionRef = useRef()
    const myPeer = useRef()


    const {socket} = props

    let type = localStorage.getItem('type');
    if (type == 1) {
        socket.emit('getIDOf', studentID)
    }

    if (type == 1) {
        setTimeout(() => {
            socket.emit('EndSession', studentID)
            // leaveCall()
        }, 20000)
    }

    socket.on('res1', (data) => {
        callUser(data)
    })

    socket.on('EndSession', () => { // leaveCall()
    })
    // this is for actual connection, this can disconnect the connection

    // will run when the page load or refresh
    useEffect(() => {
        let flag = localStorage.getItem('flag')
        if (flag == '0') {
            window.location.reload()
            localStorage.setItem('flag', '1')
        }
        // navigator.mediaDevices.getUserMedia({video: true, audio: true}). // this which allows to use Camera and microphone of the device
        // then((stream) => { // the video or audio (strean) which coming from the browser
        //     setStream(stream) // sign the stream to state stream
        //     myVideo.current.srcObject = stream; // here to show the stream in the video element

        // })


        // the connection between socket and client to get the id
        socket.on('me', (id) => {
            setMe(id)

        })
        socket.on('callUser', (data) => {
            setReceiveCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)

            // alert('call user is coming ')
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

        myPeer.current = peer
        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream

            // this happed when there is data coming from the caller
            // alert('stream is coming ');
        })


        socket.on('callAccepted', (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
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

        myPeer.current = peer;
        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
        myPeer.current.destroy();
    }


    function shareScreen() {
        navigator.mediaDevices.getDisplayMedia({cursor: true}).then(screenStream => {
            myPeer.current.replaceTrack(stream.getVideoTracks()[0], screenStream.getVideoTracks()[0], stream)
            userVideo.current.srcObject = screenStream;
            screenStream.getTracks()[0].onended = () => {
                myPeer.current.replaceTrack(screenStream.getVideoTracks()[0], stream.getVideoTracks()[0], stream)
                userVideo.current.srcObject = stream
            }
        })
    }

    function toggleMuteAudio() {
        if (stream) {
            stream.getAudioTracks()[0].enabled = isMuted
        }
    }

    function toggleMuteVideo() {
        if (stream) {
            stream.getVideoTracks()[0].enabled = isStop
        }
    }

    // if (receiveCall && !callAccepted) { // answerCall();
    // }

    return (
        <div style={
            {display:"flex",flexDirection: "row",flexWrap:"nowrap"}
        }>
            <div style={
                {width: '70%',boxSizing: 'border-box'}
            }>
                <div style={
                    {
                        width: '100%',
                        height: window.innerHeight - 60,
                        backgroundColor: 'black',
                        position: 'relative',
                        margin: '0'
                    }
                }>
                    {
                    stream && <video playsInline muted
                        ref={myVideo}
                        autoPlay
                        style={
                            {
                                width: '200px',
                                position: 'absolute'
                            }
                    }></video>
                }
                    {
                    callAccepted && !callEnded ? <video playsInline
                        ref={userVideo}
                        autoPlay
                        style={
                            {
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                left: 0,
                                top: 0
                            }
                    }></video> : null
                }
                    {/* <div>
                        <h1 style={{
                            color:'balck'
                        }}></h1>
                    </div> */} </div>
                <div style={
                    {
                        display: 'flex',
                        justifyContent: 'space-around',
                        backgroundColor: 'black'
                    }
                }>
                    <div>
                        <ScreenShareIcon fontSize="large"
                            sx={
                                {color: 'white'}
                            }
                            onClick={
                                () => {
                                    shareScreen()
                                }
                            }/>
                    </div>
                <div> {
                    isStop == true ? <VideoCallIcon fontSize="large"
                        sx={
                            {color: 'white'}
                        }
                        onClick={
                            () => {
                                setStop(false)
                                toggleMuteVideo()
                            }
                        }/> : <VideocamOffIcon fontSize="large"
                        sx={
                            {color: 'white'}
                        }
                        onClick={
                            () => {
                                setStop(true)
                                toggleMuteVideo()
                            }
                        }/>
                } </div>

                <div> {
                    isMuted == true ? <MicOffIcon fontSize="large"
                        sx={
                            {color: 'white'}
                        }
                        onClick={
                            () => {
                                setMuted(false)
                                toggleMuteAudio()
                            }
                        }/> : <KeyboardVoiceIcon fontSize="large"
                        sx={
                            {color: 'white'}
                        }

                        onClick={
                            () => {
                                setMuted(true)
                                toggleMuteAudio()
                            }
                        }/>
                } </div>
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
        <div style={{width:"28%" , marginLeft:"2%"}}><Chat socket={socket} /></div>
    </div>
    )
}

// return (
//     <div>
//         <h1 style={
//             {
//                 textAlign: 'center',
//                 color: 'blue'
//             }
//         }>zoom with me</h1>
//         <h1>{me}</h1>
//
//         <button className='btn btn-success'
//             onClick={
//                 () => {
//                     shareScreen()
//                 }
//         }>
//             share screen
//         </button>
//         <div className='container'>
//             <div>
//             {
//                 stream && <video playsInline muted
//                         ref={myVideo}
//                         autoPlay
//                         style={
//                             {width: '100%'}
//                     }></video>
//             }
//             </div>
//         </div>
//         <div className="container1">
//             <div className="video-container">
//                 <div className="video">
//                     {
//                     stream && <video playsInline muted
//                         ref={myVideo}
//                         autoPlay
//                         style={
//                             {width: '300px'}
//                     }></video>
//                 } </div>
//
//                 <div className="video">
//                     {
//                     callAccepted && !callEnded ? <video playsInline
//                         ref={userVideo}
//                         autoPlay
//                         style={
//                             {width: '300px'}
//                     }></video> : null
//                 } </div>
//             </div>
//             <div>
//                 <div className="video">
// </div>
//             </div>
//             {/*
//             <div className="myId">
//                 <TextField label="Name" variant="filled"
//                     value={name}
//                     onChange={
//                         (e) => setName(e.target.value)
//                     }
//                     style={
//                         {marginBottom: '20px'}
//                     }/>
//
//                 <CopyToClipboard text={me}
//                     style={
//                         {marginBottom: '20px'}
//                 }>
//                     <Button variant="contained" color="primary"
//                         startIcon={
//                             <AssignmentIcon
//                         fontSize="large"/>
//                     }></Button>
//                 </CopyToClipboard>
//
//                 <TextField label="id to call " variant="filled"
//                     value={idToCall}
//                     onChange={
//                         (e) => setIdToCall(e.target.value)
//                     }/>
//
//                 <div className="call-button">
//                     {
//                     callAccepted && !callEnded ? (
//                         <Button variant="contained" color="secondary"
//                             onClick={leaveCall}>
//                             End Call
//                         </Button>
//                     ) : (
//                         <IconButton color="primary" aria-label="Call"
//                             onClick={
//                                 () => callUser(idToCall)
//                         }>
//
//                             <PhoneIcon fontSize="large"></PhoneIcon>
//                         </IconButton>
//                     )
//                 }
//                     {idToCall} </div>
//             </div>
//
// */}
//

//
//
//         </div>
//         </div>
// );

export default App;

import React,{useState,useRef} from 'react'
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

const height=window.innerHeight
const width=window.innerWidth


const styleMyVideoContainer={
    height:'20%',
    width:'100%',
    backgroundColor:'gray',
    display:'flex',
    justifyContent:'space-between'
}
const styleMyVideo ={
    //backgroundColor:'red',
    width:'50%',
    height:'100%'
}

const styleMyVideo1 ={
    //backgroundColor:'red',
    width:'50%',
    height:'100%'
}


const styleTimer={
    width:'70px',
    padding:'30px',
    color:'white'
}

const styleUserVideo={
    
}

const styleVideoChat={
    width:'70%',
    height:'100%',
    backgroundColor:'black',
}

const styleContainer={
    height:height,
    width:width
}
export default ()=>{
    
    
    var timer = useRef(1000)
    const[stimer,setTimer]=useState(timer.current)
    // setInterval(()=>{
    //     timer.current=timer.current-1
    //     setTimer(timer.current)

    //     if(timer<=0)
    //       clearInterval()
    // },1000)


    const myVideo = useRef()

    React.useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video: true, audio: true}). // this which allows to use Camera and microphone of the device
        then((stream) => { // the video or audio (strean) which coming from the browser
            //setStream(stream) // sign the stream to state stream
            myVideo.current.srcObject = stream; // here to show the stream in the video element

        })

    },[])
    return(
        <div style={styleContainer}>
            
            {/* video div */}
            <div style={styleVideoChat}>
                {/* my container */}
                <div style={styleMyVideoContainer}>
                  
                  <div style={styleTimer}>
                     {timer.current}
                  </div>

                  <div style={styleMyVideo1}>
                     <video autoPlay useRef={myVideo} style={styleMyVideo}>

                     </video>
                  </div>
                   
                </div>
            </div>


            {/* chat div */}
            <div style={{
               
            }}> 

            </div>
        </div>
    )
}

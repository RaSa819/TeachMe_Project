import React, { useEffect, useState } from "react"
import { Button ,Input } from '@mui/material';
import  io  from "socket.io-client";

function Chat (props){
    const [allMessage,setallMessage]=useState([])
    const [allMessagee,setallMessagee]=useState([])
    const [message,setMessage]=useState("")
    const [type ,setType]=useState()
    // const [socket,setSocket]=useState(false)
    // useEffect(()=>{
    //     const newSocket=io.connect('http://localhost:4000/chat', {
           
    //     query:{id:window.localStorage.getItem("type")=="1"?window.localStorage.getItem("tutorID"):window.localStorage.getItem("studentID")},
          
    //     })
    //     setSocket(newSocket)

    //     console.log(newSocket)
    //     return newSocket.close()
    // },[setSocket])
    const {socket} = props
    const{height} = props
    const {caller} = props
    useEffect(()=>{

        if(window.localStorage.getItem("type") == 1){
            setType(false)
            console.log(window.localStorage.getItem("flag"))
        }else{
            setType(true)
            console.log(window.localStorage.getItem("flag"))
        }
    },[])
    useEffect(()=>{
        if(socket){

            socket.on("connect",()=>{
                console.log("good day")
            })
        socket.on("NewMeessage",(message)=>{
            
            setallMessage((perv =>{
                console.log("perv",perv)
                return [...perv,{...message}]
            }))
            console.log("all",allMessage)
            console.log(message)
        })
    }
    },[socket])
    // useEffect(()=>{
    //     setallMessagee(allMessage.reverse())
    // },[allMessage])
    if(!socket){
        return <div>lodin..</div>
    }
    

    const handelSendMessage=()=>{

        let type = localStorage.getItem('type')
        socket.emit("NewMeessage",
        {m:message,to:type?window.localStorage.getItem("tutorID"):window.localStorage.getItem("studentID"),id:type?window.localStorage.getItem("tutorID"):window.localStorage.getItem("studentID"),
        target:type==1?window.localStorage.getItem("studentID"):window.localStorage.getItem("tutorID")
    })
        console.log("m",message,type)
        setallMessage((perv =>{
            console.log("perv",perv)
            return [...perv,{m:message,to:1,id:type?window.localStorage.getItem("tutorID"):window.localStorage.getItem("studentID")}]
        }))
        setMessage("")
    }
    const renderChat=()=>{
        // let myChat=
        return (
            <div>
                {allMessage.length > 0 && allMessage.map(({m,to},index)=>{
                    return(
                        <div style={{width:"90%",height:"auto", padding:"3px",textAlign:`${to==1?"right":"left"}`}} key={index}>
                            <span style={{ padding:"3px",margin:"10px",borderRadius:"10px", background:`${to==1?"#0a9cff":"#c2cad1"}`}}  >{m}</span>
                        </div>
                    )
                })}
            </div>
        )
    }
    return (
        <div >
            <div style={{height:height-60,background:"#f9fafb",overflow:"scroll"}}>
                {renderChat()}
            </div>
            <div style={{
                display:'flex',
                justifyContent:'space-between'
            }}>
            <div>
                <Input placeholder="send message..." value={message} onChange={(e)=>{setMessage(e.target.value)}} style={{width:"80%"}} type="text" />
            </div>
            <div>
                <Button style={{background:"rgb(192 212 203)", width:'20%'}} onClick={handelSendMessage}>Send</Button>
            </div>
            </div>
        </div>
    )
}
export default Chat
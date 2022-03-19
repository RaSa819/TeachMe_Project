import React, { useState } from 'react'



const containerStyle = {
    width: '100%',
    height: '1000px',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor:'green'
}


const msg = {
    width: '100%',
    padding: '12px',
    backgroundColor: 'red'
}

const msgRecieve = {

}

const msgSender = {

}

export default function Session() {

    const [open, setOpen] = useState(true)
    const videoStyle = {
        backgroundColor: 'black',
        height: '100%',
        width: open == true ? '75%' : '100%'
    }

    const chatStyle = {
        display: open === true ? 'block' : 'none',
        width: '25%',
        height: '100%',
        margin: 1
    }

    return (
        <div>
            <div style={
                containerStyle
            }>
                <div style={videoStyle}>
                    <video autoPlay>

                    </video>
                </div>
                <div style={chatStyle}>
                    <div style={msg}>

                        <div style={msgRecieve}>
                            <p style={{
                                backgroundColor: 'gray',
                                textAlign: 'left',
                                borderRadius: '20px',
                                width: 'fitContent'
                            }}>Hello Tutor
                            </p>
                        </div>

                        <div style={msgSender}>
                            <p>Hello Student </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

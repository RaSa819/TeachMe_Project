import React, { useState } from 'react'
import img2 from '../../assets/images/Vector.svg';
import './Session.css'

export default function Session() {

  const [chatBtn, setChatBtn] = useState(false);
  const [screenBtn, setScreenBtn] = useState(false);
  const [cameraBtn, setCameraBtn] = useState(false);
  const [micBtn, setMicBtn] = useState(false);
  const [quizBtn, setQuizBtn] = useState(false);
  const [shareScreen, setShareScreen] = useState(false);


  let micRender;

  if (micBtn) {

    micRender = <button className='mic-btn active-btn' onClick={() => setMicBtn(false)} />

  } else {

    micRender = <button className='mic-off-btn' onClick={() => setMicBtn(true)} />
  }



  let camRender;

  if (cameraBtn) {

    camRender = <button className='camera-active-btn active-btn' onClick={() => setCameraBtn(false)} />

  } else {

    camRender = <button className='camera-btn' onClick={() => setCameraBtn(true)} />
  }


  let chatRender;

  if (chatBtn) {

    chatRender = <button className='message-active-btn active-btn' onClick={() => setChatBtn(false)} />

  } else {

    chatRender = <button className='message-btn' onClick={() => setChatBtn(true)} />
  }


  let quizRender;

  if (quizBtn) {

    quizRender = <button className='text-active-btn textBtnActive' onClick={() => setQuizBtn(false)} />

  } else {

    quizRender = <button className='textBtn text-btn' onClick={() => setQuizBtn(true)} />
  }


  let shareRender;

  if (screenBtn) {

    shareRender = <button className='upload-active-btn active-btn' onClick={() => {setScreenBtn(false); setShareScreen(false)}} />

  } else {

    shareRender = <button className='upload-btn' onClick={() => setScreenBtn(true)} />
  }



  return (
    <div>
      <div className='bg-session'>
        <div className='contain'>
          <div className='img-set' >
            <img src={img2}></img>
          </div>

          {cameraBtn ? <div className='camera-section'>
            <div>
              <p>Camera for first party</p>
            </div>
            <div>
              <p>Camera for second party</p>
            </div>
          </div> : ''}


        </div>
        {chatBtn ?

          <div className='chat-btn'>
            <div className='chatDiv'><p className='chatP'>Chat</p></div>

            <div className='chatboxDiv'><span className='chatUserName'>username</span><span className='chatTime'>6:51 AM</span>

              <p className='chatText'>I have a question...</p>
            </div>

            <div className='chat-f d-flex'>
              <input type="text" className='input-session' placeholder='Enter question here....'></input>
              <button></button>
            </div>
          </div>
          : ''
        }


{quizBtn?
      <div className='quiz-tutor'>
                <h2 className='quiz-header'>Question1:</h2>
                <input type="text" className='input-session mb-4' placeholder='Enter question here....'></input>
                <div className='d-flex justify-between align-items-center'>
                  <h2 className='quiz-header'>Options:</h2>
                  <button className='add-btn'></button>
                </div>
                <ul style={{ listStyleType: 'disc' }}>
                  <li className='list-item justify-content-between'>
                    Option 1
                    <div className='d-flex adjust'>
                      <div className='edit-icon list-icon2 mx-2'></div>
                      <div className='delete-icon list-icon2 mx-2'></div>
                    </div>
                  </li>
                </ul>
              </div>
:''}



    {shareScreen?   <div className='screen-share-dialog'>
       <p>Shared content fill the entire screen</p>
    </div> :''}
  


{screenBtn?<div className='screen-share'>
          <p className='mb-5'>You’re about to share your screen with the other party , Do you want to continue ?</p>
          <button onClick={() => setShareScreen(true)}>Start sharing</button>
        </div>
:''}


        <div className='footer'>
          <div style={{ height: "100%" }}> <button className='endC-btn'>End</button>
            </div>
          

          {quizRender}
          <div className='call-btns'>

          
            {micRender}

            {camRender}
           {shareRender}
            {chatRender}
          </div>
        </div>
      </div>
    </div>
  )
}
import React, { useCallback, useContext, useState } from 'react'
import img2 from '../../assets/images/Vector.svg';
import useRTCSession from '../../hooks/useRTCSession';
import './Session.css'
import { LanguageContext } from '../../App';
import useTutorQuiz from '../../hooks/useTutorQuiz';
import useStudentQuiz from '../../hooks/useStudentQuiz';
import { useNavigate, useParams } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios'
import { SocketContext } from "../../Socket";

export default function Session() {
  let { sessionID } = useParams();
  const language = React.useContext(LanguageContext);
  let navigate = useNavigate();
  const [openRates, setOpenRates] = React.useState(false);
  const socket = useContext(SocketContext);

  const {
    peerConnection,
    localVideoRef,
    remoteVideoRef,
    isRemoteSharingScreen,
    toggleCamera,
    toggleMic,
    startScreenSharing,
    stopScreenSharing,
    endCall,
  } = useRTCSession();

  const endCallOpenRates = () => {
    setOpenRates(true);
  };

  const [fromOtherPeer, setFromOtherPeer] = React.useState(false);

  socket.on('end-call', () => {
    setOpenRates(true);
    setFromOtherPeer(true)
  })

  const handleCloseRate = () => {
    setOpenRates(false);
    navigate('/homePage')
  };

  const handleRate = () => {
    let ratingObj = {
      sessionID: sessionID,
      rate: rateValue,
      ratingTo: localStorage.getItem('type') === '1' ? 'student' : 'tutor',
      userID: localStorage.getItem('token')
    }
    setOpenRates(false);
    axios.post('http://localhost:4000/user/rate', ratingObj).then((data) => {
      console.log(data)
      if (fromOtherPeer) {
        peerConnection.close()
      } else {
        endCall();
      }
      navigate('/home')
    }).catch((error) => {
        console.log("There is some error " + error)
    })
  };


  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const handleCameraToggle = useCallback(() => {
    setIsCameraEnabled((isEnabled) => {
      toggleCamera(!isEnabled);
      return !isEnabled;
    })
  }, [toggleCamera]);
  const handleMicToggle = useCallback(() => {
    setIsMicEnabled((isEnabled) => {
      toggleMic(!isEnabled);
      return !isEnabled;
    });
  }, [toggleMic]);


  const [chatBtn, setChatBtn] = useState(false);
  const [screenBtn, setScreenBtn] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [quizBtn, setQuizBtn] = useState(false);

  const {
    question,
    onQuestionChange,
    options,
    addOption,
    editOption,
    editedOptionIndex,
    onEditedOptionChange,
    saveEditedOption,
    deleteOption,
    saveQuiz,
    answer,
  } = useTutorQuiz();

  const { quiz, saveQuizAnswer, onAnswerChange } = useStudentQuiz();

  React.useEffect(() => {
    if (quiz) setQuizBtn(true);
  }, [quiz]);

  React.useEffect(() => {
    if (answer) setQuizBtn(true);
  }, [answer]);


  
  const handleStopSharing = () => {
    stopScreenSharing(); 
    setIsSharingScreen(false); 
    setScreenBtn(false); 
  }


  const handleStartSharing = () => {
    startScreenSharing(handleStopSharing); 
    setIsSharingScreen(true);
  }


  let micRender;
  if (isMicEnabled) {
    micRender = <button className='mic-btn active-btn' onClick={handleMicToggle} />
  } else {
    micRender = <button className='mic-off-btn' onClick={handleMicToggle} />
  }

  let camRender;
  if (isCameraEnabled) {
    camRender = <button className='camera-active-btn active-btn' onClick={handleCameraToggle} />
  } else {
    camRender = <button className='camera-btn' onClick={handleCameraToggle} />
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
    shareRender = <button className='upload-active-btn active-btn' onClick={handleStopSharing} />
  } else {
    shareRender = <button className='upload-btn' onClick={() => setScreenBtn(true)} />
  }
  const [rateValue, setRateValue] = React.useState(3);

  return (
    <div style={{ height: 'calc(100vh - 80px)', marginTop: '80px', overflow: 'none' }}>
      <div className='bg-session'>

<div className='main-content'>

{!isSharingScreen && <div className='camera-section'>
            <div>
              <video ref={remoteVideoRef} autoPlay style={{ height: "230px" }} />
            </div>
            <div >
              <video ref={localVideoRef} autoPlay muted style={{ width: "100%", height: "265px" }} />
            </div>
          </div>}

        <div className={'contain ' + (isSharingScreen ? 'sharingScreen' : '')} >
          {!isSharingScreen && <div className='img-set' >
            <img src={img2} alt=""></img>
          </div>}

          {
            isSharingScreen && <div className='sharingText'> You are now sharing your screen...</div>
          }
          {/* {
            <video 
              id="screenSharingContainer" 
              style={{ display: !isSharingScreen ? 'none' : 'block' }}  
              autoPlay 
                
              />
          } */}
        </div>

</div>
    


          
        {chatBtn ?
          <div className='chat-btn justify-content-between'>
            <div className='chat-h'><p className='chatP m-0'>{language.Chat}</p></div>

            <div className='h-70'>
              <div className='chatboxDiv'><span className='chatUserName'>{language.Username}</span><span className='chatTime'>6:51 AM</span>

                <p className='chatText'>{language.HaveQuestion}</p>
              </div>
            </div>
            <div className='chat-f d-flex'>
              <input type="text" className='input-session h-40' placeholder={language.EnterQuestion}></input>
              <button></button>
            </div>
          </div>
          : ''
        }


        {quizBtn && localStorage.getItem('type') === '1' && (
          <div className='quiz-tutor'>
            <h2 className='quiz-header'>{language.Question1}</h2>
            <input
              type="text"
              className='input-session mb-4'
              placeholder={language.EnterQuestion}
              onChange={onQuestionChange}
              value={question}
            />
            <div className='d-flex justify-between align-items-center'>
              <h2 className='quiz-header'>{language.Options} : </h2>
              <button className='add-btn' onClick={addOption}></button>
            </div>
            <ul style={{ listStyleType: 'disc' }}>
              {options.map((option, i) => (
                <li
                  className='list-item justify-content-between'
                  key={option}
                  style={{ color: answer === i ? 'green' : 'currentcolor', fontWeight: answer === i ? 'bold' : 'normal' }}
                >
                  {editedOptionIndex === i ? <input onChange={onEditedOptionChange} defaultValue={option} /> : option}
                  <div className='d-flex adjust'>
                    <button
                      className='edit-icon list-icon2 mx-1'
                      onClick={editedOptionIndex === i ? saveEditedOption : editOption(i)}
                    />
                    <button className='delete-icon list-icon2 mx-2' onClick={deleteOption(i)}></button>
                  </div>
                </li>
              ))}
            </ul>
            <button className='btn-primary' onClick={() => {
              setQuizBtn(false)
              saveQuiz()
            }}>OK</button>
          </div>
        )}

        {quizBtn && quiz && localStorage.getItem('type') === '0' && (
          <div className="quiz-tutor">
            <h2 className='quiz-header'>{quiz.question}</h2>
            <div className='d-flex justify-between align-items-center'>
              <h2 className='quiz-header'>{language.Options} : </h2>
            </div>
            <ul style={{ listStyleType: 'disc' }}>
              {quiz.options.map((option, i) => (
                <li className='list-item justify-content-between' key={option}>
                  <label>
                    <input type="radio" name="answer" value={i} onChange={onAnswerChange} />
                    {option}
                  </label>
                </li>
              ))}

            </ul>
            <button className='btn-primary' onClick={saveQuizAnswer}>OK</button>
          </div>
        )}

        {(screenBtn && !isSharingScreen) ? <div className='screen-share'>
          <p className='mb-5'>{language.YouAreAboutToShare}</p>
          <button onClick={handleStartSharing}>{language.StartSharing}</button>
        </div>
          : ''}


        <div className='footer'>
          <div style={{
            height: "100%",
            display: 'flex',
            justifyContent: "space-between",
            width: " 28.5%"
          }}>
            <button className='endC-btn'
              onClick={endCallOpenRates}>{language.End}</button>
            <Dialog open={openRates} onClose={handleCloseRate} disableEscapeKeyDown>
              <DialogTitle>{language.HowWasYourExperience}</DialogTitle>
              <DialogContent>
                <Rating
                  name="simple-controlled"
                  value={rateValue}
                  onChange={(event, newValue) => {
                    setRateValue(newValue);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleRate} className='endC-btn'>{language.Submit}</Button>
              </DialogActions>
            </Dialog>
            {quizRender}
          </div>

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
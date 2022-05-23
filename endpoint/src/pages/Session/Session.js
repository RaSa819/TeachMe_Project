import React, { useCallback, useState } from 'react'
import img2 from '../../assets/images/Vector.svg';
import useRTCSession from '../../hooks/useRTCSession';
import './Session.css'
import { LanguageContext } from '../../App';
import useTutorQuiz from '../../hooks/useTutorQuiz';
import useStudentQuiz from '../../hooks/useStudentQuiz';

export default function Session() {
  const language = React.useContext(LanguageContext);
  const {
    localVideoRef,
    remoteVideoRef,
    isRemoteSharingScreen,
    toggleCamera,
    toggleMic,
    startScreenSharing,
    stopScreenSharing,
    endCall,
  } = useRTCSession();

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
    shareRender = <button className='upload-active-btn active-btn' onClick={() => { stopScreenSharing(); setIsSharingScreen(false); setScreenBtn(false); }} />
  } else {
    shareRender = <button className='upload-btn' onClick={() => setScreenBtn(true)} />
  }

  return (
    <div>
      <div className='bg-session'>
        <div className='contain'>
          <div className='img-set' >
            <img src={img2} alt=""></img>
          </div>

          <div className='camera-section'>
            <div>
              <video ref={remoteVideoRef} autoPlay />
            </div>
            <div style={{ display: isRemoteSharingScreen ? 'none' : 'block' }}>
              <video ref={localVideoRef} autoPlay muted />
            </div>
          </div>
        </div>

        {chatBtn ?
          <div className='chat-btn justify-content-between'>
            <div className='chat-h'><p className='chatP m-0'>{language.Chat}</p></div>

            <div className='h-83'>
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
          <button onClick={() => { startScreenSharing(); setIsSharingScreen(true); }}>{language.StartSharing}</button>
        </div>
        :''}


        <div className='footer'>
          <div style={{
            height: "100%",
            display: 'flex',
            justifyContent:"space-between",
            width:" 28.5%"
          }}>
            <button className='endC-btn' onClick={endCall}>{language.End}</button>
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
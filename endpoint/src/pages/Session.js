import React, { useCallback, useState } from 'react';
import useRTCSession from '../hooks/useRTCSession';

const Session = () => {
    const { videoRef, toggleCamera, toggleMic } = useRTCSession();
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

    return (
      <>
        <video
            ref={videoRef}
            style={{ width: window.innerWidth, height: window.innerHeight }}
            autoPlay
        />
        <button onClick={handleMicToggle}>{isMicEnabled ? 'Disable Mic' : 'Enable Mic'}</button>
        <button onClick={handleCameraToggle}>{isCameraEnabled ? 'Disable Camera' : 'Enable Camera'}</button>
      </>
    );
}
export default Session;

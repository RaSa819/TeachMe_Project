import React, { useCallback, useState } from 'react';
import useRTCSession from '../hooks/useRTCSession';

const Session = () => {
    const { videoRef, toggleCamera, toggleMic, startScreenSharing, stopScreenSharing } = useRTCSession();

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

    const [isSharingScreen, setIsSharingScreen] = useState(false);
    const handleScreenSharingToggle = useCallback(() => {
        setIsSharingScreen((isSharing) => {
            if (isSharing) {
                stopScreenSharing();
            } else {
                startScreenSharing();
            }
            return !isSharing;
        });
    }, [startScreenSharing, stopScreenSharing]);

    return (
      <>
        <video
            ref={videoRef}
            style={{ width: window.innerWidth, height: window.innerHeight }}
            autoPlay
        />
        <button onClick={handleMicToggle}>{isMicEnabled ? 'Disable Mic' : 'Enable Mic'}</button>
        <button onClick={handleCameraToggle}>{isCameraEnabled ? 'Disable Camera' : 'Enable Camera'}</button>
        <button onClick={handleScreenSharingToggle}>
            {isSharingScreen ? 'Stop' : 'Start'} screen sharing
        </button>
      </>
    );
}
export default Session;

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Socket";

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function useRTCSession() {
  const { sessionID } = useParams();
  const socket = useContext(SocketContext);

  const peerConnection = useRef(new RTCPeerConnection(servers));
  const localStream = useRef();
  const remoteStream = useRef(new MediaStream());
  const localTracks = useRef([]);
  const screenTrack = useRef();

  const remoteVideoRef = useRef();
  const localVideoRef = useRef();

  const type = Number(localStorage.getItem('type'));

  const [isRemoteSharingScreen, setIsRemoteSharingScreen] = useState(false)

  useEffect(() => {
    (async () => {
        localStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        localStream.current.getTracks().forEach((track) => {
            localTracks.current.push(peerConnection.current.addTrack(track, localStream.current));
        });
        
        peerConnection.current.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.current.addTrack(track);
            });
        };

        remoteVideoRef.current.srcObject = remoteStream.current;
        localVideoRef.current.srcObject = localStream.current;

        if (type === 1) {
            const offerDescription = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offerDescription);

            const callOffer = {
                sdp: offerDescription.sdp,
                type: offerDescription.type,
            };

            socket.emit('tutor-call-offer', { sessionID, callOffer });

            socket.on('webrtc-answer', (answer) => {
                const answerDescription = new RTCSessionDescription(answer);
                peerConnection.current.setRemoteDescription(answerDescription);
            });
        } else {
            socket.on('webrtc-offer', async (offer) => {
                const offerDescription = new RTCSessionDescription(offer);
                await peerConnection.current.setRemoteDescription(offerDescription);

                const answerDescription = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answerDescription);
                const callAnswer = {
                    sdp: answerDescription.sdp,
                    type: answerDescription.type,
                };
                socket.emit('student-call-answer', { sessionID, callAnswer })
            });
        }

        const iceCandidates = [];
        peerConnection.current.onicecandidate = ({ candidate }) => {
            if (candidate) iceCandidates.push(candidate.toJSON());
        };

        peerConnection.current.onicegatheringstatechange = () => {
            if (peerConnection.current.iceGatheringState === 'complete') {
                socket.emit('ice-candidates-update', { candidates: iceCandidates, sessionID, type });
            }
        };

        socket.on('ice-candidates-update', (candidates) => {
            candidates.forEach((candidate) => {
                candidate.usernameFragment = null;
                peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
            });
        });

        socket.on('screen-sharing-start', () => setIsRemoteSharingScreen(true));
        socket.on('screen-sharing-end', () => setIsRemoteSharingScreen(false));
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCamera = useCallback((isEnabled) => {
    localStream.current.getVideoTracks()[0].enabled = isEnabled;
  }, []);

  const toggleMic = useCallback((isEnabled) => {
    localStream.current.getAudioTracks()[0].enabled = isEnabled;
  }, []);

  const startScreenSharing = useCallback(async () => {
    const displayStream = await navigator.mediaDevices.getDisplayMedia({ cursor: true });
    screenTrack.current = displayStream.getTracks()[0];
    localTracks.current.find(sender => sender.track.kind === 'video').replaceTrack(screenTrack.current);
    screenTrack.current.onended = () => {
      localTracks.current.find(sender => sender.track.kind === "video").replaceTrack(localStream.current.getVideoTracks()[0]);
    };
    
    socket.emit('screen-sharing-start', { sessionID, type });
  }, [sessionID, socket, type]);

  const stopScreenSharing = useCallback(async () => {
    if (screenTrack.current) {
      screenTrack.current.stop();
      localTracks.current.find(sender => sender.track.kind === "video").replaceTrack(localStream.current.getVideoTracks()[0]);
      screenTrack.current = null;
    }

    socket.emit('screen-sharing-end', { sessionID, type });
  }, [sessionID, socket, type]);

  return {
    peerConnection: peerConnection.current,
    localStream: localStream.current,
    remoteStream: remoteStream.current,
    remoteVideoRef,
    localVideoRef,
    isRemoteSharingScreen,
    toggleCamera,
    toggleMic,
    startScreenSharing,
    stopScreenSharing,
  };
}

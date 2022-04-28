import React, { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../Socket';

const servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
};

const Session = () => {
    const { sessionID } = useParams();
    const socket = useContext(SocketContext);

    const peerConnection = useRef(new RTCPeerConnection(servers));
    const localStream = useRef();
    const remoteStream = useRef(new MediaStream());
    const videoRef = useRef();
    useEffect(() => {
        (async () => {
            localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            localStream.current.getTracks().forEach((track) => {
                peerConnection.current.addTrack(track, localStream.current);
            });
            
            peerConnection.current.ontrack = (event) => {
                event.streams[0].getTracks().forEach((track) => {
                    remoteStream.current.addTrack(track);
                });
            };

            videoRef.current.srcObject = remoteStream.current;

            const type = Number(localStorage.getItem('type'));
            
            peerConnection.current.onicecandidate = ({ candidate }) => {
                if (candidate) {
                    socket.emit('new-ice-candidate', { sessionID, type, candidate });
                }
            };

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
                    const callAnswer = {
                        sdp: answerDescription.sdp,
                        type: answerDescription.type,
                    };
                    socket.emit('student-call-answer', { sessionID, callAnswer })
                });
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <video ref={videoRef} style={{ width: '100vw', height: '100vh' }} />;
}
export default Session;

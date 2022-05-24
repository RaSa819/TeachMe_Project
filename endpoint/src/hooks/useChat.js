import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Socket";

export default function useChat() {
  const socket = useContext(SocketContext)
  const { sessionID } = useParams()
  const type = Number(localStorage.getItem('type'));

  const [chatMessages, setChatMessages] = useState([])

  const handleNewMessage = useCallback(message => setChatMessages(messages => [...messages, message]), []);

  useEffect(() => {
    socket.on('chat-message', handleNewMessage);
    return () => socket.off('chat-messages', handleNewMessage)
  }, [socket, handleNewMessage]);

  const sendMessage = useCallback((message) => {
    socket.emit('send-chat-message', { sessionID, type, message });
  }, [socket, sessionID, type]);

  return { chatMessages, sendMessage };
}

import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Socket";

export default function useStudentQuiz() {
  const socket = useContext(SocketContext)
  const { sessionID } = useParams()

  const [quiz, setQuiz] = useState(null)

  useEffect(() => {
    socket.on('quiz', setQuiz);
    return () => socket.off('quiz', setQuiz);
  }, [socket]);

  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const saveQuizAnswer = useCallback(() => {
    socket.emit('send-quiz-answer', { quizAnswer: selectedAnswer, sessionID });
  }, [socket, sessionID, selectedAnswer]);

  const onAnswerChange = useCallback((event) => setSelectedAnswer(event.target.value), [])

  return { quiz, saveQuizAnswer, onAnswerChange }
}

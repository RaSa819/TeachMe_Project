import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { LanguageContext } from "../App";
import { SocketContext } from "../Socket";

export default function useTutorQuiz() {
  const language = useContext(LanguageContext)
  const socket = useContext(SocketContext)
  const { sessionID } = useParams();
  const type = Number(localStorage.getItem('type'));

  const [question, setQuestion] = useState('')

  const onQuestionChange = useCallback((event) => {
    setAnswer(null);
    setQuestion(event.target.value);
  }, []);

  const [options, setOptions] = useState([])
  const [editedOptionIndex, setEditedOptionIndex] = useState(null)
  const editedOption = useRef('')
  
  const addOption = useCallback(() => {
    setAnswer(null);
    setOptions(options => [...options, `${language.Option1} ${options.length + 1}`]);
  }, [language.Option1]);

  const editOption = (index) => () => {
    setEditedOptionIndex(index);
    editedOption.current = options[index];
  };

  const onEditedOptionChange = useCallback((event) => {
    editedOption.current = event.target.value;
  }, []);

  const saveEditedOption = useCallback(() => {
    setOptions(options => {
      const optionsClone = [...options];
      optionsClone[editedOptionIndex] = editedOption.current;
      return optionsClone;
    });
    setEditedOptionIndex(null)
  }, [editedOptionIndex]);

  const deleteOption = (index) => () => {
    setOptions(options => {
      const optionsClone = [...options];
      optionsClone.splice(index, 1);
      return optionsClone;
    });
  }

  const saveQuiz = useCallback(async () => {
    if (options.length > 0 && question) {
      socket.emit('send-quiz', {
        sessionID,
        type,
        quiz: {
          question,
          options,
        },
      });
    }
  }, [socket, sessionID, type, options, question])
  
  const [answer, setAnswer] = useState(null)
  useEffect(() => {
    socket.on('quiz-answer', setAnswer);
    return () => socket.off('quiz-answer', setAnswer);
  }, [socket]);

  return {
    question,
    onQuestionChange,
    options,
    addOption,
    editOption,
    onEditedOptionChange,
    saveEditedOption,
    editedOptionIndex,
    editedOption: editedOption.current,
    deleteOption,
    saveQuiz,
    answer
  };
}

import Timebar from './Timebar';
import Answers from './Answers';
import { useState } from 'react';

const QUESTION_TIMER = 5000;
const ANSWER_TIMER = 1000;
const RESULT_TIMER = 2000;

function Question({ currQuestion, onSelectAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });
  let timer = QUESTION_TIMER;

  if (answer.selectedAnswer !== '') timer = ANSWER_TIMER;
  if (answer.isCorrect !== null) timer = RESULT_TIMER;

  function handleSelectAnswer(answer) {
    if (timer < QUESTION_TIMER) return;

    setAnswer({ selectedAnswer: answer, isCorrect: null });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === currQuestion.answers[0],
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, RESULT_TIMER);
    }, ANSWER_TIMER);
  }

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }
  return (
    <div id="question">
      <Timebar
        key={timer}
        onTimeout={() => handleSelectAnswer(null)}
        currTimer={timer}
        mode={answerState}
      />
      <h2>{currQuestion.text}</h2>
      <Answers
        selectedAnswer={answer.selectedAnswer}
        answers={currQuestion.answers}
        onClick={handleSelectAnswer}
        answerState={answerState}
      />
    </div>
  );
}

export default Question;

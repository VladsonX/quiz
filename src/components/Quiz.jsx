import { useCallback, useState } from 'react';
import Question from './Question';
import QUESTIONS from '../../questions';
import quizCompleteImg from '../assets/quiz-complete.png';

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(selectedAnswer => {
    setUserAnswers(prevResults => {
      return [...prevResults, selectedAnswer];
    });
  }, []);

  if (quizIsCompleted)
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz is completed" />
        <h2>Quiz Completed</h2>
      </div>
    );

  return (
    <section id="quiz">
      <Question
        key={activeQuestionIndex}
        currQuestion={QUESTIONS[activeQuestionIndex]}
        onSelectAnswer={handleSelectAnswer}
      />
    </section>
  );
  // <ul className="bg-indigo-950 flex flex-col gap-4 m-auto p-8 rounded-2xl">
  //   {userAnswers.map(result => (
  //     <li className="" key={result.id}>
  //       <p className="text-xl">
  //         {questions.find(question => question.id === result.id).text}
  //       </p>
  //       <p
  //         className={
  //           result.result === true ? 'text-emerald-500' : 'text-red-500'
  //         }
  //       >
  //         {result.result === true ? 'Correct' : 'Wrong'}
  //       </p>
  //     </li>
  //   ))}
  // </ul>
}

export default Quiz;

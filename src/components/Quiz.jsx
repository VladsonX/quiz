import { useEffect, useState } from 'react';
import Timebar from './Timebar';
import QUESTIONS from '../../questions';
import quizCompleteImg from '../assets/quiz-complete.png';

const TIMER = 5000;
const INTERVAL_FREQUENCY = 100;

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  useEffect(() => {
    if (quizIsCompleted) return;

    const timer = setTimeout(() => {
      setUserAnswers(prevResults => [...prevResults, null]);
    }, TIMER);
    return () => clearTimeout(timer);
  }, [quizIsCompleted, activeQuestionIndex]);

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers(prevResults => {
      return [...prevResults, selectedAnswer];
    });
  }

  if (quizIsCompleted)
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz is completed" />
        <h2>Quiz Completed</h2>
      </div>
    );

  const currentQuestion = QUESTIONS[activeQuestionIndex];
  const shuffledAnswers = currentQuestion.answers.toSorted(
    () => Math.random() - 0.5,
  );

  return (
    <section className="flex items-center flex-col gap-8 w-1/2 m-auto bg-blue-950 rounded-xl p-8">
      <Timebar
        timer={TIMER}
        frequency={INTERVAL_FREQUENCY}
        key={currentQuestion.id}
      />
      <h2 className="mb-8 text-2xl">{currentQuestion.text}</h2>
      <ul className="w-full flex flex-col gap-4">
        {shuffledAnswers.map(answer => (
          <li
            key={answer}
            className="f-wull h-12 bg-indigo-400 text-mist-900 rounded-xl"
          >
            <button
              onClick={() => handleSelectAnswer(answer)}
              className="w-full h-full p-4 truncate flex justify-center items-center cursor-pointer"
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
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

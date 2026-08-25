import { useCallback, useState } from 'react';
import Question from './Question';
import QUESTIONS from '../../questions';
import Summary from './Summary';

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
    return <Summary answers={userAnswers} questions={QUESTIONS} />;

  return (
    <section id="quiz">
      <Question
        key={activeQuestionIndex}
        currQuestion={QUESTIONS[activeQuestionIndex]}
        onSelectAnswer={handleSelectAnswer}
      />
    </section>
  );
}

export default Quiz;

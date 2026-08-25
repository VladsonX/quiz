import { useRef } from 'react';

function Answers({ selectedAnswer, answerState, answers, onClick }) {
  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current)
    shuffledAnswers.current = answers.toSorted(() => Math.random() - 0.5);

  return (
    <ul id="answers">
      {shuffledAnswers.current.map(answer => {
        const isSelected = answer === selectedAnswer;
        let cssClasses = '';
        if (answerState === 'answered' && isSelected) cssClasses += 'selected';
        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        )
          cssClasses += answerState;
        return (
          <li key={answer} className="answer">
            <button
              disabled={answerState !== ''}
              onClick={() => onClick(answer)}
              className={cssClasses}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Answers;

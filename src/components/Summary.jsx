import quizCompleteImg from '../assets/quiz-complete.png';

function Summary({ answers, questions }) {
  const skippedAnswers = answers.filter(answer => answer === null);
  const correctAnswers = answers.filter(
    (answer, index) => answer === questions[index].answers[0],
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / answers.length) * 100,
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / answers.length) * 100,
  );

  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <section id="summary">
      <img src={quizCompleteImg} alt="Quiz is completed" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {answers.map((answer, index) => {
          let cssClasses = 'user-answer';
          if (answer === null) cssClasses += ' skipped';
          else if (answer === questions[index].answers[0])
            cssClasses += ' correct';
          else cssClasses += ' wrong';
          return (
            <li key={answer + index}>
              <h3>{index + 1}</h3>
              <p className="question">{questions[index].text}</p>
              <p className={cssClasses}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default Summary;

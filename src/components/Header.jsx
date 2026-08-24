import quizLogo from '../assets/quiz-logo.png';

function Header() {
  return (
    <header className="m-auto w-full flex items-center flex-col gap-4 mb-4">
      <img src={quizLogo} alt="quiz logo" />
      <h1>React quiz</h1>
    </header>
  );
}

export default Header;
